import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  panelRoot: {
    backgroundColor: theme.palette.grey["50"],
    maxHeight: "300px",
    overflowY: "scroll",
    padding: theme.spacing(2),
  },
  cardRoot: {
    display: "flex",
    alignItems: "center",
  },
  cardContent: {
    flex: "1 1 auto",
  },
  cardText: {
    overflowWrap: "break-word",
  },
  cardIcon: {
    flex: "1 0 auto",
    width: 80,
    height: 80,
    maxHeight: 80,
    maxWidth: 80,
    margin: theme.spacing(1),
  },
}));

/**
 * Renders the Details panel for a given table row
 *
 * @param rowData
 * @property rowData.id
 * @param tableRef
 * @returns {JSX.Element}
 */
export function DetailsPanel({ rowData, closeRowPanel }) {
  const itemId = rowData.id;
  const rowId = rowData.tableData.id;

  const classes = useStyles();
  const details = useSelector((state) => state.table.items[itemId]);
  const isOpenState = useSelector(
    (state) => state.table.openPanels.indexOf(rowId) > -1
  );

  useEffect(() => {
    if (!details || !isOpenState) {
      // The panel is due for rendering, but it either has no contents (they were probably dropped from the LRU
      // cache) or there are too many panels open.
      closeRowPanel(rowData);
    }
  });

  let description = "Loading...";
  let icon = "/apple-touch-icon.png";
  if (details?.status === "Cached") {
    description = details.description;
    icon = details.icon;
  }

  // Remove extraneous newlines, prepare to display using <br/>s
  // (React doesn't let us render strings as HTML directly by default)
  const textLines = description
    .replace(/(\s*\r?\n\r?){4,}/g, "\n\n\n")
    .split(/\r?\n\r?/);
  return (
    <Grid container justify="center" className={classes.panelRoot}>
      <Grid item xs={12}>
        <Card className={classes.cardRoot}>
          <CardContent className={classes.cardContent}>
            <Typography variant={"body2"} component={"div"}>
              {textLines.map((line, index) => (
                <div className={classes.cardText} key={index}>
                  {line}
                  <br />
                </div>
              ))}
            </Typography>
          </CardContent>
          <CardMedia className={classes.cardIcon} image={icon} title={"Icon"} />
        </Card>
      </Grid>
    </Grid>
  );
}
