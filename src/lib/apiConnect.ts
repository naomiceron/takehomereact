import axios from "axios";

const BASE_URL = "http://localhost:9000";

export interface Widget {
  description: string;
  name: string;
  price: number;
}

export const fetchAllWidgets = (): Promise<Widget[]> =>
  axios.get(`${BASE_URL}/v1/widgets`).then((response) => response.data);

export const fetchWidget = (name: string): Promise<Widget> =>
  axios.get(`${BASE_URL}/v1/widgets/${name}`).then((response) => response.data);

export const createWidget = (widget: Widget): Promise<Widget> =>
  axios
    .post(`${BASE_URL}/v1/widgets`, widget)
    .then((response) => response.data);

export const updateWidget = (widget: Widget): Promise<Widget> =>
  axios
    .patch(`${BASE_URL}/v1/widgets`, widget)
    .then((response) => response.data);

export const deleteWidget = (id: string): Promise<void> =>
  axios.delete(`${BASE_URL}/v1/widgets/${id}`);
