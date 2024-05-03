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
  const [randomPost, setRandomPost] = useState(null);

  const cat = useLocation().search;

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`api/posts${cat}`);
        setPosts(res.data);
        const randomIndex = Math.floor(Math.random() * res.data.length);
        setRandomPost(res.data[randomIndex]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, [cat]);

  const getCatLabel = (cat) => {
    if (cat === "temple") {
      return "เที่ยววัด";
    } else if (cat === "food") {
      return "เที่ยวตะลอนกิน";
    } else if (cat === "mount") {
      return "เที่ยวภูเขา";
    } else if (cat === "sea") {
      return "เที่ยวทะเล";
    }
  };

  return (
    <>
      <main className="container mx-auto my-12 max-w-6xl px-4 md:px-6">
        {randomPost && (
          <section
            key={randomPost.id}
            className="mb-12 grid gap-6 md:grid-cols-[1fr_400px] md:gap-12"
          >
            <Link to={`post/${randomPost.id}`}>
              <img
                alt="Featured Blog Post"
                className="aspect-video w-full overflow-hidden rounded-lg object-cover"
                height={500}
                src={`../upload/${randomPost.img}`}
                width={800}
              />
            </Link>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  {getCatLabel(randomPost.cat)}
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  {randomPost.title}
                </h1>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                <TextTruncate
                  line={4}
                  element="span"
                  truncateText="…"
                  text={getText(randomPost.description)}
                />
              </p>
              <Link to={`post/${randomPost.id}`}>
                <button className="btn btn-outline">Read More</button>
              </Link>
            </div>
          </section>
        )}
        <section>
          <h2 className="mb-6 text-2xl font-bold">Recent Posts</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts &&
              posts.map((post) => (
                <card key={post.id}>
                  <Link to={`post/${post.id}`}>
                    <img
                      alt="Blog Post Image"
                      className="aspect-video w-full overflow-hidden rounded-t-lg object-cover"
                      height={250}
                      src={`../upload/${post.img}`}
                      width={400}
                    />
                  </Link>
                  <cardContent className="space-y-2 p-4">
                    <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800 mt-3 ">
                      {getCatLabel(post.cat)}
                    </div>
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      <TextTruncate
                        line={4}
                        element="span"
                        truncateText="…"
                        text={getText(post.description)}
                      />
                    </p>
                    <Link to={`post/${post.id}`}>
                      <button className="btn btn-outline">Read More</button>
                    </Link>
                  </cardContent>
                </card>
              ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
