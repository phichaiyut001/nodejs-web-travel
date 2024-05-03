import React from "react";
import { Link } from "react-router-dom";
import { ButtonDropdown, Button, Card, Text } from "@geist-ui/core";

import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col gap-8 p-p md:p-10">
        <div className="flex items-conter justify-between">
          <h1 className="text-3xl font-bold">Blog Analytics</h1>
          <div className="flex items-center gap-4 font-bold">
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
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card shadow>
            <Text h4 my={0} className="">
              Total View
            </Text>
            <Text className="font-bold text-2xl">24,567</Text>
          </Card>
          <Card shadow>
            <Text h4 my={0} className="">
              Unique Visior
            </Text>
            <Text className="font-bold text-2xl">24,567</Text>
          </Card>
          <Card shadow>
            <Text h4 my={0} className="">
              Avg. Time on site
            </Text>
            <Text className="font-bold text-2xl">2m 34s</Text>
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

function BarChart(props) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: "Jan", count: 111 },
          { name: "Feb", count: 157 },
          { name: "Mar", count: 129 },
          { name: "Apr", count: 150 },
          { name: "May", count: 119 },
          { name: "Jun", count: 72 },
        ]}
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

function LineChart(props) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
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

export default Dashboard;
