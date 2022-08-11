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
  "data|50": [
    {
      "ID|+1": 1,
      Group: /[1-2]/,
      Name: /data-[0-9]/,
    },
  ],
});

Mock.mock(/api/, "get", () => {
  return dataList;
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
