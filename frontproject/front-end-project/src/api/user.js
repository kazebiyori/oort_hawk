import request from "@/utils/request";

// 返回数据格式
// {code:integer(0:error, 1:success), msg:string||null, data:object}

/**
 * 登陆
 * @param {userName:string, userPassword:string} data
 * @returns
 */
const login = (data) => {
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
const logout = () => {
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
const register = (data) => {
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
const query = (data) => {
  return request({
    url: `/user/${data.id}`,
    method: "get",
  });
};

/**
 * 更新
 * @param {id:string, userName, userPassword, intro, emial, phone} data
 * @returns
 */
const update = (data) => {
  return request({
    url: "/user",
    method: "put",
    data: data,
  });
};

/**
 * 删除
 * @param {id:number} data
 * @returns
 */
const del = (data) => {
  return request({
    url: `/user/${data.id}`,
    method: "delete",
  });
};

/**
 * 设置头像
 * let pic = new FormData();
 * pic.append("file", fs.createReadStream("filepath"));
 * @param {pic:FormData} data
 * @returns
 */
const setAvatar = (data) => {
  return request({
    url: "/user/setDefaultAvatar",
    method: "post",
    data: data,
  });
};

/**
 * 请求头像
 * @param {id:number} data
 * @returns
 */
const getAvatar = (data) => {
  return request({
    url: `/user/avatar${data.id}`,
    method: "get",
    data: data,
  });
};

export default {
  login,
  logout,
  register,
  query,
  update,
  del,
  setAvatar,
  getAvatar,
};
