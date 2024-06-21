import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Widget, fetchWidget } from "../../lib/apiConnect";
import WidgetDisplay from "../WidgetDisplay";

const SingleWidget = (): JSX.Element => {
  const [widgetResult, setWidgetResult] = useState<Widget>();
  const [widgetError, setWidgetError] = useState();
  const [searchBy, setSearchBy] = useState("");

  const handleSearch = () => {
    fetchWidget(searchBy)
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
        Search for a widget:
      </Typography>
      <Typography variant="body1">
        Please type in the name of the widget you want to search for:
      </Typography>
      <Stack direction="row" spacing={2}>
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
          sx={{
            height: "40px",
            width: "200px",
          }}
        ></TextField>
        <Button
          id="SearchWidget"
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{
            display: "block",
            margin: "auto",
          }}
        >
          Search
        </Button>
      </Stack>
      {widgetResult ? <WidgetDisplay widget={widgetResult} /> : <></>}
      {widgetError ? <Box> Sorry, that widget doesn't exist </Box> : <></>}
    </Stack>
  );
};

export default SingleWidget;
