import React from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import LastMonthSales from "../../shared/metrics/LastMonthSales";
import OnlineSignupsFilled from "../../shared/metrics/OnlineSignupsFilled";
import NewVisitorsThisMonth from "../../shared/metrics/NewVisitorsThisMonth";
import TotalRevenueThisYear from "../../shared/metrics/TotalRevenueThisYear";
import OrdersReport from "../../shared/metrics/OrdersReport";
import CreditScore from "../../shared/metrics/CreditScore";
import TrafficAnalysis from "../../shared/metrics/TrafficAnalysis";
import OnlineSignups from "../../shared/metrics/OnlineSignups";
import RevenueThisYear from "../../shared/metrics/RevenueThisYear";
import EmailCampaign from "../../shared/metrics/EmailCampaign";
import AvgDailyTraffic from "../../shared/metrics/AvgDailyTraffic";
import NewSubscribers from "../../shared/metrics/NewSubscribers";
import NewAuthors from "../../shared/metrics/NewAuthors";
import NewArticles from "../../shared/metrics/NewArticles";
import SalesReport from "../../shared/metrics/SalesReport";
import ActiveUsers from "../../shared/metrics/ActiveUsers";
import PageViews from "../../shared/metrics/PageViews";
import Orders from "../../shared/metrics/Orders";
import ObjectCountOrders from "../../shared/metrics/ObjectCountCards/ObjectCountOrders";
import ObjectCountRevenue from "../../shared/metrics/ObjectCountCards/ObjectCountRevenue";
import ObjectCountVisits from "../../shared/metrics/ObjectCountCards/ObjectCountVisits";
import ObjectCountQueries from "../../shared/metrics/ObjectCountCards/ObjectCountQueries";
import Stocks from "../../shared/metrics/Stocks";
import SalesStatistics from "app/shared/metrics/SalesStatistics";
import AppUsers from "app/shared/metrics/AppUsers";
import SalesReport1 from "app/shared/metrics/SalesReport1";
import axios from "axios";
import BitcoinPrice from "./components/BitcoinPrice";
import RipplePrice from "./components/RipplePrice";
import EthereumPrice from "./components/EthereumPrice";
import LitecoinPrice from "./components/LitecoinPrice";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import CityReport from "./components/SalesReport/CityReport";
import SiteAudienceInfo from "app/shared/metrics/WelcomSummary/components/SiteAudienceInfo";
import SimpleRadialBarChart from "./components/SimpleRadialBarChart";
import SiteAudienceAgeInfo from "./components/SiteAudienceAgeInfo";
import ProfessionChart from "./components/ProfessionChart";
import CityWiseChart from "./components/CityWiseChart";

