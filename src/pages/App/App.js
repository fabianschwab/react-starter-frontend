import { Button } from "@mui/material";
import { Fragment } from "react";
import { useAuth } from "../../hooks/useAuth";
import axiosJWT from "../../utils/axiosJWT";
import SignIn from "../SingIn/SignIn";
import SignOut from "../SignOut/SignOut";
import UserProfile from "../UserProfile/UserProfile";
import "./App.css";

function App() {
  const handleClick = async () => {
    const result = await axiosJWT.delete("/users/1001", {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    console.log(result);
  };

  const auth = useAuth();

  if (auth.user) {
    return (
      <Fragment>
        <Button variant="outlined" onClick={handleClick}>
          Click
        </Button>
        <SignOut />
        <UserProfile />
      </Fragment>
    );
  }
  return (
    <div>
      <SignIn />
    </div>
  );
}

export default App;
