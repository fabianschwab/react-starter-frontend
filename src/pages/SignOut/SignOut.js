import { useAuth } from "../../hooks/useAuth";
import { Button } from "@mui/material";

const SignOut = () => {
  const auth = useAuth();

  const handleSignOut = async () => {
    auth.signOut();
  };
  return (
    <Button variant="outlined" onClick={handleSignOut}>
      SignOut
    </Button>
  );
};

export default SignOut;
