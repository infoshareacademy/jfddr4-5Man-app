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

export const setBorder = (dataSet, database, day) => {
  if (dataSet === undefined) {
    return 0;
  } else if (dataSet.x !== day) {
    return 0;
  } else if (dataSet.y === 0) {
    return 0;
  } else if (database.name === "Income" && dataSet.y !== 0) {
    return "3px solid #004D00";
  }
};

export const setOrder = (database, dataSet, day) => {
  if (dataSet === undefined) {
    return;
  } else if (database.name === "Income") {
    return 2;
  } else {
    const date = new Date(dataSet.date);
    return (
      +date.getFullYear() +
      (+date.getMonth() + 1) +
      +date.getDate() +
      +date.getHours() +
      +date.getMinutes() +
      +date.getSeconds()
    );
  }
};

export const setMinHeight = (dataSet, database, day) => {
  if (dataSet === undefined) {
    return 0;
  } else if (dataSet.x !== day) {
    return 0;
  } else if (dataSet.y === 0) {
    return 0;
  } else if (database.name === "Income") {
    return "15px";
  } else if (dataSet.y !== 0) {
    return "7.5px";
  }
};

export const setSegmentTitle = (dataSet, day) => {
  if (dataSet === undefined) {
    return "";
  } else if (dataSet.x !== day) {
    return "";
  } else if (dataSet.y === 0) {
    return "";
  } else {
    return dataSet.y;
  }
};

export const setMarginBottom = (dataSet, day) => {
  if (dataSet === undefined) {
    return 0;
  } else if (dataSet.x !== day) {
    return 0;
  } else if (dataSet.y === 0) {
    return 0;
  } else if (dataSet.y !== 0) {
    return "3px";
  }
};

export const setSegmentHeight = (dataSet, database, day, daysMaxValues) => {
  if (dataSet === undefined) {
    return 0;
  } else if (dataSet.x !== day) {
    return 0;
  } else if (dataSet.y === 0) {
    return 0;
  } else if (database.name === "Income") {
    return 10;
  } else {
    return (dataSet.y / daysMaxValues[day - 1]) * 100;
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
  if (database.length === 1 || database.length === 0) {
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
