import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Editor() {
  const [editorHtml, setEditorHtml] = useState("");
  const [log, setLog] = useState(""); // เพิ่ม state สำหรับเก็บ log

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const handleEditorChange = (html) => {
    setEditorHtml(html);
    setLog(html); // บันทึก log เมื่อมีการเปลี่ยนแปลงใน editor
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={editorHtml}
        onChange={handleEditorChange}
      />
      <div>
        <h2>Log:</h2>
        <pre>{log}</pre> {/* แสดง log */}
      </div>
    </div>
  );
}

export default Editor;