const MetricsPage = () => {
  const [mallId, setMallId] = React.useState("");
  const [selectedmallName, setselectedMallname] = React.useState("");
  const [mall, setMall] = React.useState([]);
  const handleChange2 = function (event, key) {
    setMallId(event.target.value);
    setselectedMallname(key.props.children);
  };

  //   React.useEffect(() => {
  //     if (mallId) {
  //       (async () => {
  //         const questions = await axios.get(
  //           `https://feedbackreviewbackend.onrender.com/mappingQuestion/${mallId}?type=all`
  //         );
  //         setQuestion(questions.data.getMappingQuestions);
  //       })();
  //     }
  //   }, [mallId, value]);

  React.useEffect(() => {
    // const mall = await axios.get(`https://feedbackreviewbackend.onrender.com/mall`);
    (async () => {
      const mall = await axios.get(
        `https://feedbackreviewbackend.onrender.com/mall`
      );
      setMall(mall?.data?.data);
      setMallId(mall?.data?.data?.[0]?._id);
    })();
  }, []);
  return (
    <>
      <Grid container spacing={3.75}>
        <Grid item xs={12} md={6} lg={12}>
          <SalesReport1 />
        </Grid>
        <Grid item lg={12}>
          <JumboCardQuick
            title={
              <Typography variant={"h3"} mb={2}>
                {"Customer Satisfaction Score"}
              </Typography>
            }
            subheader={
              <Typography variant={"h6"} color={"text.secondary"} mb={0}>
                {"Current Month v/s Last Month"}
              </Typography>
            }
            // action={<Chip label={"Today"} color={"primary"} size={"small"} />}
            wrapperSx={{ pt: 0 }}
          >
            <Grid container spacing={1}>
              {/* <Grid item xs={12} sm={6} lg={3}>
              <BitcoinPrice />
            </Grid> */}
              {mall?.map((e) => {
                return (
                  <Grid item  xs={12} sm={6} lg={3}>
                    <RipplePrice mall={e} />
                  </Grid>
                );
              })}
              {/* <Grid item xs={12} sm={6} lg={3}>
              <EthereumPrice />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <LitecoinPrice />
            </Grid> */}
            </Grid>
          </JumboCardQuick>
        </Grid>
        <Grid item lg={12} spacing={2}>
          <JumboCardQuick
            title={
              <Typography variant={"h3"} mb={2}>
                {"NPS Score"}
              </Typography>
            }
            wrapperSx={{ pt: 0 }}
          >
            <Grid display="flex" gap="10px">
              {mall?.map((e) => {
                return (
                  <Grid item xs={12} sm={6} lg={3}>
                    <LitecoinPrice mall={e} />
                  </Grid>
                );
              })}
            </Grid>
          </JumboCardQuick>
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <Box sx={{ my: "15px" }}>
            <FormControl sx={{ minWidth: 320 }} size="small">
              <InputLabel id="Types">Malls</InputLabel>
              <Select
                labelId="types-label"
                id="Types"
                value={mallId || ""}
                label="Types"
                onChange={(event, key) => handleChange2(event, key)}
              >
                {mall?.map((e) => (
                  <MenuItem value={e._id} key={e.mall_name}>
                    {e.mall_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        {mallId && (
          <>
            <Grid item xs={12}>
              <SalesStatistics mallId={mallId} />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <AppUsers mallId={mallId} />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <SiteAudienceInfo mallId={mallId} />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <SiteAudienceAgeInfo mallId={mallId} />
            </Grid>
            {/* <Grid item xs={12} md={6} lg={12}>
              <SalesReport mallId={mallId} />
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <CityReport mallId={mallId} />
            </Grid> */}
            <Grid item xs={12} md={6} lg={12}>
              <ProfessionChart mallId={mallId} />
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <CityWiseChart mallId={mallId} />
            </Grid>
          </>
        )}
        {/* <Grid item xs={12} sm={6} lg={3}>
          <LastMonthSales />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <OnlineSignupsFilled />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <NewVisitorsThisMonth />
        </Grid> */}
        {/* <Grid item xs={12} sm={6} lg={3}>
                <TotalRevenueThisYear/>
            </Grid> */}
        {/* <Grid item xs={12} md={6} lg={4}>
                <OrdersReport/>
            </Grid> */}
        {/* <Grid item xs={12} md={6} lg={4}>
                <CreditScore/>
            </Grid> */}
        {/* <Grid item xs={12} lg={4}>
                <TrafficAnalysis/>
            </Grid> */}
        {/* <Grid item xs={12} sm={6} lg={3}>
                <ObjectCountOrders vertical={true}/>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <ObjectCountRevenue vertical={true}/>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <ObjectCountVisits vertical={true}/>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <ObjectCountQueries vertical={true}/>
            </Grid> */}

        {/* <Grid item xs={12} md={6} lg={4}>
                <OnlineSignups/>
            </Grid> */}

        {/* <Grid item xs={12} md={6} lg={4}>
                <RevenueThisYear/>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <EmailCampaign/>
            </Grid> */}
        {/* <Grid item xs={12} md={6} lg={4}>
                <AvgDailyTraffic/>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <NewAuthors/>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <NewArticles/>
            </Grid>
            
            <Grid item xs={12} md={6} lg={4}>
                <ActiveUsers/>
            </Grid> */}
        {/* <Grid item xs={12} md={6} lg={4}>
                <PageViews/>
            </Grid> */}
        {/* <Grid item xs={12} md={6} lg={4}>
                <Orders/>
            </Grid> */}
        {/* <Grid item xs={12} md={6} lg={4}>
                <Stocks/>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <ObjectCountOrders vertical={true}/>
            </Grid> */}
        {/* <Grid item xs={12} sm={6} lg={3}>
                <ObjectCountRevenue vertical={true}/>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <ObjectCountVisits vertical={true}/>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <ObjectCountQueries vertical={true}/>
            </Grid> */}
      </Grid>
    </>
  );
};

export default MetricsPage;
