import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postsRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
dotenv.config();

const corsOptions = {
  // origin: "https://nodejs-web-travel-66.onrender.com",
  origin: "https://main--travel66.netlify.app",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const storage = multer.memoryStorage(); // เปลี่ยนเป็นใช้ memory storage
const fileFilter = (req, file, cb) => {
  cb(null, true);
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // กำหนดขนาดสูงสุดของไฟล์ที่ 10 MB
  },
});

app.post("/api/upload", upload.single("file"), function (req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const blobData = req.file.buffer.toString("base64");
  // เรียกใช้งานหน้าที่รับข้อมูลและบันทึกข้อมูลลงใน MySQL ได้ตรงนี้
  res.status(200).json({ data: blobData });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postsRoutes);

app.listen(8800, () => {
  console.log("api is runnung on port 8800");
});
