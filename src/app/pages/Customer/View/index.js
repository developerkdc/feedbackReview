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
import { useLocation } from "react-router-dom";

export default function CustomerReview({ mallId }) {
    const { state } = useLocation();
    const [data, setData] = useState(state?.reviews);
    const [res, setRes] = useState(false);
    const [userAnswer, setUserAnswer] = useState(false);

    React.useEffect(() => {
        const getData = async () => {
            setRes(false);
            // const mall = await axios.get(`${process.env.REACT_APP_URL}/RatingAndReviews?id=${mallId}`);
            const mall = await axios.get(`https://feedbackreviewbackend.onrender.com/RatingAndReviews?id=${mallId}`);
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

            <SurveyList responseData={data} mallId={mallId} />

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
        </Card>
    );
}

const MultipleChoiceQuestion = ({
    questionType,
    question,
    data
}) => {
    return (
        <div>
            <Typography variant="body1" gutterBottom>
                <span style={{ opacity: "0.5" }}>Type : </span>
                {questionType}
            </Typography>
            {data?.answer?.map((option, index) => (
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
                        {/* <Chip
                            label={`Count: ${optionCounts[option] || 0}`}
                            variant="filled"
                        /> */}
                    </Grid>
                </Grid>
            ))}
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

const StarsQuestion = ({ questionType, question, data }) => {
    const starOptions = ["5", "4", "3", "2", "1"];

    return (
        <div>
            <Typography variant="body1" gutterBottom>
                <span style={{ opacity: "0.5" }}>Type : </span>
                {questionType}
            </Typography>
            {data?.answer?.map((star, index) => (
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
                            value={parseFloat(data?.answer?.[0])}
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
                        {/* <Chip
                            label={`Count: ${optionCounts[star] || 0}`}
                            variant="filled"
                        /> */}
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
    data
}) => {
    return (
        <div>
            <Typography variant="body1" gutterBottom>
                <span style={{ opacity: "0.5" }}>Type : </span>
                {questionType}
            </Typography>
            {data?.answer?.map((option, index) => (
                <Grid
                    container
                    spacing={1}
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
                        {/* <Chip
                            label={`Count: ${optionCounts[option] || 0}`}
                            variant="filled"
                        /> */}
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
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "70%",
        maxHeight: '80vh',
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        overflowY: 'auto',
    };
    const { question, typeOf, options, optionCounts, totalAnswers, users } =
        surveyData;

    const [userAnswer, setUserAnswer] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    // console.log(userAnswer);

    var handleGetUserAnswer = async () => {
        try {
            // const data = await axios.get(
            //   `${process.env.REACT_APP_URL}/RatingAndReviews/getUserForQuestion?questionId=${queId}&mallId=${mallId}`
            // );
            const data = await axios.get(
                `https://feedbackreviewbackend.onrender.com/RatingAndReviews/getUserForQuestion?questionId=${queId}&mallId=${mallId}`
            );
            setUserAnswer(data.data);
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
                            <Typography sx={{my:1}}>
                            <span style={{ opacity: "0.5" }}> Ans. : </span>
                                {surveyData?.answer?.[0]}
                            </Typography>
                        </Grid>
                    ) : (
                        <Typography variant="h6" gutterBottom>
                            <span style={{ opacity: "1" }}> Que : </span>
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
                            data={surveyData}
                        />
                    )}

                    {typeOf === "stars" && (
                        <StarsQuestion
                            questionType="Rating"
                            question={question}
                            data={surveyData}
                        />
                    )}

                    {typeOf === "singleChoice" && (
                        <SingleLineQuestion
                            questionType="Single Choice"
                            question={question}
                            data={surveyData}
                        />
                    )}
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
                <SurveyCard
                    key={surveyId}
                    surveyData={surveyId}
                    // mallId={mallId}
                    queId={surveyId?.questionId}
                />
            ))}
        </div>
    );
};
