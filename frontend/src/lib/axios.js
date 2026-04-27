import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/", // update before deployment
  // send cookies with every request
  withCredentials: true,
});
