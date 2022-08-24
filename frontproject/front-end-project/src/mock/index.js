import { dateEquals } from "element-plus";
import Mock from "mockjs";

let criterionInfo = Mock.mock({
  "data|6": [
    {
      "InfoId|+1": 1,
      "ID|+1": 2,
      Name: "@ctitle(10)",
      Versoin: /^[1-9].[0-9]$/,
      Status: /^[0-1]$/,
      Gategory: /^[0-4]$/,
      Type: /^[0-4]$/,
      Brief: "@ctitle(50)",
      Advice: "@ctitle(50)",
    },
  ],
});

let dataList = Mock.mock({
  "data|3": [
    {
      "ID|+1": 1,
      Group: /[1-2]/,
      Name: /data-[0-9]/,
      "Children|5": [
        {
          "ID|+1": 1,
          Group: /[1-2]/,
          Name: /child-[0-9]/,
        },
      ],
    },
  ],
});

let dataStatistics = Mock.mock({
  "array|1000": [[/202[0-2]-0[1-9]-0[0-9]/, /[1-9]/]],
});

let dataStatistics_bk = Mock.mock([
  ["2020-10-1", 450],
  ["2020-10-2", 350],
  ["2020-10-3", 290],
  ["2020-10-4", 380],
  ["2020-10-5", 540],
  ["2020-10-6", null],
  ["2020-10-7", null],
  ["2020-10-8", 430],
  ["2020-10-9", 330],
  ["2020-10-10", 280],
  ["2020-10-11", 340],
  ["2020-10-12", 455],
  ["2020-10-13", 330],
]);

Mock.mock(/api\/sidebardata/, "get", () => {
  return dataList;
});

Mock.mock(/api\/statistics/, "get", () => {
  return dataStatistics;
});

// export default [
//   {
//     url: "/api/",
//     method: "get",
//     response: () => {
//       return {
//         code: 200,
//         message: "ok",
//         data: ["tom", "jerry"],
//       };
//     },
//   },
// ];
