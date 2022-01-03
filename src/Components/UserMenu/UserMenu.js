import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../../hooks/useAuth";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

const UserMenu = () => {
  const auth = useAuth();
  const [userMenuState, setUserMenuState] = useState(false);
  const handleMenu = (event) => {
    setUserMenuState(event.currentTarget);
  };

  const handleClose = () => {
    setUserMenuState(false);
  };

  const handleSignOut = async () => {
    auth.signOut();
  };

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={userMenuState}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(userMenuState)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to="profile" onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem component={Link} to="/" onClick={handleSignOut}>
          Sign Out
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
