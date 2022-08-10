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

Mock.mock(/api/, "get", () => {
  return criterionInfo;
});
