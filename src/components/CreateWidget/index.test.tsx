import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CreateWidget from "./index";

describe("CreateWidget component", () => {
  it("renders all input fields correctly", () => {
    render(<CreateWidget />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Price")).toBeInTheDocument();
  });

  it("disables create button when inputs are invalid", () => {
    render(<CreateWidget />);

    const createButton = screen.getByRole("button", { name: "Create" });

    expect(createButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "ab" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "abc" },
    });
    fireEvent.change(screen.getByLabelText("Price"), {
      target: { value: "0" },
    });

    expect(createButton).toBeDisabled();
  });
});
