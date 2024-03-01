import React, { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import List from "@mui/material/List";
import { Chip, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import styled from "@emotion/styled";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import axios from "axios";
import Div from "@jumbo/shared/Div";

const data = [
  { name: "1 Star", value: 30 },
  { name: "2 Star", value: 180 },
  { name: "3 Star", value: 100 },
  { name: "4 Star", value: 300 },
  { name: "5 Star", value: 500 },
];
const COLORS = ["#FF0000 ", "#FF6600", "#FFCC00", "#99FF00", "#00FF00"]; //,'#7352C7''#E73145', '#3BD2A2'

const ListItemInline = styled(ListItem)(({ theme }) => ({
  width: "auto",
  display: "inline-flex",
  padding: theme.spacing(0, 0.5),
}));

const ChartAppUsers = ({ mallId }) => {
  console.log(mallId);

  const [data, setData] = useState([]);
  const [totalresponse, setTotalresponse] = useState(0);

  // useEffect(()=>{
  //     (
  //         async function(){
  //             try {
  //                 const {data} = await axios(`${process.env.REACT_APP_URL}/graph/mallTotalStar?id=${mallId}`);
  //                 setData(data.Data.map((e)=> ( {name: `${e._id.star} Star`, value: e.totalStar,index:Number(e._id.star)})))
  //                 console.log(data.Data)

  //             } catch (error) {
  //                 console.error(error)
  //             }
  //         }
  //     )()
  // },[mallId])
  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios(
          `${process.env.REACT_APP_URL}/graph/mallTotalStar?id=${mallId}`
        );
        setData(
          data.Data.map((e) => ({
            totalStar: e._id.star,
            star: e._id.star,
            index: Number(e._id.star),
            value: e.totalStar,
          }))
        );
        console.log(data.Data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [mallId]);
  console.log(data, "-------------------------------");
  return (
    <React.Fragment>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <ResponsiveContainer width="50%" height={240}>
          <PieChart>
            <Pie
              data={data}
              cx={"50%"}
              cy={"50%"}
              innerRadius={40}
              outerRadius={60}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${entry?.index - 1}`}
                  fill={COLORS[entry?.index - (1 % COLORS.length)]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <List
          disablePadding
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            minWidth: 0,
            mt: 1,
            flexDirection: "column",
          }}
        >
          {data.map((entry, index) => (
            <ListItemInline key={index}>
              <ListItemIcon sx={{ minWidth: 16 }}>
                {Array.from({ length: entry.totalStar }).map((_, i) => (
                  <svg
                    key={i}
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill={COLORS[entry.index - (1 % COLORS.length)]}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2l2.2 6.6h7.1l-5.7 4.5 2.2 6.6-5.7-4.5-5.7 4.5 2.2-6.6-5.7-4.5h7.1z"
                      fill={COLORS[entry.index - (1 % COLORS.length)]}
                    />
                  </svg>
                ))}
              </ListItemIcon>
              {/* <ListItemText sx={{padding:"1%"}} primary={`${entry.value}`} /> */}
              <Chip label={`${entry.value}`} sx={{ margin: "2%" }} />
            </ListItemInline>
          ))}
        </List>
      </Div>
    </React.Fragment>
  );
};

export default ChartAppUsers;
