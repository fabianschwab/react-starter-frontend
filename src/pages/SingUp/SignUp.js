import React, { useState } from "react";
import "./SignUp.css";
import {
  Container,
  Box,
  Typography,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const handleSignUp = () => {
    // validate fields
  };

  const [userInputs, setUserInputs] = useState();

  const handelInputChange = (prop) => (event) => {
    if (prop === "email") {
    }
    setUserInputs({ ...userInputs, [prop]: event.target.value });
  };

  return (
    <Container maxWidth="sm">
      <Box className="singUpScreen">
        <Stack spacing={2}>
          <Typography variant="h1">SignUp</Typography>
          <TextField
            onChange={handelInputChange("username")}
            id="username"
            aria-label="username"
            label="Username"
            type="text"
          />
          <TextField
            onChange={handelInputChange("email")}
            id="email"
            aria-label="email"
            label="E-Mail"
            type="email"
          />
          <TextField
            // onChange={handelInputChange("password")}
            id="password"
            aria-label="password"
            label="Password"
            type="password"
          />
          <TextField
            // onChange={handelInputChange("confirmPassword")}
            id="confirmPassword"
            aria-label="confirmPassword"
            label="Confirm Password"
            type="password"
          />
          <Box className="signUpButtons">
            <Button onClick={handleSignUp} fullWidth variant="contained">
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
      </Box>
    </Container>
  );
};

export default SignUp;
