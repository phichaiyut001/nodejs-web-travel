// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import Swal from "sweetalert2";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      Swal.fire({
        icon: "success",
        title: "Login success",
        showConfirmButton: false,
        timer: 600,
      }).then(() => {
        navigate("/");
      });
    } catch (err) {
      setError(err.response.data);
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: "Username หรือ password ผิด",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <div className="auth">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              กรุณากรอก Username และ Password เพื่อเข้าสู่ระบบ
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>
              {/* <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                />
              </div> */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="password"
                  className="input input-bordered"
                  required
                />

                <label className="label">
                  ยังไม่เป็นสมัครสมาชิคใช่ไหม สมัครเลย!
                  <span className="label-text-alt underline text-sm/[20px] text-blue-600">
                    <Link to="/register">Register</Link>
                  </span>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
