import { Stack, Typography } from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import React, { useEffect, useState } from "react";
import { salesData } from "./data";
import { styled } from "@mui/material/styles";
import axios from "axios";

const Item = styled("div")(({ theme }) => ({
    color: theme.palette.common.white,
    marginBottom: 16,
    width: '15.5%',
    [theme.breakpoints.down('lg')]: {
        width: '16.5%',
    },
    [theme.breakpoints.down('md')]: {
        width: '33.3%',
    },
    [theme.breakpoints.down('sm')]: {
        width: '50%',
    },
    padding: theme.spacing(0, 2)
}));

const RenderSalesData = ({ mallId }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        (
            async function () {
                try {
                    const { data } = await axios(`${process.env.REACT_APP_URL}/graph/averages?id=${mallId}`);
                    setData(data?.Data?.[0]);

                } catch (error) {
                    console.error(error)
                }
            }
        )()
    }, [mallId])

    return (
        <Stack
            direction={"row"}
            flexWrap={"wrap"}
            sx={{ p: theme => theme.spacing(0, 1, 2) }}
        >
            <Item>
                <Typography variant={"body1"} color={"common.white"} mb={1}>
                    <DateRangeIcon fontSize={"small"} sx={{ verticalAlign: "middle", mr: 1, mt: -.5 }} />
                    {Number(data?.monthAverage).toFixed(2)}
                </Typography>
                <Typography variant={"h6"} color={"common.white"} mb={0}>{"Monthly Average"}</Typography>
            </Item>
            <Item>
                <Typography variant={"body1"} color={"common.white"} mb={1}>
                    <DateRangeIcon fontSize={"small"} sx={{ verticalAlign: "middle", mr: 1, mt: -.5 }} />
                    {Number(data?.weekAverage).toFixed(2)}
                </Typography>
                <Typography variant={"h6"} color={"common.white"} mb={0}>{"Weekly Average"}</Typography>
            </Item>
            <Item>
                <Typography variant={"body1"} color={"common.white"} mb={1}>
                    <DateRangeIcon fontSize={"small"} sx={{ verticalAlign: "middle", mr: 1, mt: -.5 }} />
                    {Math.round(Number(data?.average).toFixed(2))}
                </Typography>
                <Typography variant={"h6"} color={"common.white"} mb={0}>{"Average"}</Typography>
            </Item>
            <Item>
                <Typography variant={"body1"} color={"common.white"} mb={1}>
                    <DateRangeIcon fontSize={"small"} sx={{ verticalAlign: "middle", mr: 1, mt: -.5 }} />
                    {Number(data?.totalCount)}
                </Typography>
                <Typography variant={"h6"} color={"common.white"} mb={0}>{"Total FeedBack"}</Typography>
            </Item>
            
            {/* {
                salesData.map((item, key) => (
                    <Item key={key}>
                        <Typography variant={"body1"} color={"common.white"} mb={1}>
                            <DateRangeIcon fontSize={"small"} sx={{ verticalAlign: "middle", mr: 1, mt: -.5 }} />
                            {item.amount}
                        </Typography>
                        <Typography variant={"h6"} color={"common.white"} mb={0}>{item.name}</Typography>
                    </Item>
                ))
            } */}
        </Stack>
    )
};
export default RenderSalesData;
