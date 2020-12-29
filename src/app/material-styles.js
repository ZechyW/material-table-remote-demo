/**
 * Material UI: Utility classes
 */

// https://stackoverflow.com/questions/61220424/material-ui-drawer-finddomnode-is-deprecated-in-strictmode
import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";
import { blue, teal } from "@material-ui/core/colors";

export const muiTheme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: teal,
  },
  typography: {
    fontSize: 14,
  },
});
