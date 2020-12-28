import { Button, Container, MuiThemeProvider } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { muiTheme, useStyles } from "./app/material-styles";
import { Table } from "./features/table/Table";
import { decrement, increment } from "./features/table/tableSlice";

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Container maxWidth="lg" className={classes.topSpace}>
        <Table />
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
      </Container>
    </MuiThemeProvider>
  );
}

export default App;
