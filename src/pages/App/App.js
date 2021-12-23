import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "../SingIn/SignIn";
import UserProfile from "../UserProfile/UserProfile";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn to="/profile" />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
