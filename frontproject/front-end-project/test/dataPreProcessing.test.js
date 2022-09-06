import { getGroupForm, getItemList } from "@/utils/dataPreProcessing";

import { assert, expect, test, it, describe } from "vitest";

test("getFormatDay()", () => {
  expect(
    getGroupForm(
      [
        {
          planeModel: "J10",
          id: 1,
        },
        {
          planeModel: "J10",
          id: 2,
        },
        {
          planeModel: "J30",
          id: 3,
        },
      ],
      "planeModel",
      "testTimeStart"
    )
  ).toStrictEqual([
    {
      testTimeStart: "J10",
      children: [
        {
          planeModel: "J10",
          id: 1,
        },
        {
          planeModel: "J10",
          id: 2,
        },
      ],
    },
    {
      testTimeStart: "J30",
      id: 3,
    },
  ]);
});
