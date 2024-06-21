import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

import DisplayWidget from "../WidgetDisplay";
import { fetchAllWidgets, updateWidget, Widget } from "../../lib/apiConnect";

const UpdateWidget = (): JSX.Element => {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const [isValidDescription, setIsValidDescription] = useState(false);
  const [isValidPrice, setIsValidPrice] = useState(false);

  const [widgetResult, setWidgetResult] = useState<Widget | undefined>();
  const [widgetError, setWidgetError] = useState<any>();

  useEffect(() => {
    fetchAllWidgets()
      .then(setWidgets)
      .catch((error) => console.error("Error fetching widgets", error));
  }, []);

  const handleUpdate = (widget: Widget): void => {
    setSelectedWidget(widget);
    setName(widget.name);
    setDescription(widget.description);
    setPrice(widget.price);
  };

  const handleSaveChanges = (): void => {
    if (!selectedWidget) return;

    const updatedWidget: Widget = {
      ...selectedWidget,
      name: name,
      description: description,
      price: price,
    };

    updateWidget(updatedWidget)
      .then((updated) => {
        setWidgetResult(updated);
        setWidgetError(undefined);
        setWidgets((prevWidgets) =>
          prevWidgets.map((w) => (w.name === updated.name ? updated : w))
        );
        setSelectedWidget(null);
      })
      .catch((error) => {
        setWidgetError(error);
        setWidgetResult(undefined);
      });
  };

  const validateDescription = (description: string) => {
    setIsValidDescription(
      description.length >= 5 && description.length <= 1000
    );
  };

  const validatePrice = (price: number) => {
    const isValid =
      price >= 1 &&
      price <= 20000 &&
      /^\d+(\.\d{1,2})?$/.test(price.toString());
    setIsValidPrice(isValid);
  };

  useEffect(() => {
    validateDescription(description);
  }, [description]);

  useEffect(() => {
    validatePrice(price);
  }, [price]);

  return (
    <Stack
      spacing={4}
      sx={{ margin: "auto", maxWidth: 900, paddingTop: "4em", width: "100%" }}
    >
      <Typography sx={{ textAlign: "center" }} variant="h3">
        Update widget:
      </Typography>
      <Typography variant="body1">Please select a widget to update:</Typography>
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
                id="UpdateWidget"
                variant="contained"
                color="secondary"
                onClick={() => handleUpdate(current)}
                sx={{ marginTop: "1em", width: "100%" }}
              >
                Update
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      {selectedWidget && (
        <>
          <Typography variant="body2">
            Note: Name can't be modified. Description should have at least 5
            characters and at most 1000 characters. Price should be between 1
            and 20000 and have at most 2 decimal places.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Stack direction="column" spacing={4}>
              <TextField
                disabled
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  height: "40px",
                  width: "200px",
                }}
              />
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                sx={{
                  height: "40px",
                  width: "200px",
                }}
              />
              <TextField
                id="outlined-basic"
                label="Price"
                variant="outlined"
                onChange={(e) => setPrice(Number(e.target.value))}
                value={price}
                type="number"
                sx={{
                  height: "40px",
                  width: "200px",
                }}
              />
              <Button
                id="SaveUpdateWidget"
                variant="contained"
                color="primary"
                disabled={!isValidDescription || !isValidPrice}
                onClick={() => handleSaveChanges()}
                sx={{
                  display: "block",
                  margin: "auto",
                }}
              >
                Save Changes
              </Button>
            </Stack>
          </Stack>
        </>
      )}

      {widgetResult && (
        <Alert severity="success">Widget updated successfully!</Alert>
      )}
      {widgetError && (
        <Alert severity="error">
          Error updating widget. Please try again later.
        </Alert>
      )}
    </Stack>
  );
};

export default UpdateWidget;
