import React from 'react';
import ChartAppUsers from "./ChartAppUsers";
import {Typography} from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {useTranslation} from "react-i18next";

const AppUsers = () => {
    const {t} = useTranslation();
    return (
        <JumboCardQuick
            // title={<Typography variant={"h3"}>{t('widgets.title.appUsers')}</Typography>}
            title={<Typography variant={"h3"}>{"Customer Satisfaction Breakdown"}</Typography>}
            subheader={<Typography variant={"h6"} color={"text.secondary"}
                                   mb={0}>{"For particular Mall"}</Typography>}
            wrapperSx={{pt: 0}}
        >
            <ChartAppUsers/>
        </JumboCardQuick>
    );
};

export default AppUsers;
