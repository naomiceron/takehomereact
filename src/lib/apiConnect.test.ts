import axios from "axios";
import { mocked } from "jest-mock";

import {
  createWidget,
  updateWidget,
  deleteWidget,
  fetchAllWidgets,
  fetchWidget,
  Widget,
} from "./apiConnect";

jest.mock("axios");

const widget: Widget = {
  description: "Keeps a diary",
  name: "Widget Jones",
  price: 9.95,
};

describe("fetchAllWidgets", () => {
  it("returns all widgets as response data", async () => {
    const widgetList: Widget[] = [
      { description: "Keeps a diary", name: "Widget Jones", price: 9.95 },
      {
        description: "Takes home a challenge",
        name: "Widget Naomi",
        price: 99.99,
      },
    ];
    mocked(axios).get.mockResolvedValueOnce({ data: widgetList });

    const result = await fetchAllWidgets();

    expect(result).toEqual(widgetList);
    expect(result.length).toEqual(widgetList.length);
  });

  it("errors on reject", async () => {
    mocked(axios).get.mockRejectedValueOnce({});

    expect(fetchAllWidgets()).rejects.toBeTruthy();
  });
});

describe("fetchWidget", () => {
  it("returns a widget as response data", async () => {
    mocked(axios).get.mockResolvedValueOnce({ data: widget });

    const result = await fetchWidget(widget.name);

    expect(result).toEqual(widget);
  });

  it("errors on reject", async () => {
    mocked(axios).get.mockRejectedValueOnce({});

    expect(fetchWidget("fakeName")).rejects.toBeTruthy();
  });
});

describe("createWidget", () => {
  it("should successfully create a widget", async () => {
    mocked(axios).post.mockResolvedValueOnce({ data: widget });

    const result = await createWidget(widget);

    expect(result).toEqual(widget);
  });

  it("should throw an error if widget creation fails", async () => {
    mocked(axios).post.mockRejectedValueOnce({});

    expect(createWidget(widget)).rejects.toBeTruthy();
  });
});

describe("updateWidget", () => {
  it("should successfully update a widget", async () => {
    mocked(axios).patch.mockResolvedValueOnce({ data: widget });

    const result = await updateWidget(widget);

    expect(result).toEqual(widget);
  });

  it("should throw an error if widget creation fails", async () => {
    mocked(axios).patch.mockRejectedValueOnce({});

    expect(updateWidget(widget)).rejects.toBeTruthy();
  });
});

describe("deleteWidget", () => {
  it("should successfully delete a widget", async () => {
    mocked(axios).delete.mockResolvedValueOnce({});

    const result = await deleteWidget(widget.name);

    expect(result).toEqual({});
  });

  it("should throw an error if widget creation fails", async () => {
    mocked(axios).delete.mockRejectedValueOnce({});

    expect(deleteWidget(widget.name)).rejects.toBeTruthy();
  });
});
