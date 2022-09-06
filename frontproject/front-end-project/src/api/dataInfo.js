import request from "@/utils/request";

/**
 * 查询飞机型号
 * @param
 * @returns [
        "J20",
        "J10",
        "J15"
    ]
 */
const getPlaneType = () => {
  return request({
    url: `/dataInfo/listPlaneModel`,
    method: "get",
  });
};

/**
 *
 * @param {planeModel:stirng("J20")} data
 * @returns ["J20-001"]
 */
const getPlaneNumber = (data) => {
  return request({
    url: `/dataInfo/listPlaneID/${data.planeModel}`,
    method: "get",
  });
};

/**
 *
 * @param {planeModel:string(J20), planeID:string(J20-001)} data
 * @returns [
        {
            "id": "0",
            "rawFileName": "20220821090736.txt"
        },
        {
            "id": "1565538718855561217",
            "rawFileName": "20220815090522.txt"
        }
    ]
 */
const getParamID = (data) => {
  return request({
    url: `/dataInfo/listDataInfo/${data.planeModel}/${data.planeID}`,
    method: "get",
  });
};

/**
 * 
 * @param {id:string} data 
 * @returns {
        "id": "0",
        "dataId": "1565538716234121217",
        "interpretationId": "0",
        "testTimeStart": "2022-08-21 09:07:36",
        "testTimeEnd": "2022-08-21 09:24:16",
        "testDuration": 1000,
        "planeModel": "J20",
        "planeId": "J20-001",
        "engineQuantity": "S",
        "engine1Model": "WS10B",
        "engine1Id": "",
        "engine2Model": "WS10C",
        "engine2Id": "",
        "testType": "落叶飘",
        "rawFileName": "20220821090736.txt",
        "brief": "",
        "revision": 1,
        "createdBy": null,
        "createdTime": "2022-09-02 11:14:51",
        "updatedBy": null,
        "updatedTime": "2022-09-02 11:14:51"
    }
 */
const getParamInfoSingle = (data) => {
  return request({
    url: `/dataInfo/${data.id}`,
    method: "get",
  });
};

/**
 *
 * @param {planeModel:string, planeId} data
 * @returns
 */
const getParamInfoList = (data) => {
  return request({
    url: `/dataInfo/list`,
    method: "post",
    data,
  });
};

export default {
  getPlaneType,
  getPlaneNumber,
  getParamID,
  getParamInfoSingle,
  getParamInfoList,
};
