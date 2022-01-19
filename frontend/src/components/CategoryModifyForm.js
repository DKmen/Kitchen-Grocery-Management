import React from "react";

import { Dialog, DialogActions, DialogContent, Box } from "@material-ui/core";

import CustimizeButton from "./CustimizeButton";
import CustimizeUserInput from "./CustimizeUserInput";

export default function CustimizeCategoryModifyForm(props) {
  return (
    <Dialog
      open={props.openDialog}
      maxWidth="sm"
      fullWidth={true}
      onClose={props.onClose}
    >
      <DialogContent>
        <CustimizeUserInput
          placeholder="Enter Category Name"
          label="Category Name"
          onChange={props.onChange}
        />
      </DialogContent>
      <DialogActions>
        <Box style={{ maxWidth: 400, padding: 20 }}>
          <CustimizeButton
            title="Modify Category"
            onClick={props.CategotyModify}
          />
        </Box>
      </DialogActions>
    </Dialog>
  );
}
