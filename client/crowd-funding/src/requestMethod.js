import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2VkNDVlMzQzYTViNDRjZDhjYTg5MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MTg0MDk1NywiZXhwIjoxNjgyMTAwMTU3fQ.YjpQxpVKeYdzPMb6D1_rXFqHneM5NbGmirAj6YDxuFw";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
