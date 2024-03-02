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
  const [removedMallIds, setRemoveMallIds] = React.useState([]);
  const [mappedQuestions, setMappedQuestion] = React.useState([]);
  const showAlert = ToastAlerts();
  const handleSubmit = async function (queId) {
    const newMallIds = mallIds.filter(
      (mallId) => !removedMallIds.includes(mallId)
    );
    const filteredMallIds = newMallIds.filter((mallId) => {
      const isMapped = mappedQuestions.some(
        (mapping) => mapping.mallId === mallId && mapping.questionId === queId
      );
      return !isMapped;
    });
    if (removedMallIds.length > 0) {
      removedMallIds.forEach(async (mallId) => {
        try {
          await axios.delete(
            `https://feedbackreviewbackend.onrender.com/mappingQuestion/${mallId}/${queId}`
          );
          showAlert("success", "Removed successfully.");
        } catch (error) {
          showAlert("error", "Failed to Unmap the question.");
        }
      });
    }

    if (newMallIds.length > 0) {
      try {
        const mapped = await axios.post(
          `https://feedbackreviewbackend.onrender.com/mappingQuestion`,
          {
            mallId: filteredMallIds,
            questionId: queId,
          }
        );
        showAlert("success", "Mapped successfully.");
      } catch (error) {
        if (error.status == 409) {
          showAlert("error", error.message);
        }
        showAlert("error", "Failed to map the question.");
      }
    }
  };

  React.useEffect(() => {
    const fetchMappedMalls = async () => {
      try {
        const response = await axios.get(
          `https://feedbackreviewbackend.onrender.com/mappingQuestion/mall/list`
        );
        // console.log(response.data);
        setMappedQuestion(response?.data?.mappedquestion);
      } catch (error) {
        console.error("Error fetching mapped malls:", error);
      }
    };

    fetchMappedMalls();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Questions</TableCell>
            <TableCell align="left">Types</TableCell>
            <TableCell align="left" padding="0px">
              Option 1
            </TableCell>
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
              <TableCell align="left" padding="0px">
                {row.options[0]}
              </TableCell>
              <TableCell align="left" padding="0px">
                {row.options[1]}
              </TableCell>
              <TableCell align="left" padding="0px">
                {row.options[2]}
              </TableCell>
              <TableCell align="left" padding="0px">
                {row.options[3]}
              </TableCell>
              <TableCell align="left" padding="0px">
                <MultipleSelectCheckmarks
                  mappedQuestions={mappedQuestions}
                  mall={mall}
                  questionId={row._id}
                  setMallIds={setMallIds}
                  setRemoveMallIds={setRemoveMallIds}
                  mallIds={mallIds}
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
