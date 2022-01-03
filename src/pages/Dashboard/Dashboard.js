import React, { Fragment } from "react";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import "./Dashboard.css";
import ApplicationDrawer from "../../Components/ApplicationDrawer/ApplicationDrawer";
import UserMenu from "../../Components/UserMenu/UserMenu";

export default function Dashboard(props) {
  return (
    <Fragment>
      <AppBar>
        <Toolbar>
          <ApplicationDrawer />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <UserMenu />
        </Toolbar>
      </AppBar>
      <Container className="mainContainer">
        <Outlet />
      </Container>
    </Fragment>
  );
}
