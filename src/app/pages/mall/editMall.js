import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Card,
  CardContent,
  FormControlLabel,
  FormHelperText,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Swal from "sweetalert2";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import Div from "@jumbo/shared/Div";
import axios from "axios";
import { isValidEmail } from "@jumbo/utils";
import ToastAlerts from "../components/Toast";
const EditMall = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const { state } = useLocation();
  const showAlert = ToastAlerts();

  var initialValues = {
    mall_name: state.mall_name,
    first_name: state.first_name,
    last_name: state.last_name,
    password: state.password,
    email_id: state.email_id,
    location: state.location,
    mobile_no: state.mobile_no,
    status: state.status,
    device_type: state.device_type,
    model: state.model,
    sr_no: state.sr_no,
  };
  const validationSchema = yup.object({
    mall_name: yup.string("Enter Mall Name").required("Mall name is required"),
    first_name: yup
      .string("Enter First Name")
      .required("First Name is required")
      .matches(
        /^[A-Za-z]+$/,
        "First Name must contain only alphabetic characters"
      ),
    last_name: yup
      .string("Enter Last Name")
      .required("Last Name is required")
      .matches(
        /^[A-Za-z]+$/,
        "Last Name must contain only alphabetic characters"
      ),
    email_id: yup
      .string("Enter your Email ID")
      .required("Email is required")
      .test(
        "isValidEmail",
        "Email should contain lover case characters, '@' and '.' symbols",
        (value) => isValidEmail(value) // Check if the email is valid
      ),
    // mobile_no: yup
    //   .string()
    //   .typeError("Phone number must be a number")
    //   .required("Phone Number is Required")
    //   .matches(/^\d{10}$/, "Number should be 10 digits."),
    password: yup.string().required("Password is Required"),
  });

  const handleUserAdd = async (data) => {
    try {
      await axios.patch(
        `https://feedbackreviewbackend.onrender.com/mall/${id}`,
        data
      );
      showAlert("success", "Mall updated successfully.");
      navigate("/mall");
    } catch (error) {
      showAlert("error", error.response.data.message);
    }
  };

  
  return (
    <React.Fragment>
      <Typography variant="h1" mb={3}>
        EDIT USER
      </Typography>
      <Card>
        <CardContent>
          <Formik
            validateOnChange={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              validationSchema
                .validate(data, { abortEarly: false })
                .then(() => {
                  handleUserAdd(data);
                  setSubmitting(false);
                })
                .catch((validationErrors) => {
                  console.error("Validation Errors:", validationErrors);
                  setSubmitting(false);
                });
            }}
          >
            {({ setFieldValue, isSubmitting, values, errors, touched }) => (
              <Form noValidate autoComplete="off">
                <Grid container rowSpacing={3} columnSpacing={3}>
                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      size="small"
                      id="mall_name"
                      name="mall_name"
                      label="Mall Name"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      id="first_name"
                      size="small"
                      name="first_name"
                      label="First name"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      id="last_name"
                      size="small"
                      name="last_name"
                      label="Last name"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      size="small"
                      id="email_id"
                      name="email_id"
                      label="Email"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      id="password"
                      size="small"
                      name="password"
                      label="Password"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      type="number"
                      id="mobile_no"
                      size="small"
                      name="mobile_no"
                      label="Phone No."
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      id="location"
                      size="small"
                      name="location"
                      label="Location"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      id="model"
                      size="small"
                      name="model"
                      label="Model"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <JumboTextField
                      fullWidth
                      id="sr_no"
                      size="small"
                      name="sr_no"
                      label="Serial No."
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      fullWidth
                      error={errors.role_id && touched.role_id}
                    >
                      <Autocomplete
                        fullWidth
                        size="small"
                        disablePortal
                        getOptionLabel={(option) => option}
                        options={["Tab","Kiosk","Mobile"]}
                        name="device_type"
                        value={values.device_type}

                        onChange={(event, val) => {
                          setFieldValue("device_type", val);
                        }}
                        renderInput={(params) => (
                          <TextField
                            error={errors.device_type && touched.device_type}
                            {...params}
                            label="Device Type"
                          />
                        )}
                      />
                      {errors && errors.role_id && touched.role_id && (
                        <FormHelperText>{errors.role_id}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} alignContent="center">
                    <FormControlLabel
                      style={{ padding: "0px", margin: "0px", height: "100%" }}
                      control={
                        <Switch
                          onChange={(e) => {
                            setFieldValue(
                              "status",
                              values.status ? false : true
                            );
                          }}
                          defaultChecked={values.status ? true : false}
                          color="primary"
                        />
                      }
                      label="Status"
                      name="status"
                      labelPlacement="start"
                    />
                  </Grid>
                </Grid>

                <Grid container columnSpacing={3} mt={5}>
                  <Grid item xs={6} textAlign="right">
                    <LoadingButton variant="contained" size="medium" type="submit" loading={isSubmitting}>
                      Save
                    </LoadingButton>
                  </Grid>
                  <Grid item xs={6} textAlign="left">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure you want to cancel?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Yes",
                          cancelButtonText: "No",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigate("/user");
                          }
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default EditMall;
