const myCustomReduce = (array) => {
  let sortedArray = array.sort((data1, data2) => {
    return data2.x - data1.x;
  });
  let returnArray = [sortedArray[0]];
  for (let i = 0; i < sortedArray.length; i++) {
    if (i > 0) {
      if (sortedArray[i].x === sortedArray[i - 1].x) {
        let reducedItem = {
          x: sortedArray[i].x,
          y: sortedArray[i].y + sortedArray[i - 1].y,
          date: sortedArray[i].date,
        };
        returnArray.splice(i - 1, 2, reducedItem);
        i++;
      } else {
        returnArray.push(sortedArray[i]);
      }
    }
  }
  return returnArray;
};

export const compileGraphDatabase = (
  categories,
  transactions,
  date,
  displayType
) =>
  displayType === "monthly"
    ? categories.map((category) => ({
        name: category.name,
        color: category.color,
        dataPoints: transactions
          .filter((transaction) => transaction.category === category.name)
          .map((transaction) => {
            const date = new Date(transaction.date);
            return {
              x: {
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear(),
              },
              y: transaction.amount,
              date: transaction.date,
            };
          })
          .filter((transaction) => transaction.x.month === date.month)
          .filter((transaction) => transaction.x.year === date.year)
          .map((transaction) => {
            return {
              x: transaction.x.day,
              y: transaction.y,
              date: transaction.date,
            };
          }),
      }))
    : categories
        .map((category) => ({
          name: category.name,
          color: category.color,
          dataPoints: transactions
            .filter((transaction) => transaction.category === category.name)
            .map((transaction) => {
              const date = new Date(transaction.date);
              return {
                x: {
                  day: date.getDate(),
                  month: date.getMonth() + 1,
                  year: date.getFullYear(),
                },
                y: transaction.amount,
                date: transaction.date,
              };
            })
            .filter((transaction) => transaction.x.year === date.year)
            .map((transaction) => {
              return {
                x: transaction.x.month,
                y: transaction.y,
                date: transaction.date,
              };
            }),
        }))
        .map((category) => ({
          name: category.name,
          color: category.color,
          dataPoints:
            category.dataPoints.length !== 0
              ? myCustomReduce(category.dataPoints)
              : category.dataPoints,
        }));

export const compileHistoryDatabase = (categories, transactions) => {
  return transactions.map((data1) => {
    return categories.find((data2) => data2.name === data1.category)
      ? {
          ...data1,
          color: categories.find((data2) => data2.name === data1.category)
            .color,
        }
      : { ...data1, color: "white" };
  });
};

export const getTotalBudget = (userData) => {
  return userData.length === 0
    ? 0
    : userData.find((data) => {
        return data.id === "TotalBudget";
      }).amount;
};

export const getSidebarInfo = (userData) => {
  return {
    picture:
      userData.length === 0
        ? 0
        : userData.find((data) => {
            return data.id === "Picture";
          }).number,
    name:
      userData.length === 0
        ? 0
        : userData.find((data) => {
            return data.id === "Nickname";
          }).nickname,
  };
};

export const getNightmode = (userData) => {
  if (userData.length === 0) {
    return "false";
  } else {
    return userData.find((data) => {
      return data.id === "Nightmode";
    }).isOn;
  }
};

export const filterCategoryColors = (categories, userInfo) => {
  if (categories.length === 0 || userInfo.length === 0) {
    return [];
  }
  if (
    userInfo.find((data) => {
      return data.id === "CategoryColors";
    }).isOn === "true"
  ) {
    return categories;
  }
  if (
    userInfo.find((data) => {
      return data.id === "CategoryColors";
    }).isOn === "false"
  ) {
    return categories.map((category) => {
      return category.name !== "Income"
        ? {
            plannerOn: category.plannerOn,
            planner: category.planner,
            name: category.name,
            createdAt: category.createdAt,
            id: category.id,
            color: "#E93131",
          }
        : category;
    });
  }
};

export const getInitialChart = (userData) => {
  return userData.length === 0
    ? "piechart"
    : userData.find((data) => {
        return data.id === "InitialChart";
      }).chart;
};
