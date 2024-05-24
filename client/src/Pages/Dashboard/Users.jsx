import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { Pagination } from "@geist-ui/core";
import axios from "axios";
import Swal from "sweetalert2";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(
          "https://nodejs-web-travel.onrender.com/api/users"
        );
        const filteredUsers = res.data.filter((user) => !user.isAdmin);
        setUsers(filteredUsers);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  const handleDelete = async (userId, e) => {
    // รับ userId มาจากการคลิกที่ปุ่มลบ
    e.preventDefault();
    try {
      const result = await Swal.fire({
        title: "ต้องการลบผู้ใช้นี้หรือไม่?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่, ลบ!",
      });

      if (result.isConfirmed) {
        await axios.delete(
          `https://nodejs-web-travel.onrender.com/api/users/${userId}`
        ); // เปลี่ยนเส้นทางเป็น `/api/users/${userId}`
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
        Swal.fire("Deleted!", "ผู้ใช้ถูกลบแล้ว", "success");
      }
    } catch (err) {
      throw new Error("ลบผู้ใช้ไม่สำเร็จ");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8 p-p md:p-10">
        <h1 className="text-2xl font-bold">USER</h1>
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
              <TableColumn>Username</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody>
              {items &&
                items.map((item, index) => (
                  <TableRow key={index} className=" border">
                    <TableCell className="font-medium">
                      {index + 1 + (page - 1) * rowsPerPage}
                    </TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.email}</TableCell>

                    <TableCell>
                      {" "}
                      {/* <Button className="mr-2" size="icon" variant="outline">
                        <DeleteIcon className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button> */}
                      <Button
                        className="text-red-500"
                        size="icon"
                        variant="outline"
                        onClick={(e) => {
                          console.log("Delete User ID:", item.id); // เพิ่มบรรทัดนี้เข้าไป
                          handleDelete(item.id, e);
                        }}
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

export default Users;
