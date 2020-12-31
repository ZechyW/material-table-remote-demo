/**
 * Worked example of using MaterialTable for loading remote data.
 */

import { makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import MaterialTable from "material-table";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tableIcons } from "../../app/material-icons";
import { decrement, increment } from "../debug/debugSlice";
import { DetailsPanel } from "./DetailsPanel";
import "./Table.css";
import {
  changePage,
  fetchDetailsById,
  registerItemHit,
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

function Table({ preloadDetails }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const items = useSelector((state) => state.table.items);
  const openPanels = useSelector((state) => state.table.openPanels);

  // When the page is changed, the list of open row panels is reset, which triggers the selector above and causes
  // the component to re-render; we keep a record of the current page size so that we can re-render with the
  // appropriate number of rows.
  const [currentPageSize, setCurrentPageSize] = useState(10);

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
  const getData = (query) =>
    new Promise(async (resolve, reject) => {
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

        // If enabled, asynchronously pre-fetch the details for all the items on this page.
        if (preloadDetails) {
          new Promise(async () => {
            for (const row of data) {
              const itemId = row.id;
              if (!items[itemId]) {
                dispatch(fetchDetailsById(itemId));
                // Let's proactively rate-limit ourselves to not crash the API
                await new Promise((resolve) => setTimeout(resolve, 125));
              }
            }
          });
        }

        resolve({
          data,
          page: page - 1,
          totalCount: total,
        });
      } catch (error) {
        reject(error);
      }
    });

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
        data={getData}
        title="Material-Table Remote Data Demo"
        detailPanel={(rowData) => (
          <DetailsPanel rowData={rowData} closeRowPanel={closeRowPanel} />
        )}
        onRowClick={(event, rowData, togglePanel) => {
          handleTogglePanel(rowData, togglePanel);
        }}
        onChangePage={(_, pageSize) => {
          setCurrentPageSize(pageSize);
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
