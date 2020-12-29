import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveDetails, updateSeen } from "./detailsSlice";

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
 * @property rowData.ID
 * @param tableRef
 * @returns {JSX.Element}
 */
export function DetailsPanel({ rowData, tableRef }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.details.items[rowData.ID]);

  useEffect(() => {
    console.log([rowData.ID, details, dispatch]);
    if (details === undefined) {
      // The details for this item are either new or have been dropped from the cache; hit the API again.
      // When this hook gets called again with the new details, we will automatically call `updateSeen()` below.
      (async () => {
        const response = await axios.post(
          `https://xivapi.com/Achievement/${rowData.ID}`
        );
        const { Icon, Name, Description } = response.data;

        dispatch(
          saveDetails({
            ID: rowData.ID,
            Icon,
            Name,
            Description,
          })
        );
      })();
    } else if (details === "Dropped") {
      // const rowId = tableRef.current.dataManager.data.findIndex(
      //   (item) => item.ID === rowData.ID
      // );
      // const rowData = tableRef.current.dataManager.data[rowId];
      // if (rowData && rowData.tableData.showDetailPanel !== undefined) {
      //   tableRef.current.onToggleDetailPanel(
      //     [rowId],
      //     tableRef.current.props.detailPanel
      //   );
      // }
    } else {
      // The details for this item are still in the cache; register a hit.
      dispatch(
        updateSeen({
          ID: rowData.ID,
        })
      );
    }
  }, [rowData.ID, details, dispatch]);

  // Remove extraneous newlines, prepare to display using <br/>s
  // (React doesn't let us render strings as HTML directly by default)
  let content = "Loading...";
  let iconSrc = "/apple-touch-icon.png";
  if (details !== undefined) {
    content = `${details.Description}
 
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer purus justo, dignissim ut efficitur sit amet, mollis quis libero. Vivamus quis magna volutpat, commodo elit id, aliquet massa. Quisque congue felis eget diam ultricies, ultricies suscipit felis aliquam. Integer ullamcorper volutpat semper. Curabitur a mauris ornare, facilisis odio eget, mollis elit. Nam molestie erat ac quam scelerisque iaculis. Quisque ac felis auctor, viverra orci eget, dignissim metus.
`;
    iconSrc = `https://xivapi.com${details.Icon}`;
  }
  const textLines = content
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
          <CardMedia
            className={classes.cardIcon}
            image={iconSrc}
            title={"Icon"}
          />
        </Card>
      </Grid>
    </Grid>
  );
}
