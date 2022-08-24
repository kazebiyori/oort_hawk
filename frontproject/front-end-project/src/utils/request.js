import axios from "axios";

/**
 * axios实现http操作
 */
const service = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 5000,
});

export default service;
