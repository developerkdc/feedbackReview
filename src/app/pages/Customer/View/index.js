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
  ListItem,
  ListItemText,
  List,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import axios from "axios";
import Loader from "react-spinners/BarLoader";
import { BarLoader } from "react-spinners";
import { useLocation } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Div from "@jumbo/shared/Div";

export default function CustomerReview() {
  const { state } = useLocation();
  const [data, setData] = useState(state?.reviews);
  const [res, setRes] = useState(false);
  const [userAnswer, setUserAnswer] = useState(false);
  const [open, setOpen] = useState(false);
  const user = state.allData.user;
  return (
    <>
      <Card style={{ padding: "16px", marginBottom: "10px" }}>
        <Typography
          variant="h1"
          gutterBottom
          textAlign="center"
          sx={{ backgroundColor: "#7352C7", p: 2, borderRadius: "5px", color: "white" }}
        >
          Customer Details
        </Typography>
        {/* <SurveyList responseData={state?.allData?.questionAndAnswer} /> */}
        {/* <CardContent>
        <Typography variant="h5" component="p" sx={{textTransform:"capitalize"}}>
          <strong>Name:</strong> {user?.name}
        </Typography>
        <Typography variant="h5" component="p" sx={{textTransform:"capitalize"}}>
          <strong>Gender:</strong> {user?.gender}
        </Typography>
        <Typography variant="h5" component="p">
          <strong>Date of Birth:</strong> {new Date(user?.dob).toLocaleDateString()}
        </Typography>
        <Typography variant="h5" component="p" sx={{textTransform:"capitalize"}}>
          <strong>Profession:</strong> {user?.profession}
        </Typography>
        <Typography variant="h5" component="p" sx={{textTransform:"capitalize"}}>
          <strong>City:</strong> {user?.city}
        </Typography>
        <Typography variant="h5" component="p">
          <strong>Contact:</strong> {user?.contact}
        </Typography>
        <Typography variant="h5" component="p">
          <strong>Email:</strong> {user?.email}
        </Typography>
        <Typography variant="h5" component="p" sx={{textTransform:"capitalize"}}>
          <strong>Feedback:</strong> {user?.feedback}
        </Typography>
      </CardContent> */}
        <List
          disablePadding
          sx={{
            display: "flex",
            flexWrap: "wrap",
            margin: (theme) => theme.spacing(0, -2),
          }}
        >
          {Object.entries(user).map((entry) => {
            const [key, value] = entry;
            if (key === "feedback" || key == "bill") return null; // Skip rendering feedback
            return (
              <ListItem
                key={key} // Key should be unique, using the property name as the key
                sx={{
                  width: { xs: "100%", sm: "50%", xl: "33.33%" },
                  textAlign: "center",
                }}
              >
                <ListItemText
                  primary={
                    <Typography fontSize="12px" variant="h6" color="text.secondary" mb={0.5} sx={{ textTransform: "capitalize" }}>
                      {key}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body1" color="text.primary" sx={{ textTransform: "capitalize" }}>
                      {key === "dob" ? new Date(value).toLocaleDateString() : value || "--"} {/* Format dob value as date */}
                    </Typography>
                  }
                />
              </ListItem>
            );
          })}
          <ListItem
            sx={{
              width: { xs: "100%", sm: "50%", xl: "33.33%" },
              textAlign: "center",
              display: "flex",
            }}
          >
            <ListItemText
              primary={
                <Typography fontSize="12px" variant="h6" color="text.secondary" mb={0.5} sx={{ textTransform: "capitalize" }}>
                  Bill Image
                </Typography>
              }
              secondary={
                <Div>
                  {/* <img src={`http://localhost:8000/public/1709099364340-bill%20sample.png`} onClick={() => setOpen(true)} style={{ cursor: "pointer", height: "100px", width: "100px",border:"1px solid",padding:2,borderRadius:"5px" }} /> */}
                  <img
                    src={`http://localhost:8000/public/${user.bill}`}
                    alt="imgBill"
                    onClick={() => setOpen(true)}
                    style={{ cursor: "pointer", height: "100px", width: "100px", border: "1px solid", padding: 2, borderRadius: "5px" }}
                  />
                  {/* <ImagePopup imageUrl={`http://localhost:8000/public/1709099364340-bill%20sample.png`} open={open} setOpen={setOpen} /> */}
                  <ImagePopup imageUrl={`http://localhost:8000/public/${user.bill}`} open={open} setOpen={setOpen} />
                </Div>
              }
            />
          </ListItem>
        </List>
        {/* {console.log(`${process.env.REACT_APP_URL}${process.env.REACT_APP_IMAGES_PATH}/${user.bill}`)} */}
        <Divider variant="fullWidth" />
        <ListItem
          sx={{
            width: { xs: "100%", sm: "100%", xl: "100%" },
            textAlign: "start",
            display: "flex",
          }}
        >
          <ListItemText
            primary={
              <Typography fontSize="12px" variant="h6" color="text.secondary" mb={0.5} sx={{ textTransform: "capitalize" }}>
                FeedBack
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="text.primary" sx={{ textTransform: "capitalize" }}>
                {user?.feedback || "--"} {/* Format dob value as date */}
              </Typography>
            }
          />
        </ListItem>
      </Card>
      <Card style={{ padding: "16px" }}>
        <Typography variant="h1" gutterBottom textAlign="center">
          Responses
        </Typography>
        <SurveyList responseData={state?.allData?.questionAndAnswer} />
      </Card>
    </>
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

const ImagePopup = ({ imageUrl, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle>Image</DialogTitle> */}
        <DialogContent>
          <img src={imageUrl} alt="Preview" style={{ width: "100%", height: "80vh" }} />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};
