import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { salesHistoryWithPast } from "./data";
import Div from "@jumbo/shared/Div";
import { capitalizeFLetter } from "@jumbo/utils";
import axios from "axios";
// const data = [
//     { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
//     { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
//     { name: 'Page C', uv: 2000, pv: 12800, amt: 2290 },
//     { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
//     { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
//     { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
//     { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
//     { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
//     { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
//     { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
//     { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
//     { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
//   ];

const SalesReportChart = ({ mallId }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios(
          `https://feedbackreviewbackend.onrender.com/graph/professionwiseResult?id=${mallId}`
        );
        let res = data?.Data[0];
        setData(
          res?.professions?.map((e) => ({
            name: e.profession,
            profession: e.count,
            // index: Number(e._id.star),
            // value:e.totalStar
          }))
        );
        // console.log(res,"city36666666");
      } catch (error) {
        console.error(error);
      }
    })();
  }, [mallId]);
  return (
    <ResponsiveContainer height={215}>
      {/* <BarChart data={salesHistoryWithPast}>
                <Tooltip
                    animationEasing={"ease-in-out"}
                    content={({active, label, payload}) => {
                        return active ? (
                            <Div sx={{color: "common.white"}}>
                                {payload.map((row, index) => {
                                    return (
                                        <div key={index} className={index !== payload.length - 1 ? "mb-1" : ""}>
                                            <div style={{
                                                color: row.color,
                                                fontSize: 8,
                                                letterSpacing: 2,
                                                textTransform: 'uppercase'
                                            }}>
                                                {capitalizeFLetter(row.name)}
                                            </div>
                                            <div style={{
                                                color: row.color
                                            }}
                                            >{row.value} USD
                                            </div>
                                        </div>
                                    )
                                })}
                            </Div>
                        ) : null;
                    }}
                    wrapperStyle={{
                        background: 'rgba(255,255,255,0.9)',
                        borderRadius: 4,
                        padding: '5px 8px',
                        fontWeight: 500,
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                    }}
                />
                <XAxis dataKey="name" tickLine={false} axisLine={false}/>
                <Bar dataKey="current" fill="#9046EB" stackId={"a"} maxBarSize={10} barSize={4}/>
                <Bar dataKey="past" fill="#7B92D8" stackId={"a"} maxBarSize={10} barSize={4}/>
            </BarChart> */}
      <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="2 2" />
        <Tooltip
          labelStyle={{ color: "black" }}
          itemStyle={{ color: "black" }}
          cursor={false}
        />
        <Legend />
        <defs>
          <linearGradient x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6200EE" stopOpacity={1} />
            <stop offset="95%" stopColor="#B819D2" stopOpacity={1} />
          </linearGradient>
        </defs>
        <defs>
          <linearGradient x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1ABBDE" stopOpacity={1} />
            <stop offset="95%" stopColor="#09BCA7" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Bar dataKey="profession" fill={"#e91e63"} />
        {/* <Bar dataKey="uv" fill={"#e91e63"}/> */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesReportChart;
