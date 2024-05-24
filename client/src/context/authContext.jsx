import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    try {
      const res = await axios.post(
        "https://nodejs-web-travel.onrender.com/api/auth/login",
        inputs,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setCurrentUser(res.data);
    } catch (error) {
      console.error("Login error:", error);
      throw error; // ส่ง error ออกมาเพื่อให้ handleSubmit จัดการ
    }
  };

  const logout = async () => {
    Swal.fire({
      title: "คุณต้องการที่จะออกจากระบบหรือไม่ ?",
      text: "คลิก Yes เพื่อออกจากระบบ ยกเลิกคลิก Cancle!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log me out!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(
            "https://nodejs-web-travel.onrender.com/api/auth/logout"
          );
          setCurrentUser(null);
          localStorage.removeItem("user"); // ลบข้อมูลผู้ใช้ที่อยู่ใน localStorage
        } catch (error) {
          console.error("Logout error:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const isAdmin = currentUser && currentUser.isAdmin;

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
