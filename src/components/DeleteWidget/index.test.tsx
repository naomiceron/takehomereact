import { render, screen } from "@testing-library/react";

import DeleteWidget from "./index";

describe("DeleteWidget", () => {
  it("displays delete widgets", async () => {
    render(<DeleteWidget />);

    expect(screen.getByText("Delete widgets:")).toBeInTheDocument();
  });
});
