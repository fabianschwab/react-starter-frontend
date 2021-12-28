import { Container, Divider, Typography } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SignIn from "../SingIn/SignIn";
import SignUp from "../SingUp/SignUp";
import "./App.css";
import { useAuth } from "../../hooks/useAuth";
import { useLocation, Navigate } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";

function App() {
  const Home = () => {
    return (
      <Container maxWidth="md">
        <Typography>Hello World</Typography>
        <Typography variant="caption">React Starter Application</Typography>
        <Divider />
        <Link to="/signin">SignIn to start</Link>
      </Container>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={
            <RedirectIfAuth>
              <SignUp to="/signin" />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/signin"
          element={
            <RedirectIfAuth>
              <SignIn to="/dashboard" />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isAuth()) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
}

function RedirectIfAuth({ children }) {
  const auth = useAuth();

  if (auth.isAuth()) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default App;
