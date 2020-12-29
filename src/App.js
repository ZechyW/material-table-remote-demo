import { Container, MuiThemeProvider } from "@material-ui/core";
import React from "react";
import { muiTheme, useStyles } from "./app/material-styles";
import Debug from "./Debug";
import { Table } from "./features/table/Table";

function App() {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Container maxWidth="lg" className={classes.topSpace}>
        <Table />
        <Debug />
      </Container>
    </MuiThemeProvider>
  );
}

export default App;
