import React,{ useState } from "react";

import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { LogOutUser } from "../data/action";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((them) => {
  return {
    root: {
      flex: 1,
    },
  };
});

function Appbar(props) {
  const classes = useStyles();
  const navigaet = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const UserLogout = () => {
    props.logout();
    navigaet("../login", { replace: true });
  };

  const CategoryPage = () => {
    navigaet("../category", { replace: true });
  };

  const ProductPage = () => {
    navigaet("../", { replace: true });
  };

  return (
    <>
      <SwipeableDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List disablePadding style={{ width: "80vw", maxWidth: 300 }}>
          <ListItem button>
            <ListItemIcon>
              <Avatar>{props.contentData.user.userName.charAt(0)}</Avatar>
            </ListItemIcon>
            <ListItemText
              primary={props.contentData.user.userName}
              secondary={props.contentData.user.email}
            />
          </ListItem>
          <Divider />
          <ListItem button onClick={ProductPage}>
            <ListItemText primary="Product" />
          </ListItem>
          <ListItem button onClick={CategoryPage}>
            <ListItemText primary="Category" />
          </ListItem>
          <Divider variant="middle" />
          <ListItem button onClick={UserLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </SwipeableDrawer>
      <AppBar>
        <Toolbar>
          <Box className={classes.root}>
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
          <IconButton>
            <Avatar>{props.contentData.user.userName.charAt(0)}</Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    contentData: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(LogOutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Appbar);
