import { db } from "../db.js";
import jwt from "jsonwebtoken";
import { isAdmin } from "./auth.js";

export const getUser = (req, res) => {
  const q = "SELECT username, email FROM users";

  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};
