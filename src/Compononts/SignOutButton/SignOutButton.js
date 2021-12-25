import { useAuth } from "../../hooks/useAuth";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignOutButton = ({ to }) => {
  const auth = useAuth();

  const navigate = useNavigate();

  const handleSignOut = async () => {
    auth.signOut();
    navigate(to);
  };
  return (
    <Button variant="outlined" onClick={handleSignOut}>
      SignOut
    </Button>
  );
};

export default SignOutButton;
