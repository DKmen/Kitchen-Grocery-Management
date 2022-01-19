import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

import CustimizeButton from "./CustimizeButton";
import CustimizeUserInput from "./CustimizeUserInput";
import { connect } from "react-redux";

import { CreateProduct } from "../data/action";

function CustimizeProductCreateForm(props) {
  const [productName, setProductName] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [productQuentaty, setProductQuentaty] = useState("");
  const [description, setDescription] = useState("");
  const [categoryID, setCategoryID] = useState("");

  useEffect(()=>{
    if (props.Id) setCategoryID(props.Id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <Dialog
      open={props.openDialog}
      maxWidth="lg"
      fullWidth={true}
      onClose={props.onClose}
    >
      <DialogContent>
        <Grid container justifyContent="space-between">
          <Grid item sm={12} md={6} xl={6}>
            <CustimizeUserInput
              placeholder="Enter Product Name"
              label="Product Name"
              onChange={(event) => setProductName(event.target.value)}
            />
          </Grid>
          <Grid item sm={12} md={6} xl={6}>
            <CustimizeUserInput
              label="Product Expire"
              type="date"
              defaultValue={"2022-05-24"}
              onChange={(event) => setExpireDate(event.target.value)}
            />
          </Grid>
          <Grid item sm={12} md={6} xl={6}>
            <CustimizeUserInput
              label="Product Que."
              type="number"
              defaultValue={1}
              onChange={(event) => setProductQuentaty(event.target.value)}
            />
          </Grid>
          <Grid item sm={12} md={6} xl={6}>
            {props.categoryID==null ? (
              <FormControl fullWidth margin="normal">
                <InputLabel style={{ marginTop: -4, marginLeft: 20 }}>
                  Category
                </InputLabel>
                <Select
                  variant="outlined"
                  label="Category"
                  onChange={(event) => setCategoryID(event.target.value)}
                  value={props.Id | null}
                  disabled={Boolean(props.Id)}
                >
                  {props.contentData.category.map((item) => {
                    return (
                      <MenuItem value={item.id}>{item.categoryName}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            ) : null}
          </Grid>
          <Grid item sm={12} md={12} xl={12}>
            <CustimizeUserInput
              label="Description"
              placeholder="Enter Description"
              onChange={(event) => setDescription(event.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box style={{ maxWidth: 400, padding: 20 }}>
          <CustimizeButton
            title="Add Product"
            onClick={() => {
              props.createProduct({
                productName,
                productQuentaty,
                expireDate,
                description,
                categoryID,
              });
              setProductName("");
              setProductQuentaty(0);
              setExpireDate("");
              setDescription("");
              setCategoryID("");
              props.onClose();
            }}
          />
        </Box>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = (state) => {
  return {
    contentData: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProduct: (data) => dispatch(CreateProduct(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustimizeProductCreateForm);
