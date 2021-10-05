export const compileGraphDatabase = (categories, transactions, date) =>
  categories.map((category) => ({
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
