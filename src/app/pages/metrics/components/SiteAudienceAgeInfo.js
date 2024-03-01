import React, { useEffect, useState } from "react";
import { LinearProgress, Typography } from "@mui/material";
import Div from "@jumbo/shared/Div";
import styled from "@mui/material/styles/styled";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import axios from "axios";

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 5,
  flex: 1,
}));
const COLORS = ["warning", "secondary", "success"];
const SiteAudienceAgeInfo = ({ mallId }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios(
          `${process.env.REACT_APP_URL}/graph/agewiseResult?id=${mallId}`
        );
        setData(
          data?.Data[0]?.ageGroups?.map((e, index) => ({
            label: e.range,
            value: Math.round((e.count * 100) / data.Data[0].totalCount),
            count: e.count,
            color: COLORS[index],
          }))
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }, [mallId]);
  return (
    <React.Fragment>
      <JumboCardQuick
        // title={<Typography variant={"h3"}>{t('widgets.title.appUsers')}</Typography>}
        title={<Typography variant={"h3"}>{"Age Group"}</Typography>}
        // subheader={<Typography variant={"h6"} color={"text.secondary"}
        //                        mb={0}>{"For particular Mall"}</Typography>}
        wrapperSx={{ pt: 0 }}
      >
        <Typography variant={"h5"}></Typography>
        {data &&
          data.map((item, index) => (
            <React.Fragment key={index}>
              <Typography variant={"body1"} color={"text.secondary"}>
                {`${item.label} (${item.count})`}
              </Typography>
              <Div
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 0.5,
                }}
              >
                <StyledLinearProgress
                  variant={"determinate"}
                  //   value={item.value}
                  value={item.value}
                  color={item.color}
                />
                <Typography
                  variant={"body1"}
                  color={"text.secondary"}
                  ml={1}
                >{`${item.value} %`}</Typography>
              </Div>
            </React.Fragment>
          ))}
      </JumboCardQuick>
    </React.Fragment>
  );
};

export default SiteAudienceAgeInfo;
