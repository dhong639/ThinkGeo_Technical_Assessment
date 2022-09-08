import * as wkt from "wkt";
import * as measure from "./measure";

test("[GetDistanceBetweenPoints] - The distance between point[10, 0] and point[-10, 0] is 20", () => {
  expect(measure.GetDistanceBetweenPoints([10, 0], [-10, 0])).toBeCloseTo(20.0);
});

test("[GetLineLength] - The distance between point[10, 0] and point[-10, 0] is 20", () => {
  let line = wkt.parse("LINESTRING(40 0, -40 0)");
  expect(measure.GetLineLength(line)).toBeCloseTo(80);
});
