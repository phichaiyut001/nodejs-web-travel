import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/authContext";
import { Drawer, Button } from "@geist-ui/core";
const Navbar2 = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm dark:bg-gray-950">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <Link className="flex items-center gap-2" to="/">
            <MountainIcon className="h-6 w-6" />
            <span className="text-lg font-semibold">Travel Blog</span>
          </Link>
          <button className="md:hidden" size="icon">
            <Button
              auto
              onClick={() => setState(true)}
              scale={1 / 2}
              icon={<MenuIcon className="h-6 w-6" />}
            ></Button>
          </button>
          <nav
            className={
              "md:flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4" +
              (isOpen ? " block" : " hidden")
            }
          >
            <Link
              className="text-sm font-medium hover:underline underline-offset-4  mt-3 md:mt-0"
              to="/"
            >
              Home
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4  mt-3 md:mt-0"
              to="/?cat=temple"
            >
              เที่ยววัด
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4  mt-3 md:mt-0"
              to="/?cat=sea"
            >
              เที่ยวทะเล
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4  mt-3 md:mt-0"
              to="/?cat=mount"
            >
              เที่ยวภูเขา
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4  mt-3 md:mt-0"
              to="/?cat=food"
            >
              ตะลอนกิน
            </Link>
            {currentUser && (
              <Link
                className="text-sm font-medium hover:underline underline-offset-4 mt-3 md:mt-0"
                to="/write"
              >
                เขียน Blog
              </Link>
            )}

            <p className="text-sm mt-3 md:mt-0">{currentUser?.username}</p>
            {currentUser ? (
              <Link
                className="btn bg-red-400 text-white text-sm font-medium hover:underline underline-offset-4 mt-3 md:mt-0"
                onClick={logout}
              >
                ออกจากระบบ
              </Link>
            ) : (
              <Link
                className="btn bg-red-400 text-white text-sm font-medium hover:underline underline-offset-4 mt-3 md:mt-0"
                to="/login"
              >
                เข้าสู่ระบบ
              </Link>
            )}
            {currentUser && currentUser.isAdmin && (
              <Link
                className="btn bg-cyan-400 text-white text-sm font-medium hover:underline underline-offset-4 mt-3 md:mt-0"
                to="/dashboard"
              >
                Dashboard
              </Link>
            )}

            <Drawer
              visible={state}
              onClose={() => setState(false)}
              placement="right"
            >
              <Drawer.Title>Trave Blog</Drawer.Title>
              <Drawer.Subtitle>
                {" "}
                <p className="text-sm mt-3 md:mt-0">
                  User: {currentUser?.username}
                </p>
              </Drawer.Subtitle>
              <Drawer.Content onClick={() => setState(false)}>
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4  mt-3 md:mt-0"
                  to="/"
                >
                  Home
                </Link>
              </Drawer.Content>
              <Drawer.Content onClick={() => setState(false)}>
                {" "}
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4  mt-3 md:mt-0"
                  to="/?cat=temple"
                >
                  เที่ยววัด
                </Link>
              </Drawer.Content>
              <Drawer.Content onClick={() => setState(false)}>
                {" "}
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4  mt-3 md:mt-0"
                  to="/?cat=sea"
                >
                  เที่ยวทะเล
                </Link>
              </Drawer.Content>
              <Drawer.Content onClick={() => setState(false)}>
                {" "}
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4  mt-3 md:mt-0"
                  to="/?cat=mount"
                >
                  เที่ยวภูเขา
                </Link>
              </Drawer.Content>
              <Drawer.Content onClick={() => setState(false)}>
                {" "}
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4  mt-3 md:mt-0"
                  to="/?cat=food"
                >
                  ตะลอนกิน
                </Link>
              </Drawer.Content>
              <Drawer.Content onClick={() => setState(false)}>
                {" "}
                {currentUser && (
                  <Link
                    className="text-sm font-medium hover:underline underline-offset-4 mt-3 md:mt-0"
                    to="/write"
                  >
                    เขียน Blog
                  </Link>
                )}
              </Drawer.Content>
              <Drawer.Content onClick={() => setIsOpen(false)}>
                {" "}
                {currentUser ? (
                  <Link
                    className="btn bg-red-400 text-white text-sm font-medium hover:underline underline-offset-4 mt-3 md:mt-0"
                    onClick={logout}
                  >
                    ออกจากระบบ
                  </Link>
                ) : (
                  <Link
                    className="btn bg-red-400 text-white text-sm font-medium hover:underline underline-offset-4 mt-3 md:mt-0"
                    to="/login"
                  >
                    เข้าสู่ระบบ
                  </Link>
                )}
                {currentUser && currentUser.isAdmin && (
                  <Link
                    className="btn bg-cyan-400 text-white text-sm font-medium hover:underline underline-offset-4 mt-3 md:mt-0"
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                )}
              </Drawer.Content>
            </Drawer>
          </nav>
        </div>
      </header>
    </>
  );
};

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

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

export default Navbar2;
