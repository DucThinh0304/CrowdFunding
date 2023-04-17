import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2Q3NWFiYmQwNzIyMjRjYjYzMzZjMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MTc1MzIyNCwiZXhwIjoxNjgyMDEyNDI0fQ.Cq1MKaxC-hWP8JB1ZvMK4gPmyX4e7dC8set2FAAqkF8";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
