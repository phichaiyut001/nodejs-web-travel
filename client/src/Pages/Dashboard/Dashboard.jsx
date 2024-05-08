import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ButtonDropdown, Button, Card, Text, Tag } from "@geist-ui/core";

import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import axios from "axios";

const Dashboard = () => {
  const [getusers, setgetUsers] = useState([]);
  const [getposts, setgetPosts] = useState([]);
  const [weeklyPosts, setWeeklyPosts] = useState([]);
  const [lastWeekLatestPost, setLastWeekLatestPost] = useState("");
  const [categoryCounts, setCategoryCounts] = useState({
    food: 0,
    temple: 0,
    mount: 0,
    sea: 0,
  });
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get("/api/users");
        const filterUsers = res.data.filter((user) => !user.isAdmin);
        setgetUsers(filterUsers);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, []);
  console.log(getusers);

  useEffect(() => {
    const Fetchdata = async () => {
      try {
        const res = await axios.get("/api/posts");
        setgetPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    Fetchdata();
  }, []);

  useEffect(() => {
    const countCategories = () => {
      const counts = { food: 0, temple: 0, mount: 0, sea: 0 };
      getposts.forEach((post) => {
        switch (post.cat) {
          case "food":
            counts.food++;
            break;
          case "temple":
            counts.temple++;
            break;
          case "mount":
            counts.mount++;
            break;
          case "sea":
            counts.sea++;
            break;
          default:
            break;
        }
      });
      setCategoryCounts(counts);
    };
    countCategories();
  }, [getposts]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("api/posts");
        const posts = res.data;

        const today = new Date();
        const lastWeekStart = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 6
        );

        const weeklyCounts = {};

        posts.forEach((post) => {
          const postDate = new Date(post.date);
          const postDateFormatted = formatDate(postDate);
          if (postDate >= lastWeekStart && postDate <= today) {
            if (weeklyCounts[postDateFormatted]) {
              weeklyCounts[postDateFormatted]++;
            } else {
              weeklyCounts[postDateFormatted] = 1;
            }
          }
        });

        const weeklyData = [];
        const latestPostDate = new Date(
          Math.max(...posts.map((post) => new Date(post.date)))
        );
        const latestPostDateFormatted = formatDate(latestPostDate);

        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(today.getDate() - i);
          const dateFormatted = formatDate(date);
          if (weeklyCounts[dateFormatted] !== undefined) {
            weeklyData.push({
              name: dateFormatted,
              count: weeklyCounts[dateFormatted],
            });
          } else if (dateFormatted === latestPostDateFormatted) {
            weeklyData.push({
              name: dateFormatted,
              count: 0,
            });
          }
        }

        const lastWeekLatestPostDate = latestPostDate;

        const lastWeekLatestPostFormatted = formatDate(lastWeekLatestPostDate);

        setWeeklyPosts(weeklyData);
        setLastWeekLatestPost(lastWeekLatestPostFormatted);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  function BarChart(props) {
    return (
      <div {...props}>
        <ResponsiveBar
          data={weeklyPosts}
          keys={["count"]}
          indexBy="name"
          margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
          padding={0.3}
          colors={["#2563eb"]}
          axisBottom={{
            tickSize: 0,
            tickPadding: 16,
          }}
          axisLeft={{
            tickSize: 0,
            tickValues: 4,
            tickPadding: 16,
          }}
          gridYValues={4}
          theme={{
            tooltip: {
              chip: {
                borderRadius: "9999px",
              },
              container: {
                fontSize: "12px",
                textTransform: "capitalize",
                borderRadius: "6px",
              },
            },
            grid: {
              line: {
                stroke: "#f3f4f6",
              },
            },
          }}
          tooltipLabel={({ id }) => `${id}`}
          enableLabel={false}
          role="application"
          ariaLabel="A bar chart showing data"
        />
      </div>
    );
  }

  const data = getposts.reduce((acc, post) => {
    const month = new Date(post.date).getMonth();
    const year = new Date(post.date).getFullYear();
    const monthYear = `${month + 1}/${year}`;

    const existingMonth = acc.find((item) => item.x === monthYear);
    if (existingMonth) {
      existingMonth.y++;
    } else {
      acc.push({ x: monthYear, y: 1 });
    }
    return acc;
  }, []);

  function LineChart(props) {
    return (
      <div {...props}>
        <ResponsiveLine
          data={[
            {
              id: "Posts",
              data: data,
            },
          ]}
          margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
          xScale={{
            type: "point",
          }}
          yScale={{
            type: "linear",
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 16,
          }}
          axisLeft={{
            tickSize: 0,
            tickValues: 5,
            tickPadding: 16,
          }}
          colors={["#2563eb", "#e11d48"]}
          pointSize={6}
          useMesh={true}
          gridYValues={6}
          theme={{
            tooltip: {
              chip: {
                borderRadius: "9999px",
              },
              container: {
                fontSize: "12px",
                textTransform: "capitalize",
                borderRadius: "6px",
              },
            },
            grid: {
              line: {
                stroke: "#f3f4f6",
              },
            },
          }}
          role="application"
        />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-8 p-p md:p-10">
        <div className="flex items-conter justify-between">
          <h1 className="text-3xl font-bold">Blog Analytics</h1>
          {/* <div className="flex items-center gap-4 font-bold">
            <ButtonDropdown
              auto
              icon={<CalendarClockIcon className="h-8 w-8" />}
            >
              <ButtonDropdown.Item main>Last 1 Mont</ButtonDropdown.Item>
              <ButtonDropdown.Item>Last 7 Days</ButtonDropdown.Item>
              <ButtonDropdown.Item>Last 14 Days</ButtonDropdown.Item>
            </ButtonDropdown>
            <Button
              auto
              scale={0.75}
              iconRight={<DownloadIcon className="h-4 w-4" />}
            >
              <span className="font-bold">Export</span>
            </Button>
          </div> */}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card shadow>
            <Text h4 my={0} className="">
              Post ทั้งหมด
            </Text>
            <Text className="font-bold text-2xl">{getposts.length}</Text>
          </Card>
          <Card shadow>
            <Text h4 my={0} className="">
              User ทั้งหมด
            </Text>
            <Text className="font-bold text-2xl">{getusers.length}</Text>
          </Card>
          <Card shadow>
            <Text h4 my={0} className="">
              หมวดหมู่
            </Text>
            <Text className="font-bold text-2xl">
              <div className="">
                <Tag mr="10px">เที่ยวตะลอนกิน: {categoryCounts.food}</Tag>
                <Tag mr="10px">เที่ยววัด: {categoryCounts.temple}</Tag>
                <Tag mr="10px">เที่ยวภูเขา: {categoryCounts.mount}</Tag>
                <Tag mr="10px">เที่ยวทะเล: {categoryCounts.sea}</Tag>
              </div>
            </Text>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card shadow>
            <Text h4 my={0} className="font-bold text-2xl ">
              Blog Post per Day
            </Text>
            <Text className="mt-4">
              <BarChart className="aspect-[16/9]" />
            </Text>
          </Card>
          <Card shadow>
            <Text h4 my={0} className="font-bold text-2xl">
              Blog Post per Mounth
            </Text>
            <Text className="mt-4">
              <LineChart className="aspect-[16/9]" />
            </Text>
          </Card>
        </div>
      </div>
    </>
  );
};
function CalendarClockIcon(props) {
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
      <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h5" />
      <path d="M17.5 17.5 16 16.3V14" />
      <circle cx="16" cy="16" r="6" />
    </svg>
  );
}

function DownloadIcon(props) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

export default Dashboard;
