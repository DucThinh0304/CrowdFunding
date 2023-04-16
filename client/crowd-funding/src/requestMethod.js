import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjMxMDQ3MzRlMzdlMzdiMzljMjhjYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MTQ2MzM1OCwiZXhwIjoxNjgxNzIyNTU4fQ.bi82tyjuyIsw6Hdxjaayi5OVvaSIIdmdzW8tQCKM5zM";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
