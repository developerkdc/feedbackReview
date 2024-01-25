import React from 'react';
import {Cell, Pie, PieChart, ResponsiveContainer} from 'recharts';
import List from "@mui/material/List";
import {ListItem, ListItemIcon, ListItemText} from "@mui/material";
import styled from "@emotion/styled";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const data = [
    {name: '1 Star', value: 30},
    {name: '2 Star', value: 180},
    {name: '3 Star', value: 100},
    {name: '4 Star', value: 300},
    {name: '5 Star', value: 500},
];
const COLORS = ['#FF0000 ', '#FF6600','#FFCC00', '#99FF00','#00FF00'];  //,'#7352C7''#E73145', '#3BD2A2'

const ListItemInline = styled(ListItem)(({theme}) => ({
    width: 'auto',
    display: 'inline-flex',
    padding: theme.spacing(0, .5),
}));

const ChartAppUsers = () => {
    return (
        <React.Fragment>
            <ResponsiveContainer width="100%" height={140}>
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
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                            ))
                        }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <List
                disablePadding
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    justifyContent: 'center',
                    minWidth: 0,
                    mt: 1
                }}
            >
                <ListItemInline>
                    <ListItemIcon sx={{minWidth: 16}}>
                        <FiberManualRecordIcon fontSize={"10px"} sx={{color: COLORS[0]}}/>
                    </ListItemIcon>
                    <ListItemText primary="1 Star"/>
                </ListItemInline>
                <ListItemInline>
                    <ListItemIcon sx={{minWidth: 16}}>
                        <FiberManualRecordIcon fontSize={"10px"} sx={{color: COLORS[1]}}/>
                    </ListItemIcon>
                    <ListItemText primary="2 Star"/>
                </ListItemInline>
                <ListItemInline>
                    <ListItemIcon sx={{minWidth: 16}}>
                        <FiberManualRecordIcon fontSize={"10px"} sx={{color: COLORS[2]}}/>
                    </ListItemIcon>
                    <ListItemText primary="3 Star"/>
                </ListItemInline>
                <ListItemInline>
                    <ListItemIcon sx={{minWidth: 16}}>
                        <FiberManualRecordIcon fontSize={"10px"} sx={{color: COLORS[3]}}/>
                    </ListItemIcon>
                    <ListItemText primary="4 Star"/>
                </ListItemInline>
                <ListItemInline>
                    <ListItemIcon sx={{minWidth: 16}}>
                        <FiberManualRecordIcon fontSize={"10px"} sx={{color: COLORS[4]}}/>
                    </ListItemIcon>
                    <ListItemText primary="5 Star"/>
                </ListItemInline>
            </List>
        </React.Fragment>
    );
};

export default ChartAppUsers;
