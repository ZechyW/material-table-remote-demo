/**
 * Worked example of using MaterialTable for loading remote data.
 */

import { makeStyles, Typography } from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tableIcons } from "../../app/material-icons";
import { decrement, increment } from "../debug/debugSlice";
import { DetailsPanel } from "./DetailsPanel";
import "./Table.css";
import {
  fetchDetailsById,
  getDataPage,
  processNewPage,
  registerItemHit,
  setPageSize,
  setPanelStateAllClosed,
  setPanelStateClosed,
  setPanelStateOpen,
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
  const items = useSelector((state) => state.table.items);
  const openPanels = useSelector((state) => state.table.openPanels);
  const currentPageSize = useSelector((state) => state.table.pageSize);

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

  // Utility functions
  // -----------------
  // Give the details panel the ability to close itself
  const closeRowPanel = (rowData) => {
    const rowId = rowData.tableData.id;
    const isOpen = rowData.tableData.showDetailPanel;

    // Sanity check -- Because material-table's imperative function is a toggle, we make sure the panel is actually
    // open before calling it.
    if (isOpen) {
      tableRef.current.onToggleDetailPanel(
        [rowId],
        tableRef.current.props.detailPanel
      );
    }

    // And update our internal panel monitor
    dispatch(setPanelStateClosed(rowId));
  };

  // Material-table's detail panel is toggled imperatively, so we need a little workaround to monitor which panels
  // are open and control panel state.
  const handleTogglePanel = (rowData, togglePanel) => {
    const itemId = rowData.id;
    const rowId = rowData.tableData.id;

    const details = items[itemId];
    const isOpenState = openPanels.indexOf(rowId) > -1;
    const isOpen = rowData.tableData.showDetailPanel;

    if (!isOpenState) {
      // Internally, the panel was closed, and it is now being opened by rowClick.

      // Reload the data if necessary, or register a hit if the details are still cached.
      if (!details) {
        dispatch(registerItemHit(itemId));
        dispatch(fetchDetailsById(itemId));
      } else if (details.status === "Cached") {
        dispatch(registerItemHit(itemId));
      }

      // If the panel is not actually open, toggle it imperatively...
      if (!isOpen) {
        togglePanel();
      }

      // ... And update our internal panel monitor.
      dispatch(setPanelStateOpen(rowData.tableData.id));
    } else {
      // Internally, the panel was open, and it is now being closed by rowClick.
      if (isOpen) {
        togglePanel();
      }
      dispatch(setPanelStateClosed(rowData.tableData.id));
    }
  };

  return (
    <div className={"main-table"}>
      <MaterialTable
        tableRef={tableRef}
        icons={tableIcons}
        columns={columns}
        data={async (query) => {
          // Retrieve the remote data, but also let our store know that a new page is incoming.
          const dataPromise = getDataPage(query);
          dispatch(processNewPage(dataPromise));
          return dataPromise;
        }}
        title="Material-Table Remote Data Demo"
        detailPanel={(rowData) => (
          <DetailsPanel rowData={rowData} closeRowPanel={closeRowPanel} />
        )}
        onRowClick={(event, rowData, togglePanel) => {
          handleTogglePanel(rowData, togglePanel);
        }}
        onChangePage={(_, pageSize) => {
          dispatch(setPanelStateAllClosed());
          dispatch(setPageSize(pageSize));
        }}
        options={{
          actionsCellStyle: {
            width: "120px",
            // display: "flex",
            justifyContent: "space-evenly",
          },
          actionsColumnIndex: -1,
          rowStyle: {},
          pageSize: currentPageSize,
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

export default Table;
