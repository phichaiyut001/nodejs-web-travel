// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  // eslint-disable-next-line no-unused-vars
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
      Swal.fire({
        icon: "error",
        title: err.response.data || "Unexpected Application Error!",
        text: "กรุณากรอก ข้อมูลอีกครั้ง",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };
  return (
    <div className="auth">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              กรุณากรอก Username , Password, Email เพื่อสมัรสมาชิค
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  onChange={handleChange}
                  name="username"
                  type="text"
                  placeholder="username"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  onChange={handleChange}
                  name="email"
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  onChange={handleChange}
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />

                <label className="label">
                  สมัครสมาชิคแล้ว Sign-in เลย!
                  <span className="label-text-alt underline text-sm/[20px] text-blue-600">
                    <Link to="/login">Sign-in</Link>
                  </span>
                </label>
              </div>
              <div className="form-control mt-6">
                <button onClick={handleSubmit} className="btn btn-primary">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
