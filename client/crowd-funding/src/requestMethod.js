import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// console.log(user);
const currentUser = user && JSON.parse(user).currentUser;
// console.log(currentUser);
const TOKEN = currentUser?.accessToken;
// console.log(TOKEN);

// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
//   .currentUser.accessToken;

// const TOKEN = JSON.parse(
//   JSON.parse(localStorage.getItem("persist:root"))?.user || "{}"
// )?.currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
