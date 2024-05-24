import { useState, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";
import { Note } from "@geist-ui/core";

const Editors = () => {
  const { state } = useLocation();
  const [value, setValue] = useState(state?.description || "");
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

  // const urlToBase64 = async (url) => {
  //   const response = await fetch(url);
  //   const blob = await response.blob();
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result);
  //     reader.onerror = reject;
  //     reader.readAsDataURL(blob);
  //   });
  // };

  // const handleAddImgToBlog = async (e) => {
  //   const selectedImg = e.target.files[0];
  //   if (selectedImg && selectedImg.type.includes("image")) {
  //     const imgURL = await urlToBase64(URL.createObjectURL(selectedImg));
  //     const imgTag = `<img src="${imgURL}" alt="Uploaded Image" />`;
  //     setValue(value + imgTag);
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Invalid file type",
  //       text: "Please select an image file.",
  //     });
  //   }
  // };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "https://nodejs-web-travel-66.onrender.com/users/api/upload",
        formData
      );
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
        description: value,
        cat,
        img: imgUrl || "",
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      };

      if (state) {
        await axios.put(
          `https://nodejs-web-travel-66.onrender.com/users/api/posts/${state.id}`,
          postData
        );
      } else {
        await axios.post(
          `https://nodejs-web-travel-66.onrender.com/users/api/posts/`,
          postData
        );
      }

      await Swal.fire({
        icon: "success",
        title: "บันทึกสำเร็จ!",
        showConfirmButton: false,
        timer: 900,
      });

      // Clear input fields after successful submission
      setValue("");
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

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          [{ color: [] }, { background: [] }],
          ["clean"],
        ],
      },
    }),
    []
  );

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
            <ReactQuill
              className="editor h-auto mb-10"
              theme="snow"
              value={value}
              onChange={setValue}
              modules={modules}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/3 pl-6">
          <div className="rounded-md border border-gray-300 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <h1 className="text-3xl font-bold mb-2">แก้ไข POSTS</h1>
            <span>
              <b>สถานะ : กำลังแก้ไข POST</b>
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
              {/* <input
                style={{ display: "none" }}
                type="file"
                name=""
                id="getFile"
                onChange={handleAddImgToBlog}
              />
              <label
                htmlFor="getFile"
                className="mr-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              >
                Add Img to Blog
              </label> */}

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
          <br />
          <div className="mb-2">
            <>
              <Note type="success">
                ทุกครั้งที่แก้ไข กรุณาใส่รูป Banner ใหม่เสมอ
              </Note>
              <br />
              <Note type="warning">
                {" "}
                **หากต้องการแก้ไข รูปภาพที่เป็นลิงค์ เอาลิงค์มาวางได้เลย
                หลังจากแก้ไข เสร็จแล้ว กด Publish เพื่อเป็นการอัพเดท
              </Note>
              <br />
              <Note type="error">
                {" "}
                **หากต้องการเพิ่มรูปภาพใหม่กรุณาสร้าง POST ใหม่
              </Note>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editors;
