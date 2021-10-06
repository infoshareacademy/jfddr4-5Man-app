export const getDailyMaxValue = (database) => {
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
  database
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
  return daysMaxValues;
};

export const getMaxValue = (database) => {
  const maxValue = Math.max(...getDailyMaxValue(database));
  return maxValue;
};

export const setBorder = (dataSet, day) => {
  if (
    dataSet.dataPoints.find((dataPoint) => dataPoint.x === day) === undefined
  ) {
    return 0;
  } else if (
    dataSet.name === "Income" &&
    dataSet.dataPoints.find((dataPoint) => dataPoint.x === day).y !== 0
  ) {
    return "3px dashed darkred";
  } else {
    return 0;
  }
};

export const setOrder = (dataSet, day) => {
  if (dataSet.name === "Income") {
    return 98;
  } else {
    return day;
  }
};

export const setMinHeight = (dataSet, day) => {
  if (
    dataSet.dataPoints.find((dataPoint) => dataPoint.x === day) === undefined
  ) {
    return 0;
  } else if (dataSet.name === "Income") {
    return "15px";
  } else if (
    dataSet.dataPoints.find((dataPoint) => dataPoint.x === day).y !== 0
  ) {
    return "7.5px";
  } else {
    return 0;
  }
};

export const setBarTitle = (dataSet, day) => {
  if (
    dataSet.dataPoints.find((dataPoint) => dataPoint.x === day) === undefined
  ) {
    return "";
  } else {
    return dataSet.dataPoints
      .find((dataPoint) => dataPoint.x === day)
      .y.toFixed(2);
  }
};

export const setMarginBottom = (dataSet, day) => {
  if (
    dataSet.dataPoints.find((dataPoint) => dataPoint.x === day) === undefined
  ) {
    return 0;
  } else if (
    dataSet.dataPoints.find((dataPoint) => dataPoint.x === day).y !== 0
  ) {
    return "3px";
  } else {
    return 0;
  }
};

export const setSegmentHeight = (dataSet, day, daysMaxValues) => {
  if (
    dataSet.dataPoints.find((dataPoint) => dataPoint.x === day) === undefined
  ) {
    return 0;
  } else if (
    dataSet.dataPoints.find((dataPoint) => dataPoint.x === day).y === 0
  ) {
    return 0;
  } else if (dataSet.name === "Income") {
    return 10;
  } else {
    return (
      (dataSet.dataPoints.find((dataPoint) => dataPoint.x === day).y /
        daysMaxValues[day - 1]) *
      100
    );
  }
};

export const setBarHeight = (daysMaxValues, day, maxValue) => {
  return (daysMaxValues[day - 1] / maxValue) * 100;
};

export const getIncomeSum = (database) => {
  if (database.length === 0) {
    return 0;
  } else if (
    database.find((data) => data.name === "Income").dataPoints.length !== 0
  ) {
    return database
      .find((data) => data.name === "Income")
      .dataPoints.map((data) => {
        return data.y;
      })
      .reduce((data1, data2) => {
        return data1 + data2;
      });
  } else {
    return 0;
  }
};

export const getOutcomeSum = (database) => {
  if (database.length === 0) {
    return 0;
  } else {
    return database
      .filter((data) => data.name !== "Income")
      .map((data) => data.dataPoints.map((data2) => data2.y))
      .map((data) =>
        data.length !== 0 ? data.reduce((data2, data3) => data2 + data3) : 0
      )
      .reduce((data1, data2) => data1 + data2);
  }
};

export const setCategoryTitle = (dataSet) => {
  if (dataSet.dataPoints.length === 0) {
    return 0;
  } else {
    return dataSet.dataPoints
      .map((data) => data.y)
      .reduce((data1, data2) => data1 + data2)
      .toFixed(2);
  }
};

export const setCategoryInside = (dataSet, outcomeSum) => {
  if (dataSet.dataPoints.length === 0) {
    return 0;
  } else {
    return Math.round(
      (dataSet.dataPoints
        .map((data) => data.y)
        .reduce((data1, data2) => data1 + data2) /
        outcomeSum) *
        100
    );
  }
};
