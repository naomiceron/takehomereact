import React, { useState } from "react";
import "./App.css";
import Stack from "@mui/material/Stack";

import WidgetList from "./components/WidgetList";
import { Button, Typography } from "@mui/material";
import CreateWidget from "./components/CreateWidget";
import SingleWidget from "./components/SingleWidget";

const App = (): JSX.Element => {
  const [displayView, setDisplayView] = useState("");

  const openWidgetList = (view: string): void => {
    setDisplayView(view);
  };

  return (
    <Stack direction={"column"} spacing={3}>
      <Typography variant="h2" align="center">
        Take home challenge
      </Typography>
      <Stack spacing={2} direction="row" justifyContent="center">
        <Button
          id="WidgetList"
          variant="contained"
          color="primary"
          onClick={() => openWidgetList("WidgetList")}
          sx={{
            justifyContent: "center",
            display: "block",
            margin: "auto",
          }}
        >
          Widget List
        </Button>
        <Button
          id="SingleWidget"
          variant="contained"
          color="primary"
          onClick={() => openWidgetList("SingleWidget")}
          sx={{
            justifyContent: "center",
            display: "block",
            margin: "auto",
          }}
        >
          Single Widget
        </Button>
        <Button
          id="CreateWidget"
          variant="contained"
          color="primary"
          onClick={() => openWidgetList("CreateWidget")}
          sx={{
            justifyContent: "center",
            display: "block",
            margin: "auto",
          }}
        >
          Create Widget
        </Button>
        <Button
          id="UpdateWidget"
          variant="contained"
          color="primary"
          onClick={() => openWidgetList("UpdateWidget")}
          sx={{
            justifyContent: "center",
            display: "block",
            margin: "auto",
          }}
        >
          Update Widget
        </Button>
        <Button
          id="DeleteWidget"
          variant="contained"
          color="primary"
          onClick={() => openWidgetList("DeleteWidget")}
          sx={{
            justifyContent: "center",
            display: "block",
            margin: "auto",
          }}
        >
          Delete Widget
        </Button>
      </Stack>
      <Stack>
        {displayView === "WidgetList" && <WidgetList />}
        {displayView === "SingleWidget" && <SingleWidget />}
        {displayView === "CreateWidget" && <CreateWidget />}
        {displayView === "UpdateWidget" && <CreateWidget />}
        {displayView === "DeleteWidget" && <CreateWidget />}
      </Stack>
    </Stack>
  );
};

export default App;
