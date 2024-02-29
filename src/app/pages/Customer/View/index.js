import React, { useState } from "react";
import { Card, CardContent, Typography, Grid, Chip, TextField, Rating, Box, CircularProgress, Button, Modal } from "@mui/material";
import axios from "axios";
import Loader from "react-spinners/BarLoader";
import { BarLoader } from "react-spinners";
import { useLocation } from "react-router-dom";

export default function CustomerReview() {
  const { state } = useLocation();
  const [data, setData] = useState(state?.reviews);
  const [res, setRes] = useState(false);
  const [userAnswer, setUserAnswer] = useState(false);
  console.log(state.allData);
  return (
    <Card style={{ padding: "16px" }}>
      <Typography variant="h1" gutterBottom textAlign="center">
        Customer Responses
      </Typography>
      <SurveyList responseData={state?.allData?.questionAndAnswer} />
    </Card>
  );
}

const MultipleChoiceQuestion = ({ questionType, question, data }) => {
  return (
    <div>
      <Typography variant="body1" gutterBottom>
        <span style={{ opacity: "0.5" }}>Type : &nbsp;</span>
        {questionType}
      </Typography>
      {data?.answer?.map((option, index) => (
        <Grid container spacing={2} key={index} margin="5px" alignItems="center">
          <Grid item>
            <Typography variant="body1">
              <span style={{ opacity: "0.5" }}>Ans : &nbsp;</span> {option}
            </Typography>
          </Grid>
          <Grid item></Grid>
        </Grid>
      ))}
    </div>
  );
};

const StarsQuestion = ({ questionType, question, data }) => {
  const starOptions = ["5", "4", "3", "2", "1"];

  return (
    <div>
      <Typography variant="body1" gutterBottom>
        <span style={{ opacity: "0.5" }}>Type : &nbsp;</span>
        Stars
      </Typography>
      {data?.answer?.map((star, index) => (
        <Grid container spacing={2} key={index} margin="5px">
          <Grid item>
            <Typography variant="body1">
              <span style={{ opacity: "0.5" }}>Ans : </span>
            </Typography>
          </Grid>
          <Grid item>
            <Rating name={`rating-${star}`} value={parseFloat(data?.answer?.[0])} precision={0.5} readOnly />
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

const SingleLineQuestion = ({ questionType, question, data }) => {
  return (
    <div>
      <Typography variant="body1" gutterBottom>
        <span style={{ opacity: "0.5" }}>Type : &nbsp;</span>
        {questionType}
      </Typography>
      {data?.answer?.map((option, index) => (
        <Grid container spacing={2} key={index} margin="5px" alignItems="center">
          <Grid item>
            <Typography variant="body1">
              <span style={{ opacity: "0.5" }}>Ans&nbsp; : &nbsp;</span> {option}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

const SurveyCard = ({ surveyData, mallId, queId }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    maxHeight: "80vh",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    overflowY: "auto",
  };
  const { question, typeOf, options, optionCounts, totalAnswers, users } = surveyData;

  return (
    <>
      <Card style={{ margin: "16px", padding: "16px" }}>
        <CardContent>
          {typeOf === "multiLine" ? (
            <Grid container style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <Typography variant="h6" gutterBottom>
                <span style={{ opacity: "0.5" }}> Que : &nbsp;</span>
                {question}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <span style={{ opacity: "0.5" }}>Type : &nbsp;</span>
                Multi Line
              </Typography>
              <Grid container spacing={2} margin="5px" alignItems="center">
                <Grid item>
                  <Typography sx={{ display: "inline", opacity: "0.5" }}>
                    {/* <span style={{ opacity: "0.5" }}> Ans : &nbsp;</span> */}
                    Ans&nbsp;:&nbsp;&nbsp;
                  </Typography>
                  <div>
                    <Typography>{surveyData?.answer?.[0]}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Typography variant="body1" gutterBottom>
              <span style={{ opacity: "0.5" }}>Que &nbsp;: &nbsp;</span>
              {question}
            </Typography>
          )}
          {typeOf === "multipleChoice" && <MultipleChoiceQuestion questionType="Multiple Choice" question={question} data={surveyData} />}

          {typeOf === "stars" && <StarsQuestion questionType="Rating" question={question} data={surveyData} />}

          {typeOf === "singleChoice" && <SingleLineQuestion questionType="Single Choice" question={question} data={surveyData} />}
        </CardContent>
      </Card>
    </>
  );
};

const SurveyList = ({ responseData, mallId }) => {
  const surveyIds = Object.keys(responseData);
  // console.log(responseData);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {responseData.map((surveyId) => (
        <SurveyCard key={surveyId} surveyData={surveyId} queId={surveyId?.questionId} />
      ))}
    </div>
  );
};
