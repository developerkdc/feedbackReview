import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  TextField,
  Rating,
  Box,
  CircularProgress,
  Button,
  Modal,
} from "@mui/material";
import axios from "axios";
import Loader from "react-spinners/BarLoader";
import { BarLoader } from "react-spinners";

export default function QandA({ mallId }) {
  const [data, setData] = useState(null);
  const [res, setRes] = useState(false);

  const [userAnswer, setUserAnswer] = useState(false);

  React.useEffect(() => {
    const getData = async () => {
      setRes(false);
      const mall = await axios.get(
        `https://feedbackreviewbackend.onrender.com/RatingAndReviews?id=${mallId}`
      );
      // const mall = await axios.get(`https://feedbackreviewbackend.onrender.com/RatingAndReviews?id=${mallId}`);
      setData(mall?.data);
      setRes(true);
    };
    if (mallId) {
      getData();
    }
  }, [mallId]);

  return (
    <Card style={{ padding: "16px", marginTop: "50px" }}>
      <Typography variant="h1" gutterBottom textAlign="center">
        Survey Responses
      </Typography>
      {/* <Typography variant="h5" gutterBottom textAlign="center">
        Total Responses:- {data && data[Object.keys(data)[0]].totalAnswers}
      </Typography> */}

      {mallId && res && data && (
        <SurveyList responseData={data} mallId={mallId} />
      )}
      {mallId && res && Object.keys(data).length === 0 && (
        <div
          style={{
            textAlign: "center",
            marginTop: "120px",
            marginBottom: "100px",
            fontSize: "25px",
            opacity: ".4",
          }}
        >
          Data not found !!
        </div>
      )}

      {mallId && !res && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "80px",
            marginBottom: "50px",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {!mallId && (
        <div
          style={{
            textAlign: "center",
            marginTop: "120px",
            marginBottom: "100px",
            fontSize: "25px",
            opacity: ".4",
          }}
        >
          Please select the mall !!
        </div>
      )}
    </Card>
  );
}

const MultipleChoiceQuestion = ({
  questionType,
  question,
  options,
  optionCounts,
  mallId, queId, handleGetUserAnswerCount, setOpenModal
}) => {
  return (
    <div>
      <Typography variant="body1" gutterBottom>
        <span style={{ opacity: "0.5" }}>Type : </span>
        {questionType}
      </Typography>
      {options.map((option, index) => (
        <Grid
          container
          spacing={2}
          key={index}
          margin="5px"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="body1">
              <span style={{ opacity: "0.5" }}>Opt. {index + 1} :- &nbsp;</span>{" "}
              {option}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              sx={{ bgcolor: "transparent", "&:hover": { bgcolor: "transparent" } }}
              textAlign="center"
              onClick={() => {
                handleGetUserAnswerCount(queId, mallId,option);
                setOpenModal(true);
              }}
            >
              <Chip
                label={`Count: ${optionCounts[option] || 0}`}
                variant="filled"
              />
            </Button>

          </Grid>
        </Grid>
      ))}
      {/* {optionCounts.map((val)=>{
        options.filter((option, index) =>{
          return 
        })
      })

      } */}
      {/* <Grid container spacing={2} margin="5px" alignItems="center">
        <Grid item>
          <Typography variant="body1">Not Answered</Typography>
        </Grid>
        <Grid item>
          <Chip
            label={`Count: ${optionCounts["null"] || 0}`}
            variant="filled"
          />
        </Grid>
      </Grid> */}
    </div>
  );
};

const StarsQuestion = ({ questionType, question, optionCounts, mallId, queId, handleGetUserAnswerCount, setOpenModal }) => {
  const starOptions = ["5", "4", "3", "2", "1"];

  return (
    <div>
      <Typography variant="body1" gutterBottom>
        <span style={{ opacity: "0.5" }}>Type : </span>
        {questionType}
      </Typography>
      {starOptions.map((star, index) => (
        <Grid
          container
          spacing={2}
          key={index}
          margin="5px"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="body1">
              <span style={{ opacity: "0.5" }}>{star} Star:</span>
            </Typography>
          </Grid>
          <Grid item>
            <Rating
              name={`rating-${star}`}
              value={parseFloat(star)}
              precision={0.5}
              readOnly
            />
          </Grid>
          <Grid item>
            {/* {star == "0" ? (
              <Chip
                label={`Count: ${optionCounts["0.0"] || 0}`}
                variant="filled"
              />
            ) : ( */}
            <Button
              sx={{ bgcolor: "transparent", "&:hover": { bgcolor: "transparent" } }}
              textAlign="center"
              onClick={() => {
                handleGetUserAnswerCount(queId, mallId,star);
                setOpenModal(true);
              }}
            >
              <Chip
                label={`Count: ${optionCounts[star] || 0}`}
                variant="filled"
              />
            </Button>
            {/* )} */}
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

const SingleLineQuestion = ({
  questionType,
  question,
  options,
  optionCounts,
  mallId, queId, handleGetUserAnswerCount, setOpenModal
}) => {
  return (
    <div>
      <Typography variant="body1" gutterBottom>
        <span style={{ opacity: "0.5" }}>Type : </span>
        {questionType}
      </Typography>
      {options.map((option, index) => (
        <Grid
          container
          spacing={2}
          key={index}
          margin="5px"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="body1">
              <span style={{ opacity: "0.5" }}>Opt. {index + 1} :- &nbsp;</span>{" "}
              {option}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              sx={{ bgcolor: "transparent", "&:hover": { bgcolor: "transparent" } }}
              textAlign="center"
              onClick={() => {
                handleGetUserAnswerCount(queId, mallId,option);
                setOpenModal(true);
              }}
            >
              <Chip
                label={`Count: ${optionCounts[option] || 0}`}
                variant="filled"
              />
            </Button>
          </Grid>
        </Grid>
      ))}
      {/* <Grid container spacing={2} margin="5px" alignItems="center">
        <Grid item>
          <Typography variant="body1">Not Answered</Typography>
        </Grid> */}
      {/* <Grid item>
          <Chip
            label={`Count: ${optionCounts["null"] || 0}`}
            variant="filled"
          />
        </Grid> */}
      {/* </Grid> */}
    </div>
  );
};

const SurveyCard = ({ surveyData, mallId, queId }) => {
  // console.log(surveyData);
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
  const { question, typeOf, options, optionCounts, totalAnswers, users } =
    surveyData;

  const [userAnswer, setUserAnswer] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  // console.log(userAnswer);

  var handleGetUserAnswer = async () => {
    try {
      // const data = await axios.get(
      //   `https://feedbackreviewbackend.onrender.com/RatingAndReviews/getUserForQuestion?questionId=${queId}&mallId=${mallId}`
      // );
      const data = await axios.get(
        `https://feedbackreviewbackend.onrender.com/RatingAndReviews/getUserForQuestion?questionId=${queId}&mallId=${mallId}`
      );
      console.log(data, "alalalalalala")
      setUserAnswer(data.data);
    } catch (error) {
      console.log(error);
    }
  };


  var handleGetUserAnswerCount = async (queId, mallId,answer) => {
    try {
      // const data = await axios.get(
      //   `https://feedbackreviewbackend.onrender.com/RatingAndReviews/getUserForQuestion?questionId=${queId}&mallId=${mallId}`
      // );
      console.log(answer)
      const data = await axios.get(
        `https://feedbackreviewbackend.onrender.com/RatingAndReviews/getUserForQuestion?questionId=${queId}&mallId=${mallId}`
      );
      setUserAnswer(data?.data?.filter((e)=> e?.questionAndAnswer?.answer?.includes(answer)));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card style={{ margin: "16px", padding: "16px" }}>
        <CardContent>
          {typeOf === "multiLine" ? (
            <Grid
              container
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h6" gutterBottom>
                <span style={{ opacity: "0.5" }}> Que. : </span>
                {question}
                {/* <Chip
                  label={`Total User Answered: ${totalAnswers}`}
                  style={{ marginLeft: "20px" }}
                /> */}
              </Typography>
              <Button
                variant="contained"
                textAlign="center"
                onClick={() => {
                  handleGetUserAnswer();
                  setOpenModal(true);
                }}
              >
                View All Responses
              </Button>
            </Grid>
          ) : (
            <Typography variant="h6" gutterBottom>
              <span style={{ opacity: "0.5" }}> Que. : </span>
              {question}
              {/* <Chip
                label={`Total User Answered: ${totalAnswers}`}
                style={{ marginLeft: "20px" }}
              /> */}
            </Typography>
          )}
          {typeOf === "multipleChoice" && (
            <MultipleChoiceQuestion
              questionType="Multiple Choice"
              question={question}
              options={options}
              optionCounts={optionCounts}
              mallId={mallId}
              queId={queId}
              handleGetUserAnswerCount={handleGetUserAnswerCount}
              setOpenModal={setOpenModal}
            />
          )}

          {typeOf === "stars" && (
            <StarsQuestion
              questionType="Rating"
              question={question}
              optionCounts={optionCounts}
              mallId={mallId}
              queId={queId}
              handleGetUserAnswerCount={handleGetUserAnswerCount}
              setOpenModal={setOpenModal}
            />
          )}

          {typeOf === "singleChoice" && (
            <SingleLineQuestion
              questionType="Single Choice"
              question={question}
              options={options}
              optionCounts={optionCounts}
              mallId={mallId}
              queId={queId}
              handleGetUserAnswerCount={handleGetUserAnswerCount}
              setOpenModal={setOpenModal}
            />
          )}
        </CardContent>
      </Card>
      <Modal keepMounted open={openModal} onClose={() => {
        setOpenModal(false)
        setUserAnswer([])
      }}>

        <Card sx={style}>
          <Typography variant="h4" gutterBottom mb="10px">
            <span style={{ opacity: "0.5" }}> Que. : </span>
            {question}
            <Chip
              label={`Total User Answered: ${userAnswer?.length}`}
              style={{ marginLeft: "20px" }}
            />
          </Typography>
          {userAnswer &&
            userAnswer.length &&
            userAnswer?.map((response, index) => (
              <Card key={index} style={{ marginBottom: "10px" }}>
                <CardContent>
                  <Grid
                    container
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box width="20%">
                      <Typography variant="h5" component="div">
                        User Details
                      </Typography>
                      <Typography variant="body2">
                        <span style={{ opacity: "0.5" }}>Name:</span>{" "}
                        {response?.user?.name || "--"}
                      </Typography>
                      <Typography variant="body2">
                        <span style={{ opacity: "0.5" }}>Email:</span>{" "}
                        {response?.user?.email || "--"}
                      </Typography>
                      <Typography variant="body2">
                        <span style={{ opacity: "0.5" }}>Contact:</span>{" "}
                        {response?.user?.contact || "--"}
                      </Typography>
                      <Typography variant="body2">
                        <span style={{ opacity: "0.5" }}>City:</span>{" "}
                        {response?.user?.city || "--"}
                      </Typography>
                      <Typography variant="body2">
                        <span style={{ opacity: "0.5" }}>Feedback:</span>{" "}
                        {response?.user?.feedback || "--"}
                      </Typography>
                    </Box>

                    <Box width="20%" sx={{ mt: 3 }}>
                      <Typography variant="body2">
                        <span style={{ opacity: "0.5" }}>DOB:</span>{" "}
                        {
                          (function () {
                            const date = new Date(response?.user?.dob);
                            const options = {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              // hour: "numeric",
                              // minute: "numeric",
                              // hour12: true,
                              timeZone: "Asia/Kolkata", // Indian time zone
                            };

                            const indianDateTime = date.toLocaleString("en-IN", options);
                            return indianDateTime;
                          })() || "--"}
                      </Typography>
                      <Typography variant="body2">
                        <span style={{ opacity: "0.5" }}>Profession:</span>{" "}
                        {response?.user?.profession || "--"}
                      </Typography>
                      <Typography variant="body2">
                        <span style={{ opacity: "0.5" }}>Gender:</span>{" "}
                        {response?.user?.gender || "--"}
                      </Typography>

                    </Box>

                    <Box width="50%">
                      <Typography variant="h5" component="div">
                        Answer
                      </Typography>
                      <Typography variant="body2">
                        {response?.questionAndAnswer?.answer?.join(", ")}
                      </Typography>
                    </Box>
                  </Grid>
                </CardContent>
              </Card>
            ))}
        </Card>
      </Modal>
    </>
  );
};

const SurveyList = ({ responseData, mallId }) => {
  const surveyIds = Object.keys(responseData);
  // console.log(responseData);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {surveyIds.map((surveyId) => (
        <SurveyCard
          key={surveyId}
          surveyData={responseData[surveyId]}
          mallId={mallId}
          queId={surveyId}
        />
      ))}
    </div>
  );
};
