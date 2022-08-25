import request from "@/utils/request";
import FormData from "form-data";

/**
 * 登陆
 * @param {userName:string, userPassword:string} data
 * @returns
 */
export const login = (data) => {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
};

/**
 * 登出
 * @returns
 */
export const logout = () => {
  return request({
    url: "/user/logout",
    method: "post",
  });
};

/**
 * 注册
 * @param {userName:string, userPassword:string} data
 * @returns
 */
export const register = (data) => {
  return request({
    url: "/user",
    method: "post",
    data,
  });
};

/**
 * 查询
 * @param {id:number} data
 * @returns
 */
export const query = (data) => {
  return request({
    url: `/user/${data.id}`,
    method: "get",
  });
};

/**
 * 更新
 */
export const update = () => {
  return request({
    url: "/user",
    method: "put",
  });
};

/**
 * 删除
 * @param {id:number} data
 * @returns
 */
export const del = (data) => {
  return request({
    url: `/user/${data.id}`,
    method: "delete",
  });
};
