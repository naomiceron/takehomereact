import { render, screen } from "@testing-library/react";

import CreateWidget from "./index";

describe("CreateWidget", () => {
  it("displays CreateWidget", async () => {
    render(<CreateWidget />);

    expect(screen.queryByText("Create widget:")).toBeInTheDocument();
  });
});
