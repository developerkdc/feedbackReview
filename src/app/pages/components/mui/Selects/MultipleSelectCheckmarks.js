import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import axios from "axios";

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
  const [selected, setSelected] = useState([]);
  const [existingMappedMalls, setExistingMappedMalls] = useState([]);

  useEffect(() => {
    const fetchMappedMalls = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/mappingQuestion/mall/list`
        );
        console.log(response.data);
        const mappedMalls = response.data?.mappedquestion || [];
        setExistingMappedMalls(
          mappedMalls
            .filter((mapping) => mapping.questionId === questionId)
            .map((mapping) => mapping.mallId)
        );
      } catch (error) {
        console.error("Error fetching mapped malls:", error);
      }
    };

    fetchMappedMalls();
  }, [questionId]);

  const handleChange = (event) => {
    const selectedMalls = event.target.value;
    const mallIds = selectedMalls.map((e) => e._id);

    // Add new malls
    const newMalls = mallIds.filter(
      (mallId) => !existingMappedMalls.includes(mallId)
    );
    setExistingMappedMalls([...existingMappedMalls, ...newMalls]);

    // Remove malls that are deselected
    const removedMalls = existingMappedMalls.filter(
      (mallId) => !mallIds.includes(mallId)
    );
    setExistingMappedMalls(
      existingMappedMalls.filter((mallId) => !removedMalls.includes(mallId))
    );

    // Set selected malls
    setSelected(selectedMalls);
    setMallIds(mallIds);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-multiple-checkbox-label">Malls</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={mall}
        size="small"
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) =>
          selected
            .filter((value) => existingMappedMalls.includes(value._id))
            .map((value) => `${value.mall_name}`)
            .join(", ")
        }
        MenuProps={MenuProps}
      >
        {mall.map((name, index) => (
          <MenuItem key={name._id} value={name}>
            <Checkbox checked={existingMappedMalls.includes(name._id)} />
            <ListItemText primary={name.mall_name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelectCheckmarks;
