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
      <div className="container mx-auto px-20 justify-center items-center">
        <div className="Home">
          <div className="posts ">
            {posts &&
              posts.map((post) => (
                <div className="post flex" key={post.id}>
                  <div className="img">
                    <img src={`../upload/${post.img}`} alt="" />
                  </div>
                  <div className="content">
                    <Link className="link ">
                      <h1 className="text-5xl font-bold ">{post.title}</h1>
                    </Link>
                    <div className="mt-2">
                      <TextTruncate
                        line={5}
                        element="p"
                        truncateText="…"
                        text={getText(post.description)}
                      />
                    </div>
                    <p className="desc mt-3"></p>
                    <Link to={`post/${post.id}`}>
                      <button className="btn btn-primary mt-3">Readmore</button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
