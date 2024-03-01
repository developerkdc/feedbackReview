import React, { useEffect, useState } from "react";
import {
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import axios from "axios";

const style = {
  top: 20,
  left: "10%",
  lineHeight: "24px",
};
// [
//   { name: "18-24", uv: 31.47, pv: 2400, fill: "#1e88e5" },
//   { name: "25-29", uv: 26.69, pv: 4567, fill: "#83a6ed" },
//   { name: "30-34", uv: 15.69, pv: 1398, fill: "#8dd1e1" },
//   { name: "35-39", uv: 8.22, pv: 9800, fill: "#e91e63" },
//   { name: "40-49", uv: 8.63, pv: 3908, fill: "#a4de6c" },
//   { name: "50+", uv: 2.63, pv: 4800, fill: "#d0ed57" },
//   { name: "unknow", uv: 6.67, pv: 4800, fill: "#e91e63" },
// ];
const COLORS = [
  "#1e88e5",
  "#83a6ed",
  "#8dd1e1",
  "#e91e63",
  "#a4de6c",
  "#d0ed57",
  "#e91e63",
];
const SimpleRadialBarChart = ({ mallId }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios(
          `${process.env.REACT_APP_URL}/graph/agewiseResult?id=${mallId}`
        );
        setData(
          data?.Data[0]?.ageGroups?.map((e, index) => ({
            name: e.range,
            count: e.count,
            fill: COLORS[index],
          }))
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }, [mallId]);

  return (
    <JumboDemoCard
      title={"Simple Radial Bar Chart"}
      wrapperSx={{ pt: 0, backgroundColor: "background.paper" }}
    >
      <ResponsiveContainer width="100%" height={200}>
        <RadialBarChart
          innerRadius={8}
          outerRadius={100}
          barSize={8}
          data={data}
        >
          <RadialBar
            minAngle={10}
            label
            background
            clockWise={false}
            dataKey="count"
          />
          <Legend
            iconSize={10}
            width={100}
            height={120}
            layout="vertical"
            verticalAlign="left"
            wrapperStyle={style}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </JumboDemoCard>
  );
};

export default SimpleRadialBarChart;
