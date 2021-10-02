export const compileDatabase = (categories, transactions, month, year) => {
  const firstArray = [];
  categories.forEach((data) => {
    firstArray.push({ name: data.name, color: data.color, dataPoints: [] });
  });
  const secondArray = firstArray.map((data1) => {
    return {
      name: data1.name,
      color: data1.color,
      dataPoints: transactions.filter((data2) => {
        return data2.category === data1.name;
      }),
    };
  });
  secondArray.forEach((data1) => {
    data1.dataPoints.forEach((data2) => {
      data2.date = {
        day: new Date(data2.date).getDate(),
        month: new Date(data2.date).getMonth(),
        year: new Date(data2.date).getFullYear(),
      };
    });
  });

  return secondArray;
};

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
    return dataSet.dataPoints.find((dataPoint) => dataPoint.x === day).y;
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
