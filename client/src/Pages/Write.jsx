import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";
import EditorComponent from "../components/Editor.jsx";

const Write = () => {
  const { state } = useLocation();
  const [editorValue, setEditorValue] = useState(state?.description || null);
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const [previewURL, setPreviewURL] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.includes("image")) {
      setFile(selectedFile);
      setPreviewURL(URL.createObjectURL(selectedFile));
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid file type",
        text: "Please select an image file.",
      });
    }
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/api/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "File upload failed",
        text: "Please try again.",
      });
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      const postData = {
        title,
        description: convertJsonToHtml(editorValue),
        cat,
        img: imgUrl || "",
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      };

      if (state) {
        await axios.put(`/api/posts/${state.id}`, postData);
      } else {
        await axios.post(`/api/posts/`, postData);
      }

      await Swal.fire({
        icon: "success",
        title: "บันทึกสำเร็จ!",
        showConfirmButton: false,
        timer: 900,
      });

      // Clear input fields after successful submission
      setEditorValue("");
      setTitle("");
      setFile(null);
      setCat("");
      setPreviewURL("");

      navigate("/");
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: err.response?.data || "Unexpected Application Error!",
        text: "กรุณาลองใหม่อีกครั้ง",
      });
      console.log(err);
    }
  };

  const convertJsonToHtml = (value, withBackground, withBorder) => {
    let html = "";

    value.blocks.forEach((block) => {
      switch (block.type) {
        case "header":
          html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
          break;
        case "paragraph":
          html += `<p style="white-space: pre-wrap;">${block.data.text}</p>`;
          break;
        case "image":
          // eslint-disable-next-line no-case-declarations
          let imgHtml = `<img src="${`http://localhost:5173/${block.data.file.url}`}" alt="${
            block.data.caption
          }"`;

          if (withBackground) {
            imgHtml += ` style="background-color: #f2f2f2;"`;
          }
          if (withBorder) {
            imgHtml += ` style="border: 1px solid #ccc;"`;
          }
          if (block.data.stretched) {
            imgHtml += ` style="width: 100%; height: auto;"`;
          }

          imgHtml += ` />`;
          html += imgHtml;
          break;
        // สามารถเพิ่ม case สำหรับ type อื่น ๆ ได้ตามต้องการ
        default:
          break;
      }
    });

    return html;
  };

  console.log(editorValue);
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");

    return doc.body.textContent;
  };

  return (
    <div className="container mx-auto px-4 lg:px-20 flex justify-center items-center">
      <div className="mt-10 w-full lg:w-3/4 flex flex-wrap justify-between">
        <div className="w-full lg:w-2/3 pr-6 mb-10 ">
          <input
            value={title}
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="mb-3 border block w-full rounded-md border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 shadow-sm focus:border-gray-500 focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
          <div className="rounded-md border border-gray-300 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <EditorComponent value={editorValue} onChange={setEditorValue} />
          </div>
        </div>
        <div className="w-full lg:w-1/3 pl-6">
          <div className="rounded-md border border-gray-300 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <h1 className="text-3xl font-bold mb-2">Publish</h1>
            <span>
              <b>Status: </b> Draft
            </span>
            <span>
              <b>Visibility: </b> Public
            </span>
            <input
              style={{ display: "none" }}
              type="file"
              name=""
              id="file"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file"
              className="mt-2 block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Upload Banner Image
            </label>
            {previewURL && (
              <img
                src={previewURL}
                alt="Uploaded"
                className="mt-2 w-24 h-24 object-cover rounded"
              />
            )}
            <div className="mt-4 flex">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleClick}
              >
                Publish
              </button>
            </div>
          </div>
          <div className="rounded-md border border-gray-300 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <h1 className="text-3xl font-bold mb-2">Category</h1>
            <div className="mb-2">
              <input
                type="radio"
                checked={cat === "food"}
                className="form-radio text-indigo-600 mr-2"
                name="cat"
                value="food"
                id="food"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="food" className="text-gray-700">
                เที่ยวตะลอนกิน
              </label>
            </div>
            <div className="mb-2">
              <input
                type="radio"
                checked={cat === "temple"}
                className="form-radio text-indigo-600 mr-2"
                name="cat"
                value="temple"
                id="temple"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="temple" className="text-gray-700">
                เที่ยววัด
              </label>
            </div>
            <div className="mb-2">
              <input
                type="radio"
                checked={cat === "sea"}
                className="form-radio text-indigo-600 mr-2"
                name="cat"
                value="sea"
                id="sea"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="sea" className="text-gray-700">
                เที่ยวทะเล
              </label>
            </div>
            <div className="mb-2">
              <input
                type="radio"
                checked={cat === "mount"}
                className="form-radio text-indigo-600 mr-2"
                name="cat"
                value="mount"
                id="mount"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="mount" className="text-gray-700">
                เที่ยวภูเขา
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
