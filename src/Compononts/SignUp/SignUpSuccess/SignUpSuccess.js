import { Fragment } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { lightGreen } from "@mui/material/colors";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignUpSuccess = ({ to }) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <CheckCircleOutlineIcon
        sx={{ fontSize: "100px", color: lightGreen[500] }}
      />
      <Typography variant="h4">Successfully Signed Up</Typography>
      <Typography>
        Congratulations, your account has been successfully created. <br />
        You can now login.
      </Typography>
      <Button
        sx={{ marginTop: "32px" }}
        variant="outlined"
        onClick={() => {
          navigate(to);
        }}
      >
        Go To Login Page
      </Button>
    </Fragment>
  );
};

export default SignUpSuccess;
