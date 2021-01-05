/**
 * Debug component
 */

import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { togglePreload } from "../table/tableSlice";
import { decrement, increment } from "./debugSlice";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
  },
}));

function Debug() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const count = useSelector((state) => state.debug.count);
  const preloadDetails = useSelector((state) => state.table.preloadDetails);

  return (
    <>
      <span>{count}</span>
      <Button
        variant="contained"
        className={classes.button}
        color={"primary"}
        onClick={() => dispatch(increment())}
      >
        Increment
      </Button>
      <Button
        variant="contained"
        className={classes.button}
        color={"secondary"}
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </Button>
      <span>Preload: {preloadDetails ? "True" : "False"}</span>
      <Button
        variant="contained"
        className={classes.button}
        color={"primary"}
        onClick={() => dispatch(togglePreload())}
      >
        Toggle Preload
      </Button>
    </>
  );
}

export default Debug;
