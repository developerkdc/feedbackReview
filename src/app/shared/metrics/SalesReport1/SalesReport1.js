import React from 'react';
import SalesReportChart1 from "./SalesReportChart1";
import {Chip, Grid, Typography} from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {useTranslation} from "react-i18next";

const SalesReport1 = () => {
    const {t} = useTranslation();
    return (
        <JumboCardQuick
            // title={<Typography variant={"h3"} mb={0}>{"Total Survey Results"}</Typography>}
            title={<Typography variant={"h3"} mb={0}>{"Detractor vs Promoter"}</Typography>}
            // action={<Chip label={"Today"} color={"primary"} size={"small"} />}
            wrapperSx={{pt: 0}}
        >
            <Grid display="flex" gap="10px" margin="0px 0px 30px 0px">

            {/* <Typography variant={"h5"}>Current Month v/s Last Month</Typography> */}
            <Typography variant={"body1"} color="text.secondary" mb={1.5}>Overall Data</Typography>
            </Grid>
            <SalesReportChart1/>
        </JumboCardQuick>
    );
};

export default SalesReport1;
