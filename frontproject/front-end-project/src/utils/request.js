import axios from "axios";
import { ElMessage } from "element-plus";

const service = axios.create({
  baseURL: "http://43.138.82.31:8081",
  // baseURL: "http://127.0.0.1:4523/m1/1485342-0-default", //本地mock测试
  timeout: 10000,
  withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  //   Accept: "*/*",
  //   // Connection: "keep-alive",
  // },
});

// 重新请求函数
function tautology(err) {
  let back = new Promise(function (resolve) {
    console.log("接口" + err.config.url + "请求失败，重新请求");
    resolve();
  });
  return back.then(function () {
    return service(err.config);
  });
}

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
    // setTimeout(() => {
    //   tautology(error);
    // }, 1000);

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default service;
