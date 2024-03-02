import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Card,
  FormControl,
  InputLabel,
  List,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import QandA from "./test";

export default function Review() {
  const [Review, setReview] = React.useState([]);
  const [mallList, setMallList] = React.useState([]);
  const [mallName, setMallname] = React.useState("");

  const handleChange = function (event) {
    setMallname(event.target.value);
  };

  const reviewCall = async function () {
    try {
      if (mallName) {
        const review = await axios.get(
          `https://feedbackreviewbackend.onrender.com/RatingAndReviews?type=all&mallId=${mallName}`
          // `https://feedbackreviewbackend.onrender.com/RatingAndReviews?type=all&mallId=${mallName}`
        );
        setReview(review.data);
      }
    } catch (error) {
      Swal.fire({ title: "<strong>!</strong>", icon: "error" });
    }
  };

  React.useEffect(() => {
    const getMall = async () => {
      const mallList = await axios.get(
        `https://feedbackreviewbackend.onrender.com/mall`
      );
      // const mallList = await axios.get(`https://feedbackreviewbackend.onrender.com/mall`);
      setMallList(mallList.data.data);
      setMallname(mallList.data.data[0]._id);
    };
    getMall();
  }, []);

  React.useEffect(() => {
    // reviewCall()
  }, [mallName]);
  // console.log(mallName);
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
            {mallList?.map((e) => (
              <MenuItem value={e._id} key={e._id}>
                {e.mall_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <QandA mallId={mallName} />
      </Box>
    </>
  );
}
