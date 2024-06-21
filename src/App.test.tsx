import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./components/WidgetList");

describe("App", () => {
  it("renders App", () => {
    render(<App />);
    expect(screen.getByText("Take home challenge")).toBeVisible();
  });
});
