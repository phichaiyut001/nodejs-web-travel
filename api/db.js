import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();
//test
export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(function (err) {
  if (err) {
    if (err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
      console.error("Fatal error occurred, reconnecting...");
      db.end(); // ปิดการเชื่อมต่อ
      db.connect(); // เชื่อมต่อใหม่
    } else {
      console.error("Error connecting to db:", err.stack);
    }
    return;
  }
  console.log("Connected to database as id", db.threadId);
});
