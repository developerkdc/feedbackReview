import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MultipleSelectCheckmarks from "../components/mui/Selects/MultipleSelectCheckmarks";
import { Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";


export default function BasicTable({data,mall}) {
  // console.log(data)
  const [mallIds,setMallIds] = React.useState([])
  const handleSubmit =async function(queId){
    try {
      // const mapped = await axios.post(`${process.env.REACT_APP_URL}/mappingQuestion`, {
      const mapped = await axios.post(`https://feedbackreviewbackend.onrender.com/mappingQuestion`, {
        mallId: mallIds,
        questionId: queId,
      });
      // console.log(mapped)
      Swal.fire({ title: "<strong>success</strong>", icon: "success" });
    } catch (error) { 
      Swal.fire({ title: "<strong>not mapped</strong>", icon: "error" });
    }
    
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Questions</TableCell>
            <TableCell align="right">Types</TableCell>
            <TableCell align="right">Option 1</TableCell>
            <TableCell align="right">Option 2</TableCell>
            <TableCell align="right">Option 3</TableCell>
            <TableCell align="right">Option 4</TableCell>
            <TableCell align="right">Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.question}
              </TableCell>
              <TableCell align="right">{row.typeOf}</TableCell>
              <TableCell align="right">{row.options[0]}</TableCell>
              <TableCell align="right">{row.options[1]}</TableCell>
              <TableCell align="right">{row.options[2]}</TableCell>
              <TableCell align="right">{row.options[3]}</TableCell>
              <TableCell align="right"><MultipleSelectCheckmarks mall={mall} questionId={row._id} setMallIds={setMallIds}/></TableCell>
              <TableCell align="right"><Button variant="contained" onClick={()=>handleSubmit(row._id)}>Ok</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
