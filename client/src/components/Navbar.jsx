// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <>
      <nav>
        <div className="navbar bg-base-100 shadow-md">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/">หน้าแรก</Link>
                </li>
                <li>
                  <a>หมวดหมู่</a>
                  <ul className="p-2">
                    <li>
                      <Link to="/?cat=food">ตะลอนกินอาหาร</Link>
                    </li>
                    <li>
                      <Link to="/?cat=temple">เที่ยววัด</Link>
                    </li>
                    <li>
                      <Link to="/?cat=sea">เที่ยวทะเล</Link>
                    </li>
                    <li>
                      <Link to="/?cat=mount">เที่ยวภูเขา</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/write">เขียน Blog</Link>
                </li>
              </ul>
            </div>
            <Link to="/">
              <a className="btn btn-ghost text-xl">Travel</a>
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/">หน้าแรก</Link>
              </li>
              <li>
                <details>
                  <summary>หมวดหมู่</summary>
                  <ul className="p-2 ">
                    <li>
                      <Link to="/?cat=food">ตะลอนกิน</Link>
                    </li>
                    <li>
                      <Link to="/?cat=temple">เที่ยววัด</Link>
                    </li>
                    <li>
                      <Link to="/?cat=sea">เที่ยวทะเล</Link>
                    </li>
                    <li>
                      <Link to="/?cat=mount">เที่ยวภูเขา</Link>
                    </li>
                  </ul>
                </details>
              </li>
              {currentUser && (
                <li>
                  <Link to="/write">เขียน Blog</Link>
                </li>
              )}
            </ul>
          </div>
          <div className="navbar-end mr-10">
            <p className=" mr-3">{currentUser?.username}</p>
            {currentUser ? (
              <a onClick={logout} className="btn">
                Logout
              </a>
            ) : (
              <Link className="btn" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
