import React from "react";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import code from "../Selects/demo-code/basic-select.txt";

const BasicSelect = ({ options, questionType }) => {
  const [QuestionType, setQuestionType] = React.useState(" ");
  const onChangeHandle = (event) => {
    setQuestionType(event.target.value);
    questionType(event.target.value);
  };
  return (
    <FormControl sx={{ minWidth: 320 }} size="small">
      <InputLabel id="Types">Types</InputLabel>
      <Select
        labelId="types-label"
        id="Types"
        value={QuestionType}
        label="Types"
        onChange={(event) => onChangeHandle(event)}
      >
        {options.map((option) => (
          <MenuItem value={option.value}>{option.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BasicSelect;
