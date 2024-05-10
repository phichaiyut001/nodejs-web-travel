import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import axios from "axios";
import Swal from "sweetalert2";

import "./Editor.css";

const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "This is my awesome editor!",
        level: 1,
      },
    },
  ],
};

const EditorComponent = () => {
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
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: DEFAULT_INITIAL_DATA,
      onChange: async () => {
        let content = await editor.saver.save();

        console.log(content);
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
  }, []);

  return (
    <>
      <div id="editorjs"></div>
    </>
  );
};

export default EditorComponent;
