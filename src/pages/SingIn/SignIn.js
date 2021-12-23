import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";

const SignIn = ({ to }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({ show: false, msg: "" });

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const signedIn = await auth.signIn(credentials);
    if (signedIn.auth) {
      // Navigate to passed path
      navigate(to);
    } else {
      setError({ show: true, msg: signedIn.msg });
    }
  };

  const handelInputChange = (prop) => (event) => {
    setError({ show: false });
    setCredentials({ ...credentials, [prop]: event.target.value });
  };

  return (
    <Container maxWidth="sm">
      <Box className="singInScreen">
        <Stack spacing={2}>
          <Typography variant="h1">SignIn</Typography>
          <TextField
            onChange={handelInputChange("username")}
            id="username"
            aria-label="username"
            label="Username"
          />
          <TextField
            onChange={handelInputChange("password")}
            id="password"
            aria-label="password"
            label="Password"
            type="password"
          />
          {error.show ? (
            <Alert variant="filled" severity="error">
              {error.msg}
            </Alert>
          ) : (
            ""
          )}
          <Button onClick={handleSignIn} size="large" variant="contained">
            SignIn
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default SignIn;
