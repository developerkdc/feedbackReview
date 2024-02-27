import * as React from "react";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
import clsx from "clsx";
import BasicSelect from "../components/mui/Selects/BasicSelect";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
export default function Home() {
  const [QuestionType, setQuestionType] = React.useState(" ");
  const [Questions, setQuestions] = React.useState(" ");
  const [multipleOptions, setMultipleOptions] = React.useState([]);
  const [optionInput, setOptionInput] = React.useState("");
  // console.log(multipleOptions);
  const setQuestion = (value) => {
    setQuestionType(value);
  };
  const handleAddOption = () => {
    setMultipleOptions([...multipleOptions, optionInput]);
    setOptionInput("");
  };
  const handleQuestion = (e) => {
    setQuestions(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      // await axios.post(`${process.env.REACT_APP_URL}/questions`, {
      await axios.post(`https://feedbackreviewbackend.onrender.com/questions`, {
        question: Questions,
        typeOf: QuestionType,
        options: multipleOptions,
      });
      Swal.fire({title: "<strong>success</strong>",icon: 'success'})
      setQuestionType("");
      setQuestions("");
      setMultipleOptions([])  
      setOptionInput("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <JumboDemoCard
        title={"Create Questions"}
        //   demoCode={code}
        wrapperSx={{ backgroundColor: "background.paper", pt: 0 }}
      >
        <FormControl defaultValue="" required>
          <Label>Question</Label>
          <StyledInput
            placeholder="Write your Question here"
            value={Questions}
            onChange={handleQuestion}
          />
          <HelperText />
          <BasicSelect
            options={[
              { name: "Multiple Choice: Single option", value: "singleChoice" },
              { name: "Multiple Option ", value: "multipleChoice" },
              { name: "Multi Line ", value: "multiLine" },
              { name: "Feedback", value: "stars" },
            ]}
            questionType={setQuestion}
            value={QuestionType}
          />
          <HelperText />
          {QuestionType == "singleChoice" ||
          QuestionType == "multipleChoice" ? (
            <div style={{ marginTop: "10px" }}>
              <div>
                <div>
                  <TextField
                    id="standard-basic"
                    label="Option 1"
                    variant="standard"
                    sx={{ minWidth: 320 }}
                    value={optionInput}
                    onChange={(e) => setOptionInput(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    sx={{ margin: 0 }}
                    onClick={handleAddOption}
                  >
                    Add
                  </Button>
                </div>
                {multipleOptions.map((option, index) => (
                  <div key={index}>
                    <Label required="false">
                      {index + 1}.{option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div style={{ marginTop: "10px" }}>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </FormControl>
      </JumboDemoCard>
    
    </>
  );
}

const StyledInput = styled(Input)(
  ({ theme }) => `

  .${inputClasses.input} {
    width: 320px;
    font-size: 0.875rem;
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
    padding: 8px 12px;
    border-radius: 8px;
    margin-bottom:1rem;

    &:hover {
      background: ${theme.palette.mode === "dark" ? "" : grey[100]};
      border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
    }

    &:focus {
      outline: 3px solid ${
        theme.palette.mode === "dark" ? blue[600] : blue[100]
      };
    }
  }
`
);

const Label = styled(({ children, className }) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return <p>{children}</p>;
  }

  const { error, required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return (
    <p className={clsx(className, error || showRequiredError ? "invalid" : "")}>
      {children}
      {required ? " " : ""}
    </p>
  );
})`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

const HelperText = styled((props) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
`;

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  600: "#0072E5",
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};
