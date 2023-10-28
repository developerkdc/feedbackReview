import * as React from 'react';
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Div from "@jumbo/shared/Div";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import code from "../Grids/demo-code/columns-grid.txt";
import { TextField, Typography } from '@mui/material';
import { Height } from '@mui/icons-material';

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ColumnsGrid = () => {
    return (
      <JumboDemoCard title={"User Details"}>
        <Div sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={16} margin={"auto"}>
            <Grid item xs={4}>
              <Item style={{height:"50px"}}>
                <Typography color={"black"} >Name</Typography>
              </Item>
            </Grid>
            <Grid item xs={8}>
              <Item>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  size='small'
                />
              </Item>
            </Grid>
          </Grid>
          <Grid container spacing={2} columns={16} margin={"auto"}>
            <Grid item xs={4}>
              <Item style={{height:"50px"}}>
                <Typography color={"black"} >Contact Number</Typography>
              </Item>
            </Grid>
            <Grid item xs={8}>
              <Item>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  size='small'
                />
              </Item>
            </Grid>
          </Grid>
          <Grid container spacing={2} columns={16} margin={"auto"}>
            <Grid item xs={4}>
              <Item style={{height:"50px"}}>
                <Typography color={"black"} >Email Id</Typography>
              </Item>
            </Grid>
            <Grid item xs={8}>
              <Item>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  size='small'
                />
              </Item>
            </Grid>
          </Grid>
          <Grid container spacing={2} columns={16} margin={"auto"}>
            <Grid item xs={4}>
              <Item style={{height:"50px"}}>
                <Typography color={"black"} >Address</Typography>
              </Item>
            </Grid>
            <Grid item xs={8}>
              <Item>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  size='small'
                />
              </Item>
            </Grid>
          </Grid>
          <Grid container spacing={2} columns={16} margin={"auto"}>
            <Grid item xs={4}>
              <Item style={{height:"50px"}}>
                <Typography color={"black"} >Feedback</Typography>
              </Item>
            </Grid>
            <Grid item xs={8}>
              <Item>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  size='small'
                />
              </Item>
            </Grid>
          </Grid>
        </Div>
      </JumboDemoCard>
    );
};
export default ColumnsGrid;
