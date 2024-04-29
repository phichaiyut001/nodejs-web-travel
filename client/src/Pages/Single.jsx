import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import Swal from "sweetalert2";

const Single = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "ต้องการลบ โพสต์นี้หรือไม่?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`/api/posts/${id}`);
        navigate("/");
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");

    return doc.body.textContent;
  };
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10  ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 ">
        <div className="single">
          <div className="content">
            <img
              src={`../upload/${post.img}`}
              alt=""
              className="w-full h-auto object-cover rounded"
            />
            <div className="user flex items-center mt-4 ">
              {post.userImg && (
                <img
                  src={post.userImg}
                  alt=""
                  className="w-10 h-10 rounded-full mr-2"
                />
              )}
              <div className="info">
                <span>{post.username}</span>
                <p>Posted {moment(post.date).fromNow()}</p>
              </div>
              {currentUser && currentUser.username === post.username && (
                <div className="ml-auto flex space-x-2">
                  <Link to={`/write?edit=2`} state={post}>
                    <PencilSquareIcon className="h-6 w-6 text-blue-500" />
                  </Link>
                  <TrashIcon
                    onClick={handleDelete}
                    className="h-6 w-6 text-red-500 cursor-pointer"
                  />
                </div>
              )}
            </div>
            <h1 className="text-5xl font-bold mt-2 mb-3">{post.title}</h1>
            <p
              className="desc mt-3 md:mt-0 md:col-start-1 md:col-end-3 text-left md:text-left whitespace-pre-line pl-0 md:pl-0"
              dangerouslySetInnerHTML={{ __html: post.description }}
            ></p>
          </div>
        </div>
        <div className="hidden md:block md:col-start-2 md:col-end-3 flex justify-end">
          <Menu cat={post.cat} />
        </div>
      </div>
    </div>
  );
};

export default Single;
