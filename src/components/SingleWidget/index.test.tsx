import { render, screen } from "@testing-library/react";

import SingleWidget from "./index";

describe("SingleWidget", () => {
  it("displays all widget information", async () => {
    render(<SingleWidget />);

    expect(screen.queryByText("Search for a widget:")).toBeInTheDocument();
  });
});
