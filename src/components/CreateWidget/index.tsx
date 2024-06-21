import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { createWidget, Widget } from "../../lib/apiConnect";
import { Alert, Button, TextField } from "@mui/material";

const CreateWidget = (): JSX.Element => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const [isValidName, setIsValidName] = useState(false);
  const [isValidDescription, setIsValidDescription] = useState(false);
  const [isValidPrice, setIsValidPrice] = useState(false);

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

  const validateName = (name: string) => {
    setIsValidName(name.length >= 3 && name.length <= 100);
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
    validateName(name);
  }, [name]);

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
        Create widget:
      </Typography>
      <Typography variant="body1">
        Please type in the name, description and price of the widget:
      </Typography>
      <Typography variant="body2">
        Note: Name should have at least 3 characters and at most 100 characters.
        Description should have at least 5 characters and at most 1000
        characters. Price should be between 1 and 20000 and have at most 2
        decimal places.
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
            disabled={!isValidName || !isValidDescription || !isValidPrice}
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
