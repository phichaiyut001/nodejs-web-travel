import { useContext, useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Button,
} from "@nextui-org/react";

import { Pagination, Modal, useModal } from "@geist-ui/core";
import axios from "axios";
import moment from "moment";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Swal from "sweetalert2";

const Posts = () => {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const { setVisible, bindings } = useModal();
  const cat = useLocation().search;

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`/api/posts/${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, [cat, posts]);

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

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  const pages = Math.ceil(posts.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return posts.slice(start, end);
  }, [page, posts]);

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

  const handleDelete = async (postId, e) => {
    e.preventDefault();
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
        await axios.delete(`/api/posts/${postId}`);
        const updatedPosts = posts.filter((item) => item.id !== postId);
        setPosts(updatedPosts);
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
      }
    } catch (err) {
      throw new Error("Failed to delete post");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8 p-p md:p-10">
        <h1 className="text-2xl font-bold">POST</h1>
        <div className="border rounded-lg overflow-hidden">
          <Table
            aria-label="Example empty table"
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  count={pages} // จำนวนหน้าเท่ากับจำนวนหน้าทั้งหมด
                  initialPage={1}
                  isCompact
                  showControls
                  showShadow
                  color="secondary"
                  page={page}
                  onChange={(page) => setPage(page)}
                  className="mt-4 "
                />
              </div>
            }
            classNames={{
              wrapper: "min-h-[222px]",
            }}
          >
            <TableHeader>
              <TableColumn>No</TableColumn>
              <TableColumn>Image</TableColumn>
              <TableColumn>Title</TableColumn>

              <TableColumn>Category</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody>
              {items &&
                items.map((item, index) => (
                  <TableRow key={index} className=" border">
                    <TableCell className="font-medium">
                      {index + 1 + (page - 1) * rowsPerPage}
                    </TableCell>
                    <TableCell>
                      <img
                        onClick={() => {
                          setPost(item);
                          setVisible(true);
                        }}
                        alt="Blog Image"
                        className="rounded-md object-cover"
                        height={80}
                        src={`/upload/${item.img}`}
                        style={{
                          aspectRatio: "80/80",
                          objectFit: "cover",
                        }}
                        width={80}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>

                    <TableCell>
                      <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800 mt-3 ">
                        {getCatLabel(item.cat)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="success">
                        {moment(item.date).fromNow()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Button className="mr-2" size="icon" variant="outline">
                        <DeleteIcon className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        className="text-red-500"
                        size="icon"
                        variant="outline"
                        onClick={(e) => handleDelete(item.id, e)}
                      >
                        <TrashIcon className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Modal width="60rem" {...bindings}>
        {/* <Modal.Title>My Favorites</Modal.Title> */}
        <Modal.Content>
          <div key="1" className="flex justify-center">
            <article className="prose prose-gray max-w-3xl mx-4 my-12 dark:prose-invert">
              <h1 className="text-4xl font-extrabold tracking-tight">
                {post.title}
              </h1>
              <br />
              <figure className="mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <img
                  alt="People laughing together"
                  className="w-full h-auto object-cover rounded"
                  src={`/upload/${post.img}`}
                />
                <figcaption className="text-center"></figcaption>
              </figure>
              <p className="text-gray-500 dark:text-gray-400">
                {post.username} | {moment(post.date).fromNow()}
              </p>
              <p
                className="desc mt-3 md:mt-0 md:col-start-1 md:col-end-3 text-left md:text-left whitespace-pre-line pl-0 md:pl-0"
                dangerouslySetInnerHTML={{ __html: post.description }}
              ></p>
            </article>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};

function DeleteIcon(props) {
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
      <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
      <line x1="18" x2="12" y1="9" y2="15" />
      <line x1="12" x2="18" y1="9" y2="15" />
    </svg>
  );
}

function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

export default Posts;
