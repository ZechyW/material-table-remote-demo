/**
 * Simple worked example of using MaterialTable for loading remote data.
 */

import MaterialTable from "material-table";
import React from "react";
import { useSelector } from "react-redux";
import { tableIcons } from "../../app/material-icons";
import { selectCount } from "./tableSlice";
import { Typography } from "@material-ui/core";

export function Table() {
  const count = useSelector(selectCount);

  // Prepare the table parameters
  const columns = [
    {
      title: "ID",
      field: "id",
      width: "50px",
    },
    { title: "Subject", field: "subject" },
    {
      title: "Ham Probability",
      field: "prediction",
      width: "110px",
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
      customSort: (a, b) => a.prediction - b.prediction,
    },
  ];

  return (
    <MaterialTable
      icons={tableIcons}
      columns={[
        {
          title: "ID",
          field: "id",
          width: "50px",
        },
        { title: "Subject", field: "subject" },
        {
          title: "Ham Probability",
          field: "prediction",
          width: "110px",
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
          customSort: (a, b) => a.prediction - b.prediction,
        },
      ]}
      data={tableData}
      title="Spam Filter Demo"
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
          width: "130px",
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
              dispatch(setLabel(rowData.id, "ham"));
            }
          },
        }),
        (rowData) => ({
          icon:
            rowData.label === "-1" ? tableIcons.SpamSet : tableIcons.SpamUnset,
          tooltip: rowData.label === "-1" ? "Marked as Spam" : "Mark as Spam",
          onClick: (event, rowData) => {
            if (rowData.label !== "-1") {
              dispatch(setLabel(rowData.id, "spam"));
            }
          },
        }),
      ]}
      localization={{
        header: {
          actions: "Ham / Spam",
        },
      }}
    />
  );
}
