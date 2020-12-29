/**
 * Worked example of using MaterialTable for loading remote data.
 */

import { Typography } from "@material-ui/core";
import MaterialTable from "material-table";
import React from "react";
import { useDispatch } from "react-redux";
import { tableIcons } from "../../app/material-icons";
import { useStyles } from "../../app/material-styles";
import { decrement, increment } from "./tableSlice";

export function Table() {
  const classes = useStyles();
  const dispatch = useDispatch();

  // Prepare the table parameters
  const columns = [
    {
      title: "ID",
      field: "id",
      cellStyle: {
        width: "50px",
      },
      // This is a bit of an ugly workaround, but:
      //
      width: null,
    },
    { title: "Name", field: "name" },
    {
      title: "Status",
      field: "status",
      align: "center",
      cellStyle: {
        width: "120px",
      },
    },
    {
      title: "Prediction",
      field: "prediction",
      align: "center",
      cellStyle: {
        width: "120px",
      },
      render: (rowData) =>
        rowData.prediction > 50 ? (
          <Typography variant={"body2"} color={"primary"}>
            <b>{`${rowData.prediction}%`}</b>
          </Typography>
        ) : (
          <Typography variant={"body2"} color={"textSecondary"}>
            {`${rowData.prediction}%`}
          </Typography>
        ),
    },
  ];

  const tableData = [
    {
      id: "1",
      name: "Test",
      status: "Done",
      prediction: 0.5,
      label: 1,
      content: "Hello!",
    },
  ];

  return (
    <MaterialTable
      icons={tableIcons}
      columns={columns}
      data={tableData}
      title="Material-Table Remote Data Demo"
      detailPanel={(rowData) => {
        // Remove extraneous newlines, prepare to display using <br/>s
        // (React doesn't let us render strings as HTML directly by default)
        const textLines = rowData.content
          .replace(/(\s*\r?\n\r?){4,}/g, "\n\n\n")
          .split(/\r?\n\r?/);
        return (
          <div className={classes.detailView}>
            <Typography variant={"body2"} component={"div"}>
              {textLines.map((line, index) => (
                <div className={classes.wordOverflow} key={index}>
                  {line}
                  <br />
                </div>
              ))}
            </Typography>
          </div>
        );
      }}
      onRowClick={(event, rowData, togglePanel) => togglePanel()}
      options={{
        actionsCellStyle: {
          width: "120px",
          textAlign: "center",
        },
        actionsColumnIndex: -1,
        rowStyle: {},
        pageSize: 10,
      }}
      actions={[
        (rowData) => ({
          icon: rowData.label === "1" ? tableIcons.HamSet : tableIcons.HamUnset,
          tooltip: rowData.label === "1" ? "Marked as Ham" : "Mark as Ham",
          onClick: (event, rowData) => {
            if (rowData.label !== "1") {
              dispatch(increment());
            }
          },
        }),
        (rowData) => ({
          icon:
            rowData.label === "-1" ? tableIcons.SpamSet : tableIcons.SpamUnset,
          tooltip: rowData.label === "-1" ? "Marked as Spam" : "Mark as Spam",
          onClick: (event, rowData) => {
            if (rowData.label !== "-1") {
              dispatch(decrement());
            }
          },
        }),
      ]}
      localization={{
        header: {
          actions: "Ham / Spam",
        },
      }}
      // tableLayout={"fixed"}
    />
  );
}
