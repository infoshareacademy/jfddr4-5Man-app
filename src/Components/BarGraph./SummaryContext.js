import { createContext } from "react";
import { myDatabase } from "./db";

const incomeSum = myDatabase[0].dataPoints
  .map((data) => {
    return data.y;
  })
  .reduce((data1, data2) => {
    return data1 + data2;
  });

const outcomeSum = myDatabase
  .map((data) => {
    return data.dataPoints.map((data) => {
      return data.y;
    });
  })
  .slice(1)
  .map((data) => {
    if (data.length !== 0) {
      return data.reduce((data1, data2) => {
        return data1 + data2;
      });
    } else {
      return 0;
    }
  })
  .reduce((data1, data2) => {
    return data1 + data2;
  });

export const incomeSumContext = createContext(incomeSum);
export const outcomeSumContext = createContext(outcomeSum);
