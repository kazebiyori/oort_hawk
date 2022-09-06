import {
  getDaysBetween,
  getFormatDay,
  sortDate,
  filterDate,
  trasformStrToComparable,
} from "@/utils/date";

import { assert, expect, test, it, describe } from "vitest";

test("getDaysBetween()", () => {
  expect(
    getDaysBetween("2022-01-01T16:00:00.000Z", "2022-01-02T16:00:00.000Z")
  ).toStrictEqual([
    ["2022-01-02", 1],
    ["2022-01-03", 1],
  ]);
});

test("getFormatDay()", () => {
  expect(getFormatDay("2022-01-01T16:00:00.000Z")).toBe("2022-01-02");
});

test("sortDate()", () => {
  expect(
    sortDate([
      ["2020-10-03", 290],
      ["2020-10-01", 450],
      ["2020-10-02", 350],
    ])
  ).toStrictEqual([
    ["2020-10-01", 450],
    ["2020-10-02", 350],
    ["2020-10-03", 290],
  ]);
});

test("filterDate()", () => {
  expect(
    filterDate("2020-10-15", "2020-10-25", [
      ["2020-10-30", 290],
      ["2020-10-10", 450],
      ["2020-10-20", 350],
    ])
  ).toStrictEqual([["2020-10-20", 350]]);
});

test("trasformStrToComparable", () => {
  expect(
    trasformStrToComparable("2022-01-01 00:00:00", "2022-01-02 00:00:00").toBe(
      {}
    )
  );
});
