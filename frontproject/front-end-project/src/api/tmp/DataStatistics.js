import request from "@/utils/request";

export const fetchDataStatistics = () => {
  return request({
    url: "/statistics",
    method: "get",
  });
};
