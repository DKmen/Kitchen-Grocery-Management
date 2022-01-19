import React from "react";
import { Button } from "@material-ui/core";

export default function CustimizeButton(props) {
  return (
    <>
      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={props.onClick}
        fullWidth
      >
        {props.title}
      </Button>
    </>
  );
}
