import axios from "axios";

const service = axios.create({
  baseURL: "http://43.138.82.31:8081",
  timeout: 5000,
  withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  //   Accept: "*/*",
  //   // Connection: "keep-alive",
  // },
});

// 后端使用data.code区分业务错误
// 因此，为了统一处理错误，当网络错误和业务错误出现时，rejct promise，在catch中统一处理问题
service.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // 如果code为0，则说明业务逻辑出现问题
    if (response.data.code == 0) {
      return Promise.reject(response.data);
    }
    // code为1，业务逻辑正确
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default service;
