import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import SingleWidget from "./index";
import * as apiConnect from "../../lib/apiConnect";

jest.mock("../../lib/apiConnect");

describe("SingleWidget", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("displays all widget information", async () => {
    render(<SingleWidget />);

    expect(screen.queryByText("Search for a widget:")).toBeInTheDocument();
  });

  it("displays widget information on successful search", async () => {
    const widget = {
      description: "Test Widget",
      name: "Test Widget Name",
      price: 10.99,
    };

    (
      apiConnect.fetchWidget as jest.MockedFunction<
        typeof apiConnect.fetchWidget
      >
    ).mockResolvedValue(widget);

    const { getByLabelText, getByRole, getByText } = render(<SingleWidget />);

    fireEvent.change(getByLabelText("Search"), {
      target: { value: "Test Widget Name" },
    });
    fireEvent.click(getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(apiConnect.fetchWidget).toHaveBeenCalledWith("Test Widget Name");
      expect(getByText(widget.description)).toBeInTheDocument();
      expect(getByText(`$${widget.price}`)).toBeInTheDocument();
    });
  });

  it("displays error message when widget is not found", async () => {
    const errorMessage = "Widget not found";
    (
      apiConnect.fetchWidget as jest.MockedFunction<
        typeof apiConnect.fetchWidget
      >
    ).mockRejectedValue(new Error(errorMessage));

    const { getByLabelText, getByRole, getByText } = render(<SingleWidget />);

    fireEvent.change(getByLabelText("Search"), {
      target: { value: "Non-existent Widget" },
    });
    fireEvent.click(getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(apiConnect.fetchWidget).toHaveBeenCalledWith(
        "Non-existent Widget"
      );
      expect(getByText("Sorry, that widget doesn't exist")).toBeInTheDocument();
    });
  });
});
