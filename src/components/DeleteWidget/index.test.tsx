import React from "react";
import { render, waitFor } from "@testing-library/react";
import DeleteWidget from "./index";
import * as apiConnect from "../../lib/apiConnect";

jest.mock("../../lib/apiConnect");

describe("DeleteWidget", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("handles widget deletion on button click", async () => {
    const widgets = [
      { description: "Widget 1 description", name: "Widget 1", price: 10.99 },
      { description: "Widget 2 description", name: "Widget 2", price: 15.99 },
    ];
    (
      apiConnect.fetchAllWidgets as jest.MockedFunction<
        typeof apiConnect.fetchAllWidgets
      >
    ).mockResolvedValue(widgets);

    (
      apiConnect.deleteWidget as jest.MockedFunction<
        typeof apiConnect.deleteWidget
      >
    ).mockResolvedValue();

    render(<DeleteWidget />);

    await waitFor(() => {
      widgets.forEach((widget) => {
        expect(apiConnect.deleteWidget).not.toHaveBeenCalled();
        expect(document.body.textContent).toContain(widget.name);
      });

      apiConnect.deleteWidget(widgets[0].name);
    });

    await waitFor(() => {
      expect(apiConnect.deleteWidget).toHaveBeenCalledWith("Widget 1");
    });
  });
});
