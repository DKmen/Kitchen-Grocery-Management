import React, { useState } from "react";
import { connect } from "react-redux";
import { LoginUser } from "../../data/action";

import { Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {  Link , useNavigate } from "react-router-dom";

import CustimizeUserInput from "../../components/CustimizeUserInput";
import CustimizeButton from "../../components/CustimizeButton";
import loginImage from "../../assets/LoginPage.svg";

const useStyle = makeStyles((them) => ({
  root: {
    padding: them.spacing(6),
    minHeight: "100vh",
    width: "100%",
  },
  buttonContainer: {
    marginTop: them.spacing(2),
  },
  loginImage: {
    width: "60%",
    display: "block",
    margin: "auto",
  },
}));

function LoginPage(props) {
  const classes = useStyle();
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Grid
        container
        className={classes.root}
        justifyContent="center"
        alignItems="center"
        wrap="wrap-reverse"
      >
        <Grid item xs={12} md={6} xl={6}>
          <CustimizeUserInput
            placeholder="Enter Email"
            label="User Email"
            onChange={(event) => setUserEmail(event.target.value)}
          />
          <CustimizeUserInput
            placeholder="Enter Password"
            onChange={(event) => setPassword(event.target.value)}
            label="Password"
            type="password"
          />
          <Grid container className={classes.buttonContainer} spacing={2}>
            <Grid item xs={12} md={6} xl={6}>
              <CustimizeButton
                title="Log In"
                onClick={async() => {
                  await props.login({ userEmail, password });
                  navigate('../',)
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={6}>
              <CustimizeButton title="Forgot Password" />
            </Grid>
          </Grid>
          <Box m={2}>
            <Typography variant="h6" align="center">
              Don't have account ?
              <Link to="/singup" style={{ textDecoration: "none" }}>
                Sing Up
              </Link>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} xl={6}>
          <img src={loginImage} alt="" className={classes.loginImage} />
        </Grid>
      </Grid>
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
    login: (data) => dispatch(LoginUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
