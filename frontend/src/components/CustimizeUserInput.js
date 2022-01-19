import React from "react";
import { TextField, Box } from "@material-ui/core";

export default function CustimizeUserInput(props) {
  return (
    <>
      <Box style={{ marginRight: 4, marginLeft: 4 }}>
        <TextField
          variant="outlined"
          placeholder={props.placeholder}
          label={props.label}
          type={props.type}
          margin="normal"
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          fullWidth
        />
      </Box>
    </>
  );
}
