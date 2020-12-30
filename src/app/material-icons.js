/**
 * Material UI: Icons for the Table component
 */

import {
  ArrowDownward,
  CheckBox,
  ChevronLeft,
  ChevronRight,
  Clear,
  Delete,
  FirstPage,
  LastPage,
  Replay,
  Search,
} from "@material-ui/icons";
import React, { forwardRef } from "react";

export const tableIcons = {
  // Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  // Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  // Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  // Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  // Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  // Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  // Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  // ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  // ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),

  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  Retry: forwardRef((props, ref) => <Replay {...props} ref={ref} />),

  SpamUnset: forwardRef((props, ref) => (
    <Delete color={"disabled"} {...props} ref={ref} />
  )),
  SpamSet: forwardRef((props, ref) => (
    <Delete color={"primary"} {...props} ref={ref} />
  )),
  HamUnset: forwardRef((props, ref) => (
    <CheckBox color={"disabled"} {...props} ref={ref} />
  )),
  HamSet: forwardRef((props, ref) => (
    <CheckBox color={"primary"} {...props} ref={ref} />
  )),
};
