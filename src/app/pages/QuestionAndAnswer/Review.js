import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

export default function Review() {
  const [Review, setReview] = React.useState([]);
  const [mall, setMall] = React.useState([]);
//   const [type, setType] = React.useState("");
  const [mallName, setMallname] = React.useState("");

  const handleChange = function (event) {
    setMallname(event.target.value);
  };

//   const handleChange2 = function (event) {
//     console.log(event.target.value)
//     setType(event.target.value);
//   };

  const reviewCall = async function () {
    try {
      if(mallName){
        const review = await axios.get(
          `http://localhost:8000/RatingAndReviews?type=all&mallId=${mallName}`
        );
        setReview(review.data);
      }
    } catch (error) {
      Swal.fire({ title: "<strong>!</strong>", icon: "error" });
    }
  };

  React.useEffect(async () => {
    const mall = await axios.get("http://localhost:8000/mall");
    setMall(mall.data.mall);
  }, []);

  React.useEffect(() => {
    reviewCall();
  }, [mallName]);

  return (
    <>
      <Box sx={{ marginBottom: "30px" }}>
        <FormControl sx={{ minWidth: 320 }} size="small">
          <InputLabel id="Types">malls</InputLabel>
          <Select
            labelId="types-label"
            id="Types"
            value={mallName || ""}
            label="Types"
            onChange={(event) => handleChange(event)}
          >
            {mall.map((e) => (
              <MenuItem value={e._id}>{e.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* <FormControl sx={{ minWidth: 320, marginLeft: 3 }} size="small">
          <InputLabel id="Types">Type</InputLabel>
          <Select
            labelId="types-label"
            id="Types"
            value={type || ""}
            label="Types"
            onChange={(event) => handleChange2(event)}
          >
            {[
              { name: "Feedback", type: "stars" },
              { name: "Servey", type: "notStars" },
            ].map((e) => (
              <MenuItem value={e.type}>{e.name}</MenuItem>
            ))}
          </Select>
        </FormControl> */}
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mall Name</TableCell>
              <TableCell align="left">Question</TableCell>
              <TableCell align="left">Answer</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">User Name</TableCell>
              <TableCell align="left">User Email</TableCell>
              <TableCell align="left">User Contact</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Review?.RatingAndReviews?.map((review) => (
              <TableRow
                key={review?.RatingAndReviews?._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {review?.mall?.name}
                </TableCell>
                <TableCell align="left">
                  {review?.questionAndAnswer?.question}
                </TableCell>
                <TableCell align="left">
                  {review?.questionAndAnswer?.answer}
                </TableCell>
                <TableCell align="left">
                  {review?.questionAndAnswer?.typeOf}
                </TableCell>
                {/* <TableCell align="right">{review.options[3]}</TableCell> */}
                <TableCell align="left">{review?.user?.name || "-"}</TableCell>
                <TableCell align="left">{review?.user?.email || "-"}</TableCell>
                <TableCell align="left">
                  {review?.user?.contact || "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
