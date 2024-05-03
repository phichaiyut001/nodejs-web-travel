// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/authContext";

const Footer = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <footer className="bg-gray-100 py-8 dark:bg-gray-950">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <MountainIcon className="h-6 w-6" />
              <span className="text-lg font-semibold">Travel Blog</span>
            </div>
            <nav className="flex gap-4">
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                to="/"
              >
                Home
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                to="/?cat=temple"
              >
                เที่ยววัด
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                to="/?cat=sea"
              >
                เที่ยวทะเล
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                to="/?cat=mount"
              >
                เที่ยวภูเขา
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                to="/?cat=food"
              >
                ตะลอนกิน
              </Link>
              {currentUser && (
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  to="/write"
                >
                  เขียน Blog
                </Link>
              )}
            </nav>
          </div>
          <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            © 2024 Travel Blog. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
export default Footer;
