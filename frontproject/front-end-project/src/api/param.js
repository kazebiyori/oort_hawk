import request from "@/utils/request";

/**
 * 分页查询
 * @param {page:string, pageSize:string} data
 * @returns
 */
const getInfoByPage = (data) => {
  return request({
    url: `/dataInfo/page/${data.page}/${data.pageSize}`,
    method: "post",
    data: {
      rawFileName: "txt",
    },
  });
};

/**
 * 单条查询
 * @param {id:number} data
 * @returns
 */
const getInfo = (data) => {
  return request({
    url: `/dataInfo/${data.id}`,
    method: "get",
  });
};

/**
 * 数据查询
 * @param {id:string, key:string} data
 * @returns
 */
const getDataBySingle = (data) => {
  return request({
    url: `/dataInfo/queryDataOne/${data.id}/${data.key}`,
    method: "get",
  });
};

export default {
  getInfoByPage,
  getInfo,
  getDataBySingle,
};
