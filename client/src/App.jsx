import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Write from "./Pages/Write";
import Single from "./Pages/Single";
import Navbar from "./components/Navbar";
import Navbar2 from "./components/Navbar2";
import Footer from "./components/Footer";
import Editor from "./Pages/Quill";
import "./style.scss";
import { AuthContext } from "./context/authContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Navadmin from "./Pages/Dashboard/components/NavAdmin";

const Layout = () => {
  const location = useLocation();
  const isWritePage = location.pathname === "/write";
  return (
    <>
      <Navbar2 />
      <Outlet />
      {!isWritePage && <Footer />}
    </>
  );
};

const LayoutAdmin = () => {
  return (
    <>
      <Navadmin>
        <Outlet />
      </Navadmin>
    </>
  );
};
// eslint-disable-next-line react/prop-types, no-unused-vars
const ProtectedRoute = ({ element, path }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser || !element) {
    return <Navigate to="/" replace />;
  }

  return element;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <ProtectedRoute element={<Write />} />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/quill",
    element: <Editor />,
  },
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [
      {
        path: "/dashboard",
        element: <ProtectedRoute element={<Dashboard />} />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <div className="">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
