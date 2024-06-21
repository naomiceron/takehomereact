import { render, screen } from "@testing-library/react";

import UpdateWidget from "./index";

describe("UpdateWidget", () => {
  it("displays UpdateWidget", async () => {
    render(<UpdateWidget />);

    expect(screen.queryByText("Update widget:")).toBeInTheDocument();
  });
});
