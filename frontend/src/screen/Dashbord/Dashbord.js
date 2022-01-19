import React, { useEffect, useState } from "react";

import { Divider, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import Appber from "../../components/Appber";
import CustimizeButton from "../../components/CustimizeButton";
import CustimizeCategoryCard from "../../components/CategoryCard";
import { FetchUser, FetchCategory } from "../../data/action";
import CustimizeProductCreateForm from "../../components/ProductCreateForm";

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

function DashbordPage(props) {
  const classes = useStyle();
  const navigaet = useNavigate();

  const [login, setLogin] = useState(false);
  const [openDialog , setOpenDialog] = useState(false);

  useEffect(() => {
    const FatchUser = async () => {
      const token = Cookies.get("token");
      if (!token) return new Error();
      const responceData = await fetch("http://localhost:3050/v1/user", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      });
      return await responceData.json();
    };
    FatchUser()
      .then((data) => {
        props.fetchUser(data);
        props.fetchCategory();
        setLogin(true);
      })
      .catch(() => {
        navigaet("../login", { replace: true });
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {login ? (
        <Grid
          className={classes.root}
          container
          justifyContent="center"
          alignContent="flex-start"
        >
          <CustimizeProductCreateForm openDialog={openDialog} onClose={()=>setOpenDialog(false)}/>
          <Grid item xs={12} md={12} xl={12}>
            <Appber />
          </Grid>
          <Grid item xs={12} md={10} xl={8}>
            <Grid
              container
              style={{ marginTop: 40 }}
              justifyContent="space-between"
            >
              <Grid item xs={12} sm={6} md={6} xl={6} style={{ margin: 4 }}>
                <Typography variant="h4">Category</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3} xl={2} style={{ margin: 4 }}>
                <CustimizeButton title="Add Product" onClick={()=>setOpenDialog(true)}/>
              </Grid>
              <Grid
                xs={12}
                md={12}
                xl={12}
                style={{ marginTop: 20, marginBottom: 20 }}
              >
                <Divider />
              </Grid>
              <Grid item xs={12} md={12} xl={12}>
                <Grid container>
                  {props.contentData.category.length !== 0
                    ? props.contentData.category.map((item) => {
                        return (
                          <CustimizeCategoryCard
                            title={item.categoryName}
                            onClick={() => {
                              navigaet(`../product/${item.id}`)
                            }}
                          />
                        );
                      })
                    : null}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
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
    fetchUser: (data) => dispatch(FetchUser(data)),
    fetchCategory: () => dispatch(FetchCategory()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashbordPage);
