import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/", // update before deployment
  // send cookies with every request
  withCredentials: true,
});
