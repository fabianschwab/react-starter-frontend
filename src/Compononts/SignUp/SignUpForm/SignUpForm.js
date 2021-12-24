import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import "./SignUpForm.css";
import {
  Box,
  Typography,
  TextField,
  Stack,
  Button,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";

const SignUpForm = ({ onSuccess }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState({ show: false, msg: "" });

  const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters long")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirmation of the password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, formikBag, props) => {
      const signedUp = await auth.signUp(values);
      if (signedUp.auth) {
        // Success callback function
        onSuccess();
      } else {
        setError({ show: true, msg: signedUp.msg });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <Typography variant="h1">SignUp</Typography>
        <TextField
          id="username"
          name="username"
          aria-label="username"
          label="Username"
          type="text"
          value={formik.values.username}
          onChange={(value) => {
            formik.handleChange(value);
            setError({ show: false, msg: "" });
          }}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          id="email"
          name="email"
          aria-label="email"
          label="E-Mail"
          type="email"
          value={formik.values.email}
          onChange={(value) => {
            formik.handleChange(value);
            setError({ show: false, msg: "" });
          }}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          id="password"
          name="password"
          aria-label="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          id="confirmPassword"
          name="confirmPassword"
          aria-label="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
        {error.show ? (
          <Alert variant="filled" severity="error">
            {error.msg}
          </Alert>
        ) : (
          ""
        )}
        <Box className="signUpButtons">
          <Button type="submit" fullWidth variant="contained">
            SignUp
          </Button>
          <Button
            fullWidth
            onClick={() => {
              navigate(-1);
            }}
            variant="outlined"
          >
            Cancel
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

export default SignUpForm;
