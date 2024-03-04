import React, { useEffect, useState } from 'react';
import {
    CartesianGrid, Legend, Line,
    LineChart, ResponsiveContainer, Tooltip,
    XAxis, YAxis
} from 'recharts';
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import axios from 'axios';

const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];
const CityWiseChart = ({mallId}) => {
    const [data, setData] = useState([]);
    useEffect(() => {
      (async function () {
        try {
          const { data } = await axios(
            `https://feedbackreviewbackend.onrender.com/graph/citywiseResult?id=${mallId}`
          );
          let res = data?.Data[0];
          setData(
            res?.cities?.map((e) => ({
              name: e.city,
              city: e.count,
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
        <JumboDemoCard title={"City Wise Chart"} wrapperSx={{ pt: 0, backgroundColor: 'background.paper' }}>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip labelStyle={{ color: 'black' }} itemStyle={{ color: 'black' }} cursor={false} />
                    <Legend />
                    {/* <Line type="monotone" dataKey="profession" stroke={"#1e88e5"} activeDot={{ r: 8 }} /> */}
                    <Line type="monotone" dataKey="city" stroke={"#e91e63"}/>
                </LineChart>
            </ResponsiveContainer>
        </JumboDemoCard>
    );
};

export default CityWiseChart;
