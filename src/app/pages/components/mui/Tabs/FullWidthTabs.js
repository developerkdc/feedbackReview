import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import Div from "@jumbo/shared/Div";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

const FullWidthTabs = ({ mallId }) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [question, setQuestion] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  React.useEffect(() => {
    if (mallId.length > 0) {
      (async () => {
        const questions = await axios.get(
          `http://localhost:8000/mappingQuestion/${mallId}?type=${
            value === 0 ? "stars" : ""
          }`
        );
        setQuestion(questions.data.getMappingQuestions);
      })();
    }
  }, [mallId, value]);

  return (
    <JumboDemoCard title={"Fixed Tabs Full width"}>
      <Div sx={{ width: "80%", bgcolor: "background.paper" }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Feedback" {...a11yProps(0)} />
            <Tab label="Survey" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Questions</TableCell>
                    <TableCell align="right">Types</TableCell>
                    <TableCell align="right">Option 1</TableCell>
                    <TableCell align="right">Option 2</TableCell>
                    <TableCell align="right">Option 3</TableCell>
                    <TableCell align="right">Option 4</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {question?.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.questionId.question}
                      </TableCell>
                      <TableCell align="right">{row.questionId.typeOf}</TableCell>
                      <TableCell align="right">{row.questionId?.options[0] ? row.questionId?.options[0] : "-"}</TableCell>
                      <TableCell align="right">{row.questionId?.options[1] ? row.questionId?.options[1] : "-"}</TableCell>
                      <TableCell align="right">{row.questionId?.options[2] ? row.questionId?.options[2] : "-"}</TableCell>
                      <TableCell align="right">{row.questionId?.options[3] ? row.questionId?.options[3] : "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Questions</TableCell>
                    <TableCell align="right">Types</TableCell>
                    <TableCell align="right">Option 1</TableCell>
                    <TableCell align="right">Option 2</TableCell>
                    <TableCell align="right">Option 3</TableCell>
                    <TableCell align="right">Option 4</TableCell>
                    <TableCell align="right">Location</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {question?.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.questionId.question}
                      </TableCell>
                      <TableCell align="right">{row.questionId?.typeOf}</TableCell>
                      <TableCell align="right">{row.questionId?.options[0] ? row.questionId?.options[0] : "-"}</TableCell>
                      <TableCell align="right">{row.questionId?.options[1] ? row.questionId?.options[1] : "-"}</TableCell>
                      <TableCell align="right">{row.questionId?.options[2] ? row.questionId?.options[2] : "-"}</TableCell>
                      <TableCell align="right">{row.questionId?.options[3] ? row.questionId?.options[3] : "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </SwipeableViews>
      </Div>
    </JumboDemoCard>
  );
};
export default FullWidthTabs;
