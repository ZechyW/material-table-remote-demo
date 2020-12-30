/**
 * Worked example of using MaterialTable for loading remote data.
 */

import { makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import MaterialTable from "material-table";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tableIcons } from "../../app/material-icons";
import { decrement, increment } from "../debug/debugSlice";
import { DetailsPanel } from "./DetailsPanel";
import "./Table.css";
import {
  changePage,
  fetchDetailsById,
  togglePanelState,
  updateSeen,
} from "./tableSlice";

const useStyles = makeStyles((theme) => ({
  actionHeader: {
    width: "120px",
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

function Table() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const itemDetails = useSelector((state) => state.table.itemDetails);
  const openPanels = useSelector((state) => state.table.openPanels);

  // Prepare the table parameters
  const columns = [
    {
      title: "ID",
      field: "id",
      cellStyle: {
        width: "50px",
      },
      // This is a bit of an ugly workaround, but:
      // https://github.com/mbrn/material-table/issues/291
      width: null,
    },
    { title: "Name", field: "first_name" },
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

  // Give the details panel the ability to close itself
  const closeRowPanel = (rowId) => {
    if (!tableRef.current) {
      return;
    }

    tableRef.current.onToggleDetailPanel(
      [rowId],
      tableRef.current.props.detailPanel
    );
    dispatch(togglePanelState(rowId));
  };

  const handleTogglePanel = (rowData) => {
    const itemId = rowData.id;
    const rowId = rowData.tableData.id;

    const details = itemDetails[itemId];
    const isOpen = openPanels[rowId];

    if (!isOpen) {
      // The panel is currently closed, so we reload the data even if it was previously dropped.
      if (!details) {
        // Initial data load
        dispatch(fetchDetailsById(itemId));
      }

      if (details?.status === "Cached") {
        // The details for this item are in the cache; register a hit.
        dispatch(updateSeen(itemId));
      }
    }
  };

  return (
    <div className={"main-table"}>
      <MaterialTable
        tableRef={tableRef}
        icons={tableIcons}
        columns={columns}
        data={getData}
        title="Material-Table Remote Data Demo"
        detailPanel={(rowData) => (
          <DetailsPanel rowData={rowData} closeRowPanel={closeRowPanel} />
        )}
        onRowClick={(event, rowData, togglePanel) => {
          togglePanel();
          handleTogglePanel(rowData);
          dispatch(togglePanelState(rowData.tableData.id));
        }}
        onChangePage={() => {
          dispatch(changePage());
        }}
        options={{
          actionsCellStyle: {
            width: "120px",
            // display: "flex",
            justifyContent: "space-evenly",
          },
          actionsColumnIndex: -1,
          rowStyle: {},
          pageSize: 10,
        }}
        actions={[
          (rowData) => ({
            icon:
              rowData.label === "1" ? tableIcons.HamSet : tableIcons.HamUnset,
            tooltip: rowData.label === "1" ? "Marked as Ham" : "Mark as Ham",
            onClick: (event, rowData) => {
              if (rowData.label !== "1") {
                dispatch(increment());
              }
            },
          }),
          (rowData) => ({
            icon:
              rowData.label === "-1"
                ? tableIcons.SpamSet
                : tableIcons.SpamUnset,
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
            actions: (
              <div className={classes.actionHeader}>
                <div>Ham</div>
                <div>/</div>
                <div>Spam</div>
              </div>
            ),
          },
        }}
      />
    </div>
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
      // const response = await axios.post("https://xivapi.com/Achievement", {
      //   limit: query.pageSize,
      //   page: query.page + 1,
      // });

      // And process results
      // const {
      //   Results: data,
      //   Pagination: { Page: page, ResultsTotal: totalCount },
      // } = response.data;

      let url = "https://reqres.in/api/users?";
      url += "per_page=" + query.pageSize;
      url += "&page=" + (query.page + 1);

      const response = await axios.get(url);

      const { data, page, total } = response.data;

      resolve({
        data,
        page: page - 1,
        totalCount: total,
      });
    } catch (error) {
      reject(error);
    }
  });
}

export default Table;
