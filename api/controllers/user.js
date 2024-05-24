import { db } from "../db.js";
import jwt from "jsonwebtoken";
import { isAdmin } from "./auth.js";

export const getUser = (req, res) => {
  // const token = req.cookies.access_token;

  // jwt.verify(token, "jwtkey", async (err, userInfo) => {
  //   if (err) return res.status(403).json({ error: "Token is not valid" });

  //   // เช็คว่าผู้ใช้งานเป็น admin หรือไม่
  //   isAdmin(userInfo.id, async (err, isAdmin) => {
  //     if (err) return res.status(500).json("Failed to check user role");

  //     if (!isAdmin) {
  //       return res
  //         .status(403)
  //         .json("You are not authorized to access this resource");
  //     }

  // ถ้าเป็น admin ให้ดึงข้อมูลผู้ใช้งานทั้งหมด
  const q = "SELECT id, username, email, isAdmin FROM users";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json("Failed to get users data");

    return res.status(200).json(data);
    //     });
    //   });
  });
};

export const deleteUser = (req, res) => {
  // const token = req.cookies.access_token;
  // if (!token) return res.status(401).json({ error: "Not authenticated" });

  // jwt.verify(token, "jwtkey", async (err, userInfo) => {
  //   if (err) return res.status(403).json({ error: "Token is not valid" });

  const userId = req.params.id;

  // isAdmin(userInfo.id, async (err, isAdmin) => {
  //   if (err)
  //     return res.status(500).json({ error: "Failed to check user role" });

  //   if (isAdmin) {
  const q = "DELETE FROM users WHERE id = ?";
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json({ error: "Delete user failed" });

    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "User has been deleted" });
  });
  // } else {
  //   return res
  //     .status(403)
  //     .json({ error: "You are not authorized to delete this user" });
  // }
  // });
  // });
};
