import { useMemo, useState } from "react";
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

import { Pagination } from "@geist-ui/core";

import phiphiImage from "../../../public/upload/1713844132337phiphi.jpg";

const Posts = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = [
    {
      image: phiphiImage,
      title: "The Future of Web Development",
      author: "Jane Doe",
      published: "May 1, 2023",
      status: "Published",
      action: (
        <>
          <Button className="mr-2" size="icon" variant="outline">
            <DeleteIcon className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button className="text-red-500" size="icon" variant="outline">
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </>
      ),
    },
    {
      image: phiphiImage,
      title: "The Future of Web Development",
      author: "Jane Doe",
      published: "May 1, 2023",
      status: "Published",
      action: (
        <>
          <Button className="mr-2" size="icon" variant="outline">
            <DeleteIcon className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button className="text-red-500" size="icon" variant="outline">
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </>
      ),
    },
    {
      image: phiphiImage,
      title: "The Future of Web Development",
      author: "Jane Doe",
      published: "May 1, 2023",
      status: "Published",
      action: (
        <>
          <Button className="mr-2" size="icon" variant="outline">
            <DeleteIcon className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button className="text-red-500" size="icon" variant="outline">
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </>
      ),
    },
    {
      image: phiphiImage,
      title: "The Future of Web Development",
      author: "Jane Doe",
      published: "May 1, 2023",
      status: "Published",
      action: (
        <>
          <Button className="mr-2" size="icon" variant="outline">
            <DeleteIcon className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button className="text-red-500" size="icon" variant="outline">
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </>
      ),
    },
    {
      image: phiphiImage,
      title: "The Future of Web Development",
      author: "Jane Doe",
      published: "May 1, 2023",
      status: "Published",
      action: (
        <>
          <Button className="mr-2" size="icon" variant="outline">
            <DeleteIcon className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button className="text-red-500" size="icon" variant="outline">
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </>
      ),
    },
    {
      image: phiphiImage,
      title: "The Future of Web Development",
      author: "Jane Doe",
      published: "May 1, 2023",
      status: "Published",
      action: (
        <>
          <Button className="mr-2" size="icon" variant="outline">
            <DeleteIcon className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button className="text-red-500" size="icon" variant="outline">
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </>
      ),
    },
    {
      image: phiphiImage,
      title: "The Future of Web Development",
      author: "Jane Doe",
      published: "May 1, 2023",
      status: "Published",
      action: (
        <>
          <Button className="mr-2" size="icon" variant="outline">
            <DeleteIcon className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button className="text-red-500" size="icon" variant="outline">
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </>
      ),
    },
    {
      image: phiphiImage,
      title: "The Future of Web Development",
      author: "Jane Doe",
      published: "May 1, 2023",
      status: "Published",
      action: (
        <>
          <Button className="mr-2" size="icon" variant="outline">
            <DeleteIcon className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button className="text-red-500" size="icon" variant="outline">
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </>
      ),
    },
    {
      image: phiphiImage,
      title: "The Future of Web Development",
      author: "Jane Doe",
      published: "May 1, 2023",
      status: "Published",
      action: (
        <>
          <Button className="mr-2" size="icon" variant="outline">
            <DeleteIcon className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button className="text-red-500" size="icon" variant="outline">
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </>
      ),
    },
    {
      image: phiphiImage,
      title: "The Future of Web Developmentssssssssssssssssss",
      author: "Jane Doe",
      published: "May 1, 2023",
      status: "Published",
      action: (
        <>
          <Button className="mr-2" size="icon" variant="outline">
            <DeleteIcon className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button className="text-red-500" size="icon" variant="outline">
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </>
      ),
    },
    // สร้างข้อมูลอื่นๆ ตามต้องการ
  ];

  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

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
              <TableColumn>Image</TableColumn>
              <TableColumn>Title</TableColumn>
              <TableColumn>Author</TableColumn>
              <TableColumn>Published</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index} className=" border">
                  <TableCell>
                    <img
                      alt="Blog Image"
                      className="rounded-md object-cover"
                      height={80}
                      src={item.image}
                      style={{
                        aspectRatio: "80/80",
                        objectFit: "cover",
                      }}
                      width={80}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>{item.published}</TableCell>
                  <TableCell>
                    <Badge variant="success">{item.status}</Badge>
                  </TableCell>
                  <TableCell>{item.action}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
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
