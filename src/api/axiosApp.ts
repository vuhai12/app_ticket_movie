import axios from "axios";

export const axiosApp = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
  },
});
