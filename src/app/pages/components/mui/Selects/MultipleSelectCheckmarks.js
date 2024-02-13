import React from "react";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import code from "../Selects/demo-code/multiple-select-checkmarks.txt";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const MultipleSelectCheckmarks = ({ mall, questionId, setMallIds }) => {
  const [selected, setSelected] = React.useState([]);
  // console.log(selected);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    // console.log(event.target);
    setSelected(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    // console.log(value.map((e) => e._id));
    setMallIds(value.map((e) => e._id));
  };
  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-multiple-checkbox-label">Malls</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={selected}
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) =>
          selected.map((value) => value.name).join(", ")
        }
        MenuProps={MenuProps}
        name={selected}
      >
        {mall.map((name) => (
          <MenuItem key={name._id} value={name}>
            <Checkbox checked={selected.indexOf(name) > -1} />
            <ListItemText primary={name.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelectCheckmarks;
