import "./ApplicationDrawer.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

const ApplicationDrawer = () => {
  const [drawerState, setDrawerState] = useState(false);

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default ApplicationDrawer;
