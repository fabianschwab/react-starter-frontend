import React, { useState } from "react";
import "./SignUp.css";
import SignUpForm from "../../Components/SignUp/SignUpForm/SignUpForm";
import SignUpSuccess from "../../Components/SignUp/SignUpSuccess/SignUpSuccess";
import { Container, Box } from "@mui/material";

const SignUp = ({ to }) => {
  const [success, setSuccess] = useState(false);
  const handleSuccess = () => {
    setSuccess(true);
  };
  return (
    <Container maxWidth="sm">
      <Box className="singUpScreen">
        {success ? (
          <SignUpSuccess to={to} />
        ) : (
          <SignUpForm onSuccess={handleSuccess} />
        )}
      </Box>
    </Container>
  );
};

export default SignUp;
