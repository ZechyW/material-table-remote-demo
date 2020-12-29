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
    if (details === undefined) {
      // The details for this item are either new or have been dropped from the cache; hit the API again.
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
      // console.log(rowData.showDetailPanel.toString());
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

Quisque gravida rhoncus erat, eu sagittis nisi interdum vel. Fusce ut dui mattis, semper nunc sit amet, consectetur ligula. Nulla maximus dapibus purus at condimentum. Integer cursus suscipit urna at porttitor. Curabitur facilisis lectus nec urna commodo, pulvinar aliquam erat maximus. Integer placerat mauris et libero porta, eget tincidunt leo pulvinar. Cras elit massa, imperdiet vitae eros sit amet, ullamcorper lacinia ex.

Cras sed erat bibendum, hendrerit nibh at, porttitor dolor. Aliquam facilisis facilisis dui eu mattis. Curabitur lobortis mi velit, eu fringilla eros consequat non. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lobortis arcu hendrerit felis pulvinar, ultricies elementum sem feugiat. Etiam aliquet, lacus ac egestas luctus, justo turpis ultricies leo, id mollis massa purus a felis. Nunc viverra mattis pellentesque. Curabitur non faucibus lectus, sit amet cursus neque. Ut cursus, orci et tempus vulputate, tellus mi consectetur nibh, eget gravida eros elit quis urna. Sed nisi orci, egestas vitae sem vitae, dapibus egestas lacus. Suspendisse faucibus augue ac blandit tincidunt. Etiam posuere rutrum leo eu mollis.

Proin dui dui, dapibus ac velit vel, porttitor consectetur velit. Nullam ac sodales magna, in aliquam elit. Phasellus ultricies justo ac lacus finibus consectetur. Nam eget nunc odio. Cras accumsan suscipit nibh, ut sagittis ante pellentesque vitae. Nunc ac dolor ante. Pellentesque dignissim tempor mi non blandit. Maecenas interdum nisl in interdum mollis. Aenean eget rhoncus leo.

Donec vel magna eget orci accumsan sollicitudin a at sem. Sed ut viverra dolor, ac eleifend justo. Donec at eros est. Donec euismod nunc ac ligula mattis, eu tempus massa aliquam. Donec at nulla nibh. Donec quis elementum quam, aliquet dictum arcu. Nullam posuere magna vestibulum dui lobortis finibus. Sed nisi metus, ultricies sit amet sodales sit amet, elementum sit amet ex. Fusce efficitur, ligula et malesuada facilisis, velit risus accumsan purus, eget condimentum elit arcu in ligula. Etiam et consectetur dui, non euismod eros. Morbi aliquam id felis vel auctor. Pellentesque dictum, turpis et aliquam sagittis, dolor mi dapibus nibh, vel congue tellus nisl aliquet massa. Donec vitae ipsum sed elit bibendum scelerisque non pretium dui.`;
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
