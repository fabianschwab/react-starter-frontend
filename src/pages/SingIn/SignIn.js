import { useState } from "react";
import "./SignIn.css";

const {
  Container,
  Typography,
  TextField,
  Stack,
  Button,
  Alert,
} = require("@mui/material");

const SignIn = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const handleSignIn = () => {
    console.log(credentials);
    setError(true);
  };

  const handelInputChange = (prop) => (event) => {
    setError(false);
    setCredentials({ ...credentials, [prop]: event.target.value });
  };

  return (
    <Container className="singInScreen" maxWidth="sm">
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
        {error ? (
          <Alert severity="error">Incorrect Username or Password.</Alert>
        ) : (
          ""
        )}
        <Button onClick={handleSignIn} size="large" variant="contained">
          SignIn
        </Button>
      </Stack>
    </Container>
  );
};

export default SignIn;