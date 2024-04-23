// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import TextTruncate from "react-text-truncate";

const getText = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");

  return doc.body.textContent;
};

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  console.log(location);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`api/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, [cat]);

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-7 mb-3 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts &&
            posts.map((post) => (
              <div className="post flex flex-col" key={post.id}>
                <div className="img">
                  <img
                    src={`../upload/${post.img}`}
                    alt=""
                    className="w-full h-72 rounded-lg"
                  />
                </div>
                <div className="content mt-4">
                  <Link
                    to={`post/${post.id}`}
                    className="text-2xl font-bold text-blue-700 hover:underline"
                  >
                    {post.title}
                  </Link>
                  <div className="mt-2">
                    <p
                      className="text-gray-700  "
                      style={{ textAlign: "justify" }}
                    >
                      <TextTruncate
                        line={5}
                        element="span"
                        truncateText="…"
                        text={getText(post.description)}
                      />
                    </p>
                  </div>
                  <Link
                    to={`post/${post.id}`}
                    className="mt-3 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
