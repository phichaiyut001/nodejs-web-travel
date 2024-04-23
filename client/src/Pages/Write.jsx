// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.description || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const [previewURL, setPreviewURL] = useState("");

  // const navigate = useNavigate()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewURL(URL.createObjectURL(selectedFile));
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/api/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/api/posts/${state.id}`, {
            title,
            description: value,
            cat,
            img: imgUrl || "",
          })
        : await axios.post(`/api/posts/`, {
            title,
            description: value,
            cat,
            img: imgUrl || "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });

      // แสดง SweetAlert เมื่อบันทึกข้อมูลสำเร็จ
      await Swal.fire({
        icon: "success",
        title: "บันทึกสำเร็จ!",
        showConfirmButton: false,
        timer: 1500,
      });

      // ตรวจสอบเมื่อสำเร็จ แล้วทำอย่างไรต่อ
      // navigate("/")
    } catch (err) {
      // แสดง SweetAlert เมื่อเกิดข้อผิดพลาด
      await Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "เนื้อหามีความยาวมากเกินไป",
      });
      console.log(err);
    }
  };

  return (
    <>
      <div className="container mx-auto px-20 justify-center items-center">
        <div className="write mt-10 ">
          <div className="content">
            <input
              value={title}
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="editContainer">
              <ReactQuill
                className="editor"
                theme="snow"
                value={value}
                onChange={setValue}
              />
            </div>
          </div>
          <div className="menu">
            <div className="item">
              <h1 className=" text-3xl font-bold">Publish</h1>
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
              <label className="file" htmlFor="file">
                Upload Image
              </label>
              {previewURL && (
                <img
                  src={previewURL}
                  alt="Uploaded"
                  style={{ width: "100px", height: "100px" }}
                />
              )}

              <div className="buttons mt-2">
                <button className="btn btn-outline">Save as a Draft</button>
                <button className="btn btn-outline" onClick={handleClick}>
                  Publish
                </button>
              </div>
            </div>
            <div className="item">
              <h1 className="text-3xl font-bold">Category</h1>
              <div className="cat">
                <input
                  type="radio"
                  checked={cat === "food"}
                  className="radio radio-info"
                  name="cat"
                  value="food"
                  id="food"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="food">เที่ยวตะลอนกิน</label>
              </div>
              <div className="cat">
                <input
                  type="radio"
                  checked={cat === "temple"}
                  className="radio radio-info"
                  name="cat"
                  value="temple"
                  id="temple"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="temple">เที่ยววัด</label>
              </div>
              <div className="cat">
                <input
                  type="radio"
                  checked={cat === "sea"}
                  className="radio radio-info"
                  name="cat"
                  value="sea"
                  id="sea"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="sea">เที่ยวทะเล</label>
              </div>
              <div className="cat">
                <input
                  type="radio"
                  checked={cat === "mount"}
                  className="radio radio-info"
                  name="cat"
                  value="mount"
                  id="mount"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="mount">เที่ยวภูเขา</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Write;
