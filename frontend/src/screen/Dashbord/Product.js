import React, { useEffect, useState } from "react";

import { Divider, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import Appber from "../../components/Appber";
import CustimizeButton from "../../components/CustimizeButton";
import ProductTable from "../../components/ProductTable";
import CustimizeProductCreateForm from "../../components/ProductCreateForm";

import { FetchProduct } from "../../data/action";

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

function ProductPage(props) {
  const classes = useStyle();
  const { categoryId } = useParams();
  const [openDialog, setOpenDialog] = useState();

  const categoryName = props.contentData.category.filter((item) => {
    return item.id === categoryId;
  });

  useEffect(() => {
    props.fetchProduct(categoryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid
        className={classes.root}
        container
        justifyContent="center"
        alignContent="flex-start"
      >
        <CustimizeProductCreateForm
          openDialog={openDialog}
          onClose={() => setOpenDialog(false)}
          Id={categoryId}
        />
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
              <Typography variant="h4">
                {categoryName[0].categoryName}
              </Typography>
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
              <ProductTable product={props.contentData.product} />
            </Grid>
          </Grid>
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
    fetchProduct: (id) => dispatch(FetchProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
