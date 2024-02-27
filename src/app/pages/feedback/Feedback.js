import * as React from "react";
import FullWidthTabs from "../components/mui/Tabs/FullWidthTabs";
import BasicSelect from "../components/mui/Selects/BasicSelect";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
export default function Feedback() {
  const [mall, setMall] = React.useState([]);
  const [mallName,setMallname] = React.useState("");

  const handleChange = function(event){
    setMallname(event.target.value);
  }

  React.useEffect(async () => {
    // const mall = await axios.get(`${process.env.REACT_APP_URL}/mall`);
    const mall = await axios.get(`https://feedbackreviewbackend.onrender.com/mall`);
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
            onChange={(event) => handleChange(event)}
          >
            {mall.map((e) => (
              <MenuItem value={e._id}>{e.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <FullWidthTabs mallId={mallName}/>
    </>
  );
}
