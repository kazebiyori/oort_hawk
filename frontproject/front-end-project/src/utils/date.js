import moment from "moment";

/**
 * 根据输入日期，输出日期间的所有天，并将格式转化为echarts能识别的格式
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
