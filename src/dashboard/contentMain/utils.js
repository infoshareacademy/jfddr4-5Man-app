export const compileGraphDatabase = (categories, transactions, month, year) =>
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
        };
      })
      .filter((transaction) => transaction.x.month === month)
      .filter((transaction) => transaction.x.year === year)
      .map((transaction) => {
        return { x: transaction.x.day, y: transaction.y };
      }),
  }));

export const compileHistoryDatabase = (categories, transactions) => {
  return transactions.map((data1) => {
    return {
      ...data1,
      color: categories.find((data2) => data2.name === data1.category).color,
    };
  });
};
