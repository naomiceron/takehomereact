import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { createWidget, Widget } from "../../lib/apiConnect";
import { Alert, Button, TextField } from "@mui/material";

const CreateWidget = (): JSX.Element => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [widgetResult, setWidgetResult] = useState<Widget>();
  const [widgetError, setWidgetError] = useState();

  const handleCreate = (name: string, description: string, price: number) => {
    const widget: Widget = {
      name: name,
      description: description,
      price: price,
    };
    createWidget(widget)
      .then((w) => {
        setWidgetResult(w);
        setWidgetError(undefined);
      })
      .catch((e) => {
        setWidgetError(e);
        setWidgetResult(undefined);
      });
  };

  return (
    <Stack
      spacing={4}
      sx={{ margin: "auto", maxWidth: 900, paddingTop: "4em", width: "100%" }}
    >
      <Typography sx={{ textAlign: "center" }} variant="h3">
        Create widget:
      </Typography>
      <Typography variant="body1">
        Please type in the name, description and price of the widget:
      </Typography>
      <Stack direction="row" spacing={2}>
        <Stack direction="column" spacing={4}>
          <TextField
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
            id="CreateWidget"
            variant="contained"
            color="primary"
            onClick={() => handleCreate(name, description, price)}
            sx={{
              display: "block",
              margin: "auto",
            }}
          >
            Create
          </Button>
        </Stack>
      </Stack>
      {widgetResult ? (
        <Alert severity="success">
          Widget created successfully! You can view it in the widget list.
        </Alert>
      ) : (
        <></>
      )}
      {widgetError ? (
        <Alert severity="error">
          Error creating widget. Please try again later.
        </Alert>
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default CreateWidget;
