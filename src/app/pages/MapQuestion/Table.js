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
import ToastAlerts from "../components/Toast";

export default function BasicTable({ data, mall }) {
  // console.log(data)
  const [mallIds, setMallIds] = React.useState([]);
  const showAlert = ToastAlerts();
  const handleSubmit = async function (queId) {
    try {
      const mapped = await axios.post(
        `${process.env.REACT_APP_URL}/mappingQuestion`,
        {
          // const mapped = await axios.post(
          //   `https://feedbackreviewbackend.onrender.com/mappingQuestion`,
          //   {
          mallId: mallIds,
          questionId: queId,
        }
      );
      // console.log(mapped)
      showAlert("success", "Mapped successfully.");
      // Swal.fire({ title: "<strong>Success</strong>", icon: "success" });
    } catch (error) {
      // Swal.fire({ title: "<strong>Not Mapped</strong>", icon: "error" });
      showAlert("error", "Failed to map the question.");
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Questions</TableCell>
            <TableCell align="left">Types</TableCell>
            <TableCell align="left">Option 1</TableCell>
            <TableCell align="left">Option 2</TableCell>
            <TableCell align="left">Option 3</TableCell>
            <TableCell align="left">Option 4</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center"></TableCell>
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
              {row.typeOf === "singleChoice" && (
                <TableCell align="left">Single Choice</TableCell>
              )}
              {row.typeOf === "multipleChoice" && (
                <TableCell align="left">Multiple Choice</TableCell>
              )}
              {row.typeOf === "multiLine" && (
                <TableCell align="left">Multi Line</TableCell>
              )}
              {row.typeOf === "stars" && (
                <TableCell align="left">Stars</TableCell>
              )}
              <TableCell align="left">{row.options[0]}</TableCell>
              <TableCell align="left">{row.options[1]}</TableCell>
              <TableCell align="left">{row.options[2]}</TableCell>
              <TableCell align="left">{row.options[3]}</TableCell>
              <TableCell align="left">
                <MultipleSelectCheckmarks
                  mall={mall}
                  questionId={row._id}
                  setMallIds={setMallIds}
                />
              </TableCell>
              <TableCell align="left">
                <Button
                  variant="contained"
                  onClick={() => handleSubmit(row._id)}
                >
                  Ok
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
