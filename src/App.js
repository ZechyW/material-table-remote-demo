import { Container, makeStyles, MuiThemeProvider } from "@material-ui/core";
import React from "react";
import { muiTheme } from "./app/material-styles";
import Debug from "./features/debug/Debug";
import Table from "./features/table/Table";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(6),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Container maxWidth="xl" className={classes.root}>
        <Table preloadDetails />
        <Debug />
      </Container>
    </MuiThemeProvider>
  );
}

export default App;
