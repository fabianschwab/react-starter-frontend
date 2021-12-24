import { useAuth } from "../../hooks/useAuth";
import { Button } from "@mui/material";

const SignOutButton = () => {
  const auth = useAuth();

  const handleSignOut = async () => {
    auth.signOut();
    // TODO: Add redirect to.
  };
  return (
    <Button variant="outlined" onClick={handleSignOut}>
      SignOut
    </Button>
  );
};

export default SignOutButton;
