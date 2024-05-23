import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postsRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postsRoutes);

app.listen(8800, () => {
  console.log("api is runnung on port 8800");
});
