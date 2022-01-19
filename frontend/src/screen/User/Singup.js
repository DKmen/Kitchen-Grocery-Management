import React, { useState } from "react";
import { connect } from "react-redux";
import { SingupUser } from "../../data/action.js";

import { Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate , Link } from "react-router-dom";

import CustimizeUserInput from "../../components/CustimizeUserInput";
import CustimizeButton from "../../components/CustimizeButton";
import SingupImage from "../../assets/SingupPage.svg";

const useStyle = makeStyles((them) => ({
  root: {
    padding: them.spacing(6),
    minHeight: "100vh",
    width: "100%",
  },
  buttonContainer: {
    marginTop: them.spacing(4),
  },
  loginImage: {
    width: "60%",
    display: "block",
    margin: "auto",
  },
}));

function SingupPage(props) {
  const classes = useStyle();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
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
            placeholder="Enter User Name"
            label="User Name"
            onChange={(event) => setUserName(event.target.value)}
          />
          <CustimizeUserInput
            placeholder="Enter User Email"
            label="User Email"
            onChange={(event) => setUserEmail(event.target.value)}
          />
          <CustimizeUserInput
            placeholder="Enter Password"
            label="Password"
            type='password'
            onChange={(event) => setPassword(event.target.value)}
          />
          <CustimizeUserInput
            placeholder="Re enter password"
            type='password'
            label="Confirm Password"
          />
          <Grid
            container
            className={classes.buttonContainer}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={4} xl={4}>
              <CustimizeButton
                title="Create User"
                onClick={async() => {
                  await props.singUp({ userName, userEmail, password });
                  navigate('../',{ replace: true })
                }}
              />
            </Grid>
          </Grid>
          <Box m={2}>
            <Typography variant="h6" align="center">
              Already have account ? <Link to="/login" style={{textDecoration:'none'}}>Login</Link>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} xl={6}>
          <img src={SingupImage} alt="" className={classes.loginImage} />
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
    singUp: (data) => dispatch(SingupUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingupPage);
