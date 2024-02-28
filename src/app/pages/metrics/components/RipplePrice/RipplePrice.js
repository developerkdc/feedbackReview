import React, { useState } from 'react';
import Typography from "@mui/material/Typography";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { useTranslation } from "react-i18next";
import { TrendingUp } from "@mui/icons-material";
import OnlineSignupChartFilled from "./OnlineSignupChartFilled";
import axios from 'axios';

const month = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"
}

const RipplePrice = ({ mall }) => {
    const { t } = useTranslation();
    const [data, setData] = useState([])

    React.useEffect(() => {
        // const mall = await axios.get(`${process.env.REACT_APP_URL}/mall`);
        (async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_URL}/graph/mallMonthResult?id=${mall?._id}`);
                setData(data.Data.map((e) => ({ month: month[e._id.month], count: e.totalFeedback, })))
            } catch (error) {
                console.error(error)
            }
        })()
    }, []);

    return (
        <JumboCardQuick
            title={<Typography variant={"h3"} color={"common.white"}>{mall?.mall_name}</Typography>}
            // subheader={
            //     <Typography
            //         variant={"h6"}
            //         color={"common.white"}
            //         mb={0}
            //     >{mall?.mall_name}</Typography>
            // }
            // action={
            //     <Typography
            //         variant={"body1"}
            //     >
            //         6% <TrendingUp sx={{ verticalAlign: 'middle', fontSize: '1rem', ml: .5 }} />
            //     </Typography>
            // }
            sx={{ color: "common.white" }}
            bgColor={"#E44A77"}
            wrapperSx={{ pt: 0 }}
        >
            <OnlineSignupChartFilled color={"#fff"} shadowColor={"#000000"} data={data}/>
        </JumboCardQuick>
    );
};

export default RipplePrice;
