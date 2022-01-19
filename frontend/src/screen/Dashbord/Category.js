import React, { useEffect, useState } from "react";

import {
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { CreateCategory  } from "../../data/action";

import Appber from "../../components/Appber";
import CustimizeButton from "../../components/CustimizeButton";
import CustimizeCategoryForm from "../../components/CategoryCreateForm";
import CategoryTable from "../../components/CategoryTable";


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

function CategoryPage(props) {
  const classes = useStyle();
  const [categoryName, setCategoryName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const navigaet = useNavigate();

  useEffect(() => {
    if (!props.contentData.user.login) navigaet("../login", { replace: true });
  },[navigaet, props]);


  const CategotyCreate = () => {
    props.createCategory({ categoryName: categoryName });
    setOpenDialog(false);
  };

  if (props.contentData.user.login) {
    return (
      <>
        <CustimizeCategoryForm
          openDialog={openDialog}
          onClose={() => setOpenDialog(false)}
          onChange={(event) => setCategoryName(event.target.value)}
          CategotyCreate={CategotyCreate}
        />
        <Grid
          className={classes.root}
          container
          justifyContent="center"
          alignContent="flex-start"
          spacing={2}
        >
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
                <CustimizeButton
                  title="Add Category"
                  onClick={() => setOpenDialog(true)}
                />
              </Grid>
              <Grid item xs={12} md={12} xl={12} style={{ marginTop: 20 }}>
                <Divider />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={10} xl={8}>
            <Grid container justifyContent="flex-start">
              <Grid item xs={12} md={8} xl={6}>
                <CategoryTable/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  } else {
    return <Navigate to="login" />;
  }
}

const mapStateToProps = (state) => {
  return {
    contentData: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCategory: (data) => dispatch(CreateCategory(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
