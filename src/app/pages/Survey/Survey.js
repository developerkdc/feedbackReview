import * as React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
import clsx from "clsx";
import ReactStars from "react-rating-stars-component";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import axios from "axios";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Div from "@jumbo/shared/Div";
import RadioButtons from "../components/mui/RadioButtons/RadioButtons";
import InputMultiline from "./TextArea";
import UserDetail from "./UserDetail";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Div sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Div>
      )}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

export default function Survey() {
  const [mall, setMall] = React.useState([]);
  const [mallName, setMallname] = React.useState("");
  const [selectedmallName, setselectedMallname] = React.useState("");
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [question, setQuestion] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [userId, setUserId] = React.useState([]);
  const [QuestionAndAnswer, setQuestionAndAnswer] = React.useState([]);
  console.log(value, "value");
  console.log(mallName, "mallName");
  console.log(question, "question");
  const handleChange2 = function (event,key) {
    setMallname(event.target.value);
    setselectedMallname(key.props.children);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const ratingChanged = (rating, question) => {
    setQuestionAndAnswer((prevAnswers) => {
      // Check if an entry for this question already exists
      const existingEntryIndex = prevAnswers.findIndex(
        (answer) => answer.questionId === question._id
      );

      if (existingEntryIndex !== -1) {
        // If an entry exists, update it
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingEntryIndex] = {
          questionId: question._id,
          question: question.question,
          typeOf: question.typeOf,
          answer: rating,
        };
        return updatedAnswers;
      } else {
        // If no entry exists, add a new one
        return [
          ...prevAnswers,
          {
            questionId: question._id,
            question: question.question,
            typeOf: question.typeOf,
            answer: rating,
          },
        ];
      }
    });
  };

  const handleRadio = (e, question) => {
    const answer = e.target.value;

    // Find the existing entry for this question, if it exists
    const existingEntryIndex = QuestionAndAnswer.findIndex(
      (entry) => entry.questionId === question._id
    );

    // Create a new entry with the updated answer
    const updatedEntry = {
      questionId: question._id,
      question: question.question,
      typeOf: question.typeOf,
      answer: answer,
    };

    // If an entry already exists, replace it; otherwise, add the new entry
    if (existingEntryIndex !== -1) {
      const updatedQuestionAndAnswer = [...QuestionAndAnswer];
      updatedQuestionAndAnswer[existingEntryIndex] = updatedEntry;
      setQuestionAndAnswer(updatedQuestionAndAnswer);
    } else {
      setQuestionAndAnswer([...QuestionAndAnswer, updatedEntry]);
    }
  };

  const handleMultiChoice = (e, question) => {
    const selectedValue = e.target.value;

    // Create a new entry for this question or find the existing one
    const existingEntryIndex = QuestionAndAnswer.findIndex(
      (entry) => entry.questionId === question._id
    );

    const selectedValues = QuestionAndAnswer[existingEntryIndex]?.answer || [];

    if (selectedValues.includes(selectedValue)) {
      // If the value was previously selected, remove it
      const updatedSelectedValues = selectedValues.filter(
        (value) => value !== selectedValue
      );

      // Update the existing entry with the updated selected values
      const updatedEntry = {
        ...QuestionAndAnswer[existingEntryIndex],
        answer: updatedSelectedValues,
      };

      // Create a copy of the QuestionAndAnswer array and update the existing entry
      const updatedQuestionAndAnswer = [...QuestionAndAnswer];
      updatedQuestionAndAnswer[existingEntryIndex] = updatedEntry;

      setQuestionAndAnswer(updatedQuestionAndAnswer);
    } else {
      // If the value is not in the selected values, add it
      const updatedSelectedValues = [...selectedValues, selectedValue];

      // Create a new entry with the updated selected values
      const updatedEntry = {
        questionId: question._id,
        question: question.question,
        typeOf: question.typeOf,
        answer: updatedSelectedValues,
      };

      // If an entry already exists, replace it; otherwise, add the new entry
      if (existingEntryIndex !== -1) {
        const updatedQuestionAndAnswer = [...QuestionAndAnswer];
        updatedQuestionAndAnswer[existingEntryIndex] = updatedEntry;
        setQuestionAndAnswer(updatedQuestionAndAnswer);
      } else {
        setQuestionAndAnswer([...QuestionAndAnswer, updatedEntry]);
      }
    }
  };

  const handleMultiLine = (e, question) => {
    const answer = e.target.value;

    // Find the existing entry for this question, if it exists
    const existingEntryIndex = QuestionAndAnswer.findIndex(
      (entry) => entry.questionId === question._id
    );

    // Create a new entry with the updated answer
    const updatedEntry = {
      questionId: question._id,
      question: question.question,
      typeOf: question.typeOf,
      answer: answer,
    };

    // If an entry already exists, replace it; otherwise, add the new entry
    if (existingEntryIndex !== -1) {
      const updatedQuestionAndAnswer = [...QuestionAndAnswer];
      updatedQuestionAndAnswer[existingEntryIndex] = updatedEntry;
      setQuestionAndAnswer(updatedQuestionAndAnswer);
    } else {
      setQuestionAndAnswer([...QuestionAndAnswer, updatedEntry]);
    }
  };

  const renderType = function (question) {
    if (question.typeOf === "stars") {
      return (
        <ReactStars
          count={5}
          isHalf={true}
          onChange={(rating) => ratingChanged(rating, question)}
          size={30}
          activeColor="#ffd700"
        />
      );
    } else if (
      question.typeOf === "singleChoice" ||
      question.typeOf === "multipleChoice"
    ) {
      if (question.typeOf === "singleChoice") {
        return (
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="radio-buttons-group"
            >
              {question.options.map((e) => {
                return (
                  <FormControlLabel
                    value={e}
                    control={
                      <Radio
                        value={e}
                        onChange={(e) => handleRadio(e, question)}
                      />
                    }
                    label={e}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        );
      } else {
        return (
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              {question.options.map((e) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) => handleMultiChoice(e, question)}
                        value={e}
                        name={e}
                      />
                    }
                    label={e}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        );
      }
    } else if (question.typeOf === "multiLine") {
      return <InputMultiline onChange={handleMultiLine} question={question} />;
    }
  };

  const handleNext = ()=>{
    (async () => {
      const questions = await axios.post(
        `http://localhost:8000/RatingAndReviews`,
        {
          mall: { mallId: mallName, name: selectedmallName },
          questionAndAnswer: QuestionAndAnswer,
        }
      );
      setUserId(questions?.data?.RatingAndReviews?._id);
    })();
    setValue((prevValue) => prevValue + 1);
  }

  React.useEffect(() => {
    if (mallName) {
      (async () => {
        const questions = await axios.get(
          `http://localhost:8000/mappingQuestion/${mallName}?type=all`
        );
        setQuestion(questions.data.getMappingQuestions);
      })();
    }
  }, [mallName, value]);

  React.useEffect(async () => {
    const mall = await axios.get("http://localhost:8000/mall");
    setMall(mall.data.mall);
  }, []);

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
            onChange={(event, key) => handleChange2(event, key)}
          >
            {mall.map((e) => (
              <MenuItem value={e._id} key={e.name}>
                {e.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <JumboDemoCard
        title={"Mall Feedback"}
        sx={{ width: "90%" }}
        wrapperSx={{
          backgroundColor: "background.paper",
          pt: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Div sx={{ width: "80%", bgcolor: "background.paper" }}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              // variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Feedback" {...a11yProps(0)} />
              <Tab label="user detail" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              {question.map((e, i) => {
                return (
                  <>
                    <div>
                      <Box sx={{ padding: 3 }}>
                        <Typography fontSize={20}>
                          Q{i + 1}. {e?.questionId?.question} ?.
                        </Typography>
                        <Typography fontSize={20} sx={{ marginLeft: 3 }}>
                          {renderType(e.questionId)}
                        </Typography>
                      </Box>
                      <hr />
                    </div>
                  </>
                );
              })}

              <Button
                variant="contained"
                sx={{ margin: 0, mt: 2 }}
                onClick={handleNext}
              >
                Next
              </Button>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <UserDetail id={userId} />
            </TabPanel>
          </SwipeableViews>
        </Div>
      </JumboDemoCard>
    </>
  );
}
