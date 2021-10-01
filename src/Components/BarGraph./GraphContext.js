import { createContext } from "react";
import { myDatabase } from "./db";

const daysValues = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
];
myDatabase
  .map((data) => {
    return data.name !== "Income" ? data.dataPoints : [{ x: 1, y: 0 }];
  })
  .forEach((data) => {
    data.forEach((data) => {
      daysValues[data.x - 1].push(data.y);
    });
  });
const daysMaxValues = daysValues.map((data) => {
  if (data.length !== 0) {
    return data.reduce((data1, data2) => {
      return data1 + data2;
    });
  } else {
    return 0;
  }
});
const maxValue = Math.max(...daysMaxValues);

export const maxValueContext = createContext(maxValue);
export const daysMaxValuesContext = createContext(daysMaxValues);
