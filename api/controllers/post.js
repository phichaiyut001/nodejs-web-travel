import { db } from "../db.js";
import jwt from "jsonwebtoken";
import sharp from "sharp";
import { isAdmin } from "./auth.js";
// Middleware เพื่อตรวจสอบว่าผู้ใช้เป็น admin หรือไม่

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `description`, p.img, u.img AS userImg, `cat`, `date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`title`, `description`, `img`, `date`, `uid`, `cat`) VALUES (?, ?, ?, ?, ?, ?)";

    const values = [
      req.body.title,
      req.body.description,
      req.body.img,
      req.body.date,
      userInfo.id,
      req.body.cat,
    ];

    if (req.body.img === "") {
      return res.status(400).json("Please add banner image");
    }
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const postId = req.params.id;

    // เช็คว่าผู้ใช้งานเป็น admin หรือไม่
    isAdmin(userInfo.id, async (err, isAdmin) => {
      if (err) return res.status(500).json("Failed to check user role");

      if (isAdmin) {
        // ถ้าผู้ใช้เป็น admin ให้ลบโพสต์โดยไม่ต้องตรวจสอบว่าเป็นเจ้าของโพสต์หรือไม่
        const q = "DELETE FROM posts WHERE `id` = ?";
        db.query(q, [postId], (err, data) => {
          if (err) return res.status(500).json("Delete post failed");

          return res.json("Post has been deleted");
        });
      } else {
        // ถ้าผู้ใช้ไม่ใช่ admin ให้ตรวจสอบว่าเป็นเจ้าของโพสต์หรือไม่
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
        db.query(q, [postId, userInfo.id], (err, data) => {
          if (err) return res.status(500).json("Delete post failed");

          if (data.affectedRows === 0)
            return res.status(403).json("You can delete only your post");

          return res.json("Post has been deleted");
        });
      }
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?, `description`=?, `img`=?, `cat`=? WHERE `id` = ? AND `uid` = ?";

    const values = [
      req.body.title,
      req.body.description,
      req.body.img,
      req.body.cat,
    ];

    if (req.body.img === "") {
      return res.status(400).json("Please add banner image");
    }

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been Update");
    });
  });
};
