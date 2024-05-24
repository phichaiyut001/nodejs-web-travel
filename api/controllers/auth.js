import { db } from "../db.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";

export const register = (req, res) => {
  if (!req.body.email || !req.body.username || !req.body.password) {
    return res.status(400).json("กรุณากรอก ข้อมูลให้ครบ");
  }

  // Check if the email is in valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json("กรุณากรอก Email ให้ถูกต้อง");
  }

  //CHECK EXISTING USER
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User or email ถูกใช้ไปแล้ว!");

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ error: "กรุณากรอก ข้อมูล" });
  }

  //เช็ค User
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json({ error: err });
    if (data.length === 0)
      return res.status(404).json({ error: "User not found!" });

    //check passwrod
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ error: "Username หรือ Password ผิด!" });

    if (data[0].isAdmin === 1) {
      const token = jwt.sign({ id: data[0].id }, "jwtkey");
      const { password, ...other } = data[0];

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ ...other, isAdmin: true });
      console.log("Token:", token);
    } else {
      const token = jwt.sign({ id: data[0].id }, "jwtkey");
      const { password, isAdmin, ...other } = data[0];

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(other);
    }
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json(" User has been logout");
};

// Middleware เพื่อตรวจสอบว่าผู้ใช้เป็น admin หรือไม่
export const isAdmin = (userId, callback) => {
  const q = "SELECT isAdmin FROM users WHERE id = ?";

  db.query(q, [userId], (err, data) => {
    if (err) return callback(err);
    if (data.length === 0) return callback("User not found!");
    callback(null, data[0].isAdmin === 1);
  });
};
