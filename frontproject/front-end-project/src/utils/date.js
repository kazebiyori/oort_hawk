import moment from "moment";

/**
 * 根据输入起止日期，输出日期间的所有天，并将格式转化为echarts能识别的格式
 * @param {*} start
 * @param {*} end
 * @param {*} weight
 * @returns
 */
export const getDaysBetween = (start, end, weight = 1) => {
  const startDate = moment(start);
  const endDate = moment(end);
  const allDays = [];
  while (endDate >= startDate) {
    allDays.push([startDate.format("YYYY-MM-DD"), weight]);
    startDate.add(1, "day");
  }

  return allDays;
};

/**
 *  view design 控件绑定数据后使的数据格式不一致，使用格式化操作，使时间统一为(yyyy-mm-dd)格式
 * @param {*} data
 * @returns
 */
export const getFormatDay = (data) => {
  if (data == "") {
    return "";
  }
  data = moment(data).format("YYYY-MM-DD");

  return data.match(/\d+-\d+-\d+/)[0];
};

/**
 * 对时间数据进行排序
 * @param [["yyyy-mm-dd" , /digit/],] data
 */
export const sortDate = (data) => {
  data.sort((a, b) => {
    return moment(a[0]) - moment(b[0]);
  });
  return data;
};

/**
 * 获取日期之间的数据
 * @param {"yyyy-mm-dd"} begin
 * @param {"yyyy-mm-dd"} end
 * @param [["yyyy-mm-dd" , /digit/],] data
 *
 */
export const filterDate = (beginDate, endDate, data) => {
  const beginMoment = moment(beginDate);
  const endMoment = moment(endDate);
  let tmpMoment;
  let result = data.filter((item) => {
    tmpMoment = moment(item[0]);
    return tmpMoment >= beginMoment && tmpMoment <= endMoment;
  });
  return result;
};

export const trasformStrToComparable = (dataStr, dataStr2) => {
  console.log(moment(dataStr) - moment(dataStr2));
  return moment(dataStr);
};
