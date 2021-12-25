import { Container, Divider, Typography } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SignIn from "../SingIn/SignIn";
import SignUp from "../SingUp/SignUp";
import UserProfile from "../UserProfile/UserProfile";
import "./App.css";
import { useAuth } from "../../hooks/useAuth";
import { useLocation, Navigate } from "react-router-dom";

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

  const Dummy = () => {
    return (
      <Container maxWidth="md">
        <Typography>Hello User!</Typography>
        <Typography variant="caption">
          Your are now logged in and can see protected content.
        </Typography>
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
            <NotWhenAuthenticated>
              <SignUp to="/signin" />
            </NotWhenAuthenticated>
          }
        />
        <Route
          path="/signin"
          element={
            <NotWhenAuthenticated>
              <SignIn to="/profile" />
            </NotWhenAuthenticated>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <UserProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/dummy"
          element={
            <RequireAuth>
              <Dummy />
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

  if (!auth.getUser()) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
}

function NotWhenAuthenticated({ children }) {
  const auth = useAuth();

  if (auth.getUser()) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/profile" />;
  }

  return children;
}

export default App;
