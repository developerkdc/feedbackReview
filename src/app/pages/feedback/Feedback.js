import * as React from "react";
import FullWidthTabs from "../components/mui/Tabs/FullWidthTabs";
import BasicSelect from "../components/mui/Selects/BasicSelect";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
export default function Feedback() {
  const [mall, setMall] = React.useState([]);
  const [mallName, setMallname] = React.useState("");

  const handleChange = function (event) {
    setMallname(event.target.value);
  };

  React.useEffect(async () => {
    const mall = await axios.get(`${process.env.REACT_APP_URL}/mall`);
    // const mall = await axios.get(`https://feedbackreviewbackend.onrender.com/mall`);
    setMall(mall.data.data);
    setMallname(mall?.data?.data[0]?._id);
  }, []);
  console.log(mall);
  return (
    <>
      <Box sx={{ marginBottom: "30px" }}>
        <FormControl sx={{ minWidth: 320 }} size="small">
          <InputLabel id="Types">Malls</InputLabel>
          <Select
            labelId="types-label"
            id="Types"
            value={mallName || ""}
            label="Types"
            onChange={(event) => handleChange(event)}
          >
            {mall.map((e) => (
              <MenuItem value={e._id}>{e.mall_name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <JumboDemoCard wrapperSx={{ backgroundColor: "background.paper", pt: 0,}}>
        <FullWidthTabs mallId={mallName} />
      </JumboDemoCard>
    </>
  );
}
