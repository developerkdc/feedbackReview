import React, { useEffect, useState } from "react";
import { Card, Grid, Typography } from "@mui/material";
import LineChartSales from "./LineChartSales";
import ChartOrderRevenue from "./ChartOrderRevenue";
import renderSalesData from "./renderSalesData";
import { dataItems, menuItems } from "./data";
import JumboContent from "@jumbo/components/JumboContent";
import Div from "@jumbo/shared/Div";
import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import AppUsers from "../AppUsers";
import ChartAppUsers from "../AppUsers/ChartAppUsers";
import CreditScoreChart from "../CreditScore/CreditScoreChart";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import RenderSalesData from "./renderSalesData";
import axios from "axios";

const SalesStatistics = ({ mallId }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [totalFeedback, setTotalFeedback] = useState(0);
  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios(
          `${process.env.REACT_APP_URL}/graph/averages?id=${mallId}`
        );
        setTotalFeedback(data?.Data[0]?.totalCount);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [mallId]);
  return (
    <Card>
      <JumboContent
        title={
          <Typography
            variant={"h5"}
            color={"common.white"}
            // >{t('widgets.title.salesStatistics')}</Typography>
          >
            Feedback Statistics
          </Typography>
        }
        action={<JumboDdMenu menuItems={menuItems} />}
        bgColor={(theme) => theme.palette.primary.main}
        sx={{ color: "common.white" }}
      >
        {/* {renderSalesData()} */}
        <RenderSalesData mallId={mallId} />
      </JumboContent>
      <JumboContent>
        <Grid container>
          <Grid item xs={12} lg={6}>
            <Div
              sx={{
                p: (theme) => theme.spacing(3, 2, 3, 0),
              }}
            >
              <LineChartSales mallId={mallId} />
            </Div>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Div
              sx={{
                p: (theme) => theme.spacing(3, 0, 3, 2),
                [theme.breakpoints.up("lg")]: {
                  borderLeft: (theme) => `solid 2px ${theme.palette.divider}`,
                },
                [theme.breakpoints.down("lg")]: {
                  borderTop: (theme) => `solid 2px ${theme.palette.divider}`,
                },
              }}
            >
              {/* <ChartOrderRevenue data={dataItems}/> */}
              {/* <AppUsers/> */}
              {/* <ChartAppUsers/> */}
              <JumboCardQuick
                // title={t("widgets.title.creditScore")}
                title={"Net Promoter Score"}
                subheader={`Out of ${totalFeedback} feedbacks`}
                sx={{
                  textAlign: "center",
                }}
                wrapperSx={{ pt: 0 }}
              >
                <CreditScoreChart score={100} mallId={mallId} />
              </JumboCardQuick>
            </Div>
          </Grid>
        </Grid>
      </JumboContent>
    </Card>
  );
};

export default SalesStatistics;
