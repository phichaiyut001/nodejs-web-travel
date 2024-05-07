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

import { Pagination, Modal, useModal } from "@geist-ui/core";

import phiphiImage from "../../../public/upload/1713844132337phiphi.jpg";

const Posts = () => {
  const { setVisible, bindings } = useModal();
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
  const rowsPerPage = 6;

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
                      onClick={() => setVisible(true)}
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

      <Modal width="60rem" {...bindings}>
        <Modal.Title>My Favorites</Modal.Title>
        <Modal.Content>
          <div key="1" className="flex justify-center">
            <article className="prose prose-gray max-w-3xl mx-4 my-12 dark:prose-invert">
              <h1 className="text-4xl font-extrabold tracking-tight">
                The Surprising Benefits of Laughter
              </h1>
              <br />
              <figure className="lg:-mx-12 xl:-mx-20">
                <img
                  alt="People laughing together"
                  className="aspect-video overflow-hidden rounded-lg object-contain"
                  height="340"
                  src={phiphiImage}
                  width="1250"
                />
                <figcaption className="text-center">
                  Laughter can help reduce stress and improve overall
                  well-being.
                </figcaption>
              </figure>
              <p className="text-gray-500 dark:text-gray-400">
                By Jane Doe | Published on May 3, 2024
              </p>
              <p>
                Laughter is often described as the best medicine, and for good
                reason. Numerous studies have shown that laughter has a wide
                range of physical and mental health benefits. From reducing
                stress to boosting the immune system, the power of laughter
                should not be underestimated.
              </p>
              <h2>Stress Relief</h2>
              <p>
                One of the most well-known benefits of laughter is its ability
                to alleviate stress. When we laugh, our bodies release
                endorphins, which are natural feel-good chemicals that can help
                reduce the physical symptoms of stress, such as muscle tension
                and elevated heart rate. Laughter also triggers the release of
                dopamine, a neurotransmitter that plays a key role in regulating
                mood and emotions.
              </p>

              <h2>Immune System Boost</h2>
              <p>
                Laughter has also been shown to have a positive impact on the
                immune system. When we laugh, our bodies produce more of the
                antibody immunoglobulin A (IgA), which helps protect us from
                infections and illnesses. Additionally, laughter has been linked
                to a decrease in the production of cortisol, a hormone that can
                suppress the immune system when present in high levels.
              </p>
              <h2>Improved Cardiovascular Health</h2>
              <p>
                Believe it or not, laughter can also benefit our cardiovascular
                health. Studies have found that laughter can improve blood flow
                and reduce the risk of heart disease by lowering blood pressure
                and improving the function of blood vessels. Laughter has even
                been shown to have a similar effect on the body as exercise,
                making it a valuable tool for maintaining a healthy heart.
              </p>
              <p>
                In conclusion, the benefits of laughter are truly remarkable.
                Whether it's reducing stress, boosting the immune system, or
                improving cardiovascular health, incorporating more laughter
                into our daily lives can have a profound impact on our overall
                well-being. So, the next time you're feeling stressed or down,
                try to find something that makes you laugh – your body and mind
                will thank you.
              </p>
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
