import { assert, expect, test, it, describe } from "vitest";

import { getDaysBetween } from "@/utils/date";
// Edit an assertion and save to see HMR in action

it("getDaysBetween()", () => {
  expect(getDaysBetween("2022-01-01", "2022-01-02")).toStrictEqual([
    ["2022-01-01", 1],
    ["2022-01-02", 1],
  ]);
});

test("Math.sqrt()", () => {
  expect(Math.sqrt(4)).toBe(2);
  expect(Math.sqrt(144)).toBe(12);
  expect(Math.sqrt(2)).toBe(Math.SQRT2);
});

test("JSON", () => {
  const input = {
    foo: "hello",
    bar: "world",
  };

  const output = JSON.stringify(input);

  expect(output).eq('{"foo":"hello","bar":"world"}');
  assert.deepEqual(JSON.parse(output), input, "matches original");
});

describe("suite name", () => {
  it("foo", () => {
    assert.equal(Math.sqrt(4), 2);
  });

  it("bar", () => {
    expect(1 + 1).eq(2);
  });

  it("snapshot", () => {
    expect({ foo: "bar" }).toMatchSnapshot();
  });
});
