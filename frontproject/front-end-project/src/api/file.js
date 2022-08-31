import request from "@/utils/request";

/**
 * 上传文件
 * let files = new FormData();
 * files.append("files", fs.createReadStream("filepath"));
 * @param {files:formdata, id:number} data
 * @returns
 */
const upload = (data) => {
  return request({
    url: `/file/upload/${data.id}`,
    method: "post",
    data: data,
  });
};

export default {
  upload,
};
