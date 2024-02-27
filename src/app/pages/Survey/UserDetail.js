import * as React from "react";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
import clsx from "clsx";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import Paper from "@mui/material/Paper";
import ResponsiveGrid from "../components/mui/Grids/ResponsiveGrid";
import ColumnsGrid from "../components/mui/Grids/ColumnsGrid";
import Div from "@jumbo/shared/Div";
export default function UserDetail({ id }) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [userDetail, setUserDetail] = React.useState({
    name: "",
    contact: "",
    email: "",
    city: "",
    feedback: "",
  });

  const handleUserDetail = (e) => {
    const { name, value } = e.target;
    setUserDetail({ ...userDetail, [name]: value });
  };
  // console.log(userDetail);
  const handleSubmit = () => {
    (async () => {
      // const questions = await axios.patch(
      //   `${process.env.REACT_APP_URL}/RatingAndReviews/addUser/${id}`,
      //   userDetail
      // );
      const questions = await axios.patch(
        `https://feedbackreviewbackend.onrender.com/RatingAndReviews/addUser/${id}`,
        userDetail
      );
      Swal.fire({
        title: "<strong>success</strong>",
        icon: "success",
      });
      setUserDetail({
        name: "",
        contact: "",
        email: "",
        city: "",
        feedback: "",
      });
    })();
  };

  return (
    <>
      <FormControl defaultValue="" required>
        {/* <ColumnsGrid/> */}
        <Div sx={{ display: "flex", justifyContent: "left" }}>
          <Div sx={{ width: "50%", display: "flex", flexDirection: "column" }}>
            <Typography sx={{ mt: 2 }} color={"black"}>
              Name
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              name="name"
              value={userDetail.name}
              onChange={handleUserDetail}
              //   sx={{ width: "50%" }}
              fullWidth
              size="small"
            />
            <Typography sx={{ mt: 2 }} color={"black"}>
              Contact Number
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              name="contact"
              value={userDetail.contact}
              onChange={handleUserDetail}
              fullWidth
              size="small"
            />
            <Typography sx={{ mt: 2 }} color={"black"}>
              Email Id
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              name="email"
              value={userDetail.email}
              onChange={handleUserDetail}
              fullWidth
              size="small"
            />
            <Typography sx={{ mt: 2 }} color={"black"}>
              City
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              name="city"
              value={userDetail.city}
              onChange={handleUserDetail}
              fullWidth
              size="small"
            />
            <Typography sx={{ mt: 2 }} color={"black"}>
              Feedback
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              name="feedback"
              value={userDetail.feedback}
              onChange={handleUserDetail}
              fullWidth
              size="small"
            />

            <div style={{ marginTop: "10px" }}>
              <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </Div>
        </Div>
      </FormControl>
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
