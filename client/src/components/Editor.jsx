import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import axios from "axios";
import Swal from "sweetalert2";
import Embed from "@editorjs/embed"; // เพิ่ม import ของ Embed

import "./Editor.css";

const EditorComponent = ({ value, onChange }) => {
  const [data, setData] = useState(value);
  const ejInstance = useRef();

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file); // แก้ "image" เป็น "file"
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return { success: 1, file: { url: `public/upload/${res.data}` } }; // แก้ res.data.url เป็น res.data
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "File upload failed",
        text: "Please try again.",
      });
      return { success: 0 };
    }
  };

  const initEditor = () => {
    const editor = new EditorJS({
      placeholder: "Let`s write an awesome story!",
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: data, // เปลี่ยนเป็น value ที่รับเข้ามา
      onChange: async () => {
        let content = await editor.saver.save();
        onChange(content);
      },
      tools: {
        header: Header,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile(file) {
                return uploadImage(file);
              },
            },
          },
        },
        embed: Embed, // เพิ่ม Embed tool
      },
    });
  };

  // This will run only once
  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, [data]); // เพิ่ม value เข้าไปใน dependency array เพื่อให้มันรีเรนเดอร์เมื่อ value เปลี่ยน

  return (
    <>
      <div id="editorjs"> </div>
    </>
  );
};

export default EditorComponent;
