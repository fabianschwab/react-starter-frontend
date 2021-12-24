import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./SignIn.css";
import {
  Container,
  Box,
  Typography,
  TextField,
  Stack,
  Button,
  Alert,
  Divider,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import * as yup from "yup";
import { useFormik } from "formik";

const SignIn = ({ to }) => {
  const [error, setError] = useState({ show: false, msg: "" });

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const signedIn = await auth.signIn(values);
      if (signedIn.auth) {
        // Navigate to passed path or if redirected return to old page
        const goto = location.state?.from?.pathname || to;
        navigate(goto);
      } else {
        setError({ show: true, msg: signedIn.msg });
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box className="singInScreen">
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <Typography variant="h1">SignIn</Typography>
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
              id="password"
              name="password"
              aria-label="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={(value) => {
                formik.handleChange(value);
                setError({ show: false, msg: "" });
              }}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            {error.show ? (
              <Alert variant="filled" severity="error">
                {error.msg}
              </Alert>
            ) : (
              ""
            )}
            <Button type="submit" size="large" variant="contained">
              SignIn
            </Button>
            <Divider sx={{ color: grey[400] }}>or</Divider>
            <Button
              onClick={() => {
                navigate("/signup");
              }}
              variant="outlined"
            >
              Sign Up
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
