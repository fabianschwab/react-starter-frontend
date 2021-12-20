import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
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

  const [error, setError] = useState({ show: false, msg: "" });

  const auth = useAuth();

  const handleSignIn = async () => {
    const signedIn = await auth.signIn(credentials);
    if (signedIn.auth) {
      // Navigate to Dashboard
    } else {
      setError({ show: true, msg: signedIn.msg });
    }
  };

  const handelInputChange = (prop) => (event) => {
    setError({ show: false });
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
    </Container>
  );
};

export default SignIn;
