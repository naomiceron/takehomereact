import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import DisplayWidget from "../WidgetDisplay";
import { fetchAllWidgets, deleteWidget, Widget } from "../../lib/apiConnect";

const DeleteWidget = (): JSX.Element => {
  const [widgets, setWidgets] = useState<Widget[]>([]);

  useEffect(() => {
    fetchAllWidgets()
      .then(setWidgets)
      .catch((error) => console.error("Error fetching widgets", error));
  }, []);

  const handleDelete = (name: string): void => {
    deleteWidget(name)
      .then(() => {
        setWidgets((prevWidgets) =>
          prevWidgets.filter((widget) => widget.name !== name)
        );
      })
      .catch((error) => console.error("Error deleting widget", error));
  };
  //TODO. Would like to add a modal o confirm the deletion of the widget
  return (
    <Stack
      spacing={4}
      sx={{ margin: "auto", maxWidth: 900, paddingTop: "4em", width: "100%" }}
    >
      <Typography sx={{ textAlign: "center" }} variant="h3">
        Delete widgets:
      </Typography>
      <Grid
        container
        justifyContent="center"
        spacing={4}
        sx={{ paddingRight: 4, width: "100%" }}
      >
        {widgets.map((current, index) => (
          <Grid item xs={12} sm={6} md={4} lg={6} key={index}>
            <Box sx={{ width: "100%" }}>
              <DisplayWidget widget={current} />
              <Button
                id="DeleteWidget"
                variant="contained"
                color="error"
                onClick={() => handleDelete(current.name)}
                sx={{ marginTop: "1em", width: "100%" }}
              >
                Delete
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default DeleteWidget;
