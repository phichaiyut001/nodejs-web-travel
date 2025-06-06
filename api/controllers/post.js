import { db } from "../db.js";
import jwt from "jsonwebtoken";
import sharp from "sharp";
import { isAdmin } from "./auth.js";

export const getPostsDashboard = (req, res) => {
  const q = req.query.cat
    ? "SELECT id, date, cat FROM posts WHERE cat=?"
    : "SELECT id, date, cat FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};
export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT id, title, description, img, cat FROM posts WHERE cat=?"
    : "SELECT id, title, description, img, cat FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    // Process image data into base64 URL
    const postsWithImages = data.map((post) => {
      const imageData = post.img;
      if (imageData) {
        const imageUrl = `data:image/jpeg;base64,${imageData}`;
        return { ...post, img_url: imageUrl };
      } else {
        return post;
      }
    });

    return res.status(200).json(postsWithImages);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `description`, p.img, u.img AS userImg, `cat`, `date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    const post = data[0];

    // Process post image into base64 URL if it exists
    if (post.img) {
      post.img_url = `data:image/jpeg;base64,${post.img}`;
    }

    // Process user image into base64 URL if it exists
    // if (post.userImg) {
    //   post.userImg_url = `data:image/jpeg;base64,${post.userImg}`;
    // }

    return res.status(200).json(post);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  console.log(token);
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    console.log(userInfo);

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
      if (err) {
        // เปลี่ยนการตอบกลับข้อผิดพลาดให้เป็นข้อความที่สามารถอ่านได้
        return res.status(500).json(err.message || err);
      }
      return res.json("Post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;

    // เช็คว่าผู้ใช้งานเป็น admin หรือไม่

    // ถ้าผู้ใช้เป็น admin ให้ลบโพสต์โดยไม่ต้องตรวจสอบว่าเป็นเจ้าของโพสต์หรือไม่
    const q = "DELETE FROM posts WHERE `id` = ?";
    db.query(q, [postId], (err, data) => {
      if (err) return res.status(500).json("Delete post failed");

      return res.json("Post has been deleted");
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
      postId,
      userInfo.id,
    ];

    db.query(q, [...values, postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been Update");
    });
  });
};
