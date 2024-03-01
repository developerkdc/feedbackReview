import React, { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { salesHistoryWithPast } from "./data";
import Div from "@jumbo/shared/Div";
import { capitalizeFLetter } from "@jumbo/utils";
import axios from "axios";

const SalesReportChart1 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios(
          `https://feedbackreviewbackend.onrender.com/graph/positiveNegativeFeedback`
        );
        setData(
          data.Data.map((e) => {
            const data = { name: e._id.mallName, current: 0, past: 0 };
            e.mallData.forEach((element) => {
              if (element?._id?.status === "negative") {
                data["past"] = element?.totalFeedback;
              } else {
                data["current"] = element?.totalFeedback;
              }
            });
            return data;
          })
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return (
    <ResponsiveContainer height={138}>
      <BarChart data={data}>
        <Tooltip
          animationEasing={"ease-in-out"}
          content={({ active, label, payload }) => {
            return active ? (
              <Div sx={{ color: "common.white" }}>
                {payload.map((row, index) => {
                  // console.log(row);
                  return (
                    <div
                      key={index}
                      className={index !== payload.length - 1 ? "mb-1" : ""}
                    >
                      <div
                        style={{
                          color: row.color,
                          fontSize: 8,
                          letterSpacing: 2,
                          textTransform: "uppercase",
                        }}
                      >
                        {capitalizeFLetter(
                          row.name == "past" ? "Detractor" : "Promoter"
                        )}
                      </div>
                      <div
                        style={{
                          color: row.color,
                        }}
                      >
                        {row.value} Feedback
                      </div>
                    </div>
                  );
                })}
              </Div>
            ) : null;
          }}
          wrapperStyle={{
            background: "rgba(0,0,0,0.8)",
            borderRadius: 4,
            padding: "5px 8px",
            fontWeight: 500,
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          cursor={false}
        />
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
        <Bar
          dataKey="current"
          fill="#3bb143"
          stackId={"a"}
          maxBarSize={10}
          barSize={4}
        />
        <Bar
          dataKey="past"
          fill="#d1001f"
          stackId={"a"}
          maxBarSize={10}
          barSize={4}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesReportChart1;
