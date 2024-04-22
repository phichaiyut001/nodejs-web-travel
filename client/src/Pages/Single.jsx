import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";

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
      await axios.delete(`/api/posts/${id}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");

    return doc.body.textContent;
  };
  return (
    <div className="container mx-auto px-20 justify-center items-center">
      <div className="single mt-10">
        <div className="content">
          <img src={`../upload/${post.img}`} alt="" />
          <div className="user">
            {post.userImg && <img src={post.userImg} alt="" />}
            <div className="info">
              <span>{post.username}</span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            {currentUser.username === post.username && (
              <>
                <div className="edit">
                  <Link to={`/write?edit=2`} state={post}>
                    <PencilSquareIcon className="pen h-6 w-6 text-blue-500" />
                  </Link>
                </div>
                <div className="delete">
                  <Link>
                    <TrashIcon
                      onClick={handleDelete}
                      className="h-6 w-6 text-red-500"
                    />
                  </Link>
                </div>
              </>
            )}
          </div>
          <h1 className="text-5xl font-bold mt-2 mb-3">{post.title}</h1>
          <p className="desc mt-3">{getText(post.description)}</p>
        </div>
        <Menu cat={post.cat} />
      </div>
    </div>
  );
};

export default Single;
