/**
 * Worked example of using MaterialTable for loading remote data.
 */

import { Typography } from "@material-ui/core";
import axios from "axios";
import MaterialTable from "material-table";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { tableIcons } from "../../app/material-icons";
import { DetailsPanel } from "./DetailsPanel";
import { decrement, increment } from "./tableSlice";

export function Table() {
  const dispatch = useDispatch();
  const tableRef = useRef(null);

  // Prepare the table parameters
  const columns = [
    {
      title: "ID",
      field: "ID",
      cellStyle: {
        width: "50px",
      },
      // This is a bit of an ugly workaround, but:
      // https://github.com/mbrn/material-table/issues/291
      width: null,
    },
    { title: "Name", field: "Name" },
    {
      title: "Status",
      field: "status",
      align: "center",
      cellStyle: {
        width: "120px",
      },
      render: (rowData) => <span>[Debug]</span>,
    },
    {
      title: "Prediction",
      field: "prediction",
      align: "center",
      cellStyle: {
        width: "120px",
      },
      render: (rowData) => {
        rowData.prediction = (Math.random() * 100).toFixed(2);
        return rowData.prediction > 50 ? (
          <Typography variant={"body2"} color={"primary"}>
            <b>{`${rowData.prediction}%`}</b>
          </Typography>
        ) : (
          <Typography variant={"body2"} color={"textSecondary"}>
            {`${rowData.prediction}%`}
          </Typography>
        );
      },
    },
  ];

  return (
    <MaterialTable
      tableRef={tableRef}
      icons={tableIcons}
      columns={columns}
      data={getData}
      title="Material-Table Remote Data Demo"
      detailPanel={(rowData) => (
        <DetailsPanel rowData={rowData} tableRef={tableRef} />
      )}
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
    />
  );
}

/**
 * Fetches a page of remote data
 *
 * @param query
 * @returns {Promise<Object>}
 */
function getData(query) {
  return new Promise(async (resolve, reject) => {
    try {
      // API call
      const response = await axios.post("https://xivapi.com/Achievement", {
        page: query.page + 1,
      });

      // And process results
      const {
        Results: data,
        Pagination: { Page: page, ResultsTotal: totalCount },
      } = response.data;

      resolve({
        data,
        page: page - 1,
        totalCount,
      });
    } catch (error) {
      reject(error);
    }
  });
}

export default Table;
