import React, { useEffect, useState } from "react";
import { Autocomplete, Checkbox, FormControl, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const MultipleSelectCheckmarks = ({
  mall,
  questionId,
  setMallIds,
  mappedQuestions,
  setRemoveMallIds,
  removedmallIds,
}) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [existingMappedMalls, setExistingMappedMalls] = useState([]);

  useEffect(() => {
    setExistingMappedMalls(
      mappedQuestions
        .filter((mapping) => mapping.questionId === questionId)
        .map((mapping) => mall.find((item) => item._id === mapping.mallId))
    );
  }, [questionId, mall, mappedQuestions]);

  // const handleChange = (event, value) => {
  //   const selectedMallIds = value.map((mall) => mall._id);
  //   const removedMallIds = existingMappedMalls
  //     .filter((mall) => !selectedMallIds.includes(mall._id))
  //     .map((mall) => mall._id);
  //   const addedMallIds = selectedMallIds
  //     .filter(
  //       (mallId) => !existingMappedMalls.some((mall) => mall._id === mallId)
  //     )
  //     .filter((mallId) => !removedMallIds.includes(mallId));
  //   setMallIds(selectedMallIds);
  //   setRemoveMallIds(removedMallIds);
  //   setExistingMappedMalls(value);
  // };
  const handleChange = (event, value) => {
    const selectedMallIds = value.map((mall) => mall._id);
    const removedMallIds = existingMappedMalls
      .filter((mall) => !selectedMallIds.includes(mall._id))
      .map((mall) => mall._id);
    setMallIds(selectedMallIds);
    setRemoveMallIds([...removedmallIds, removedMallIds]);
    setExistingMappedMalls(value);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={mall}
        disableCloseOnSelect
        getOptionLabel={(option) => option.mall_name}
        renderOption={(props, option) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={existingMappedMalls.some(
                (mall) => mall._id === option._id
              )}
            />
            {option.mall_name}
          </li>
        )}
        size="small"
        style={{ width: 320 }}
        value={existingMappedMalls}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} label="Malls" placeholder="Select Malls" />
        )}
      />
    </FormControl>
  );
};

export default MultipleSelectCheckmarks;
