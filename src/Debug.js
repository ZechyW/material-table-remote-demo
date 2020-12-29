/**
 * Debug component
 */

import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "./app/material-styles";
import { decrement, increment, selectCount } from "./features/table/tableSlice";

function Debug() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const count = useSelector(selectCount);

  return (
    <>
      <span>{count}</span>
      <Button
        variant="contained"
        className={classes.simpleSpacer}
        color={"primary"}
        onClick={() => dispatch(increment())}
      >
        Increment
      </Button>
      <Button
        variant="contained"
        className={classes.simpleSpacer}
        color={"secondary"}
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </Button>
    </>
  );
}

export default Debug;
