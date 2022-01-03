import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Dashboard.css";

export default function Dashboard(props) {
  const auth = useAuth();
  const navigate = useNavigate();
  const [userMenuState, setUserMenuState] = useState(null);
  const [drawerState, setDrawerState] = useState(null);

  const handleMenu = (event) => {
    setUserMenuState(event.currentTarget);
  };

  const handleClose = () => {
    setUserMenuState(null);
  };

  const handleSignOut = async () => {
    auth.signOut();
    handleClose();
    navigate("/");
  };

  const handleProfile = async () => {
    handleClose();
    navigate("/dashboard/profile");
  };

  return (
    <Fragment>
      <Drawer
        anchor="left"
        open={drawerState}
        onClose={() => {
          setDrawerState(false);
        }}
      >
        <Box
          className="drawer"
          role="presentation"
          onClick={() => {
            setDrawerState(false);
          }}
        >
          <List>
            <ListItem button key="Dashboard" component={Link} to="/dashboard">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              setDrawerState(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
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
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Container className="mainContainer">
        <Outlet />
      </Container>
    </Fragment>
  );
}
