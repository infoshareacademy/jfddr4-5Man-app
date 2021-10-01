export const compileDatabase = (categories, transactions) => {
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
  // secondArray.map((data)=>)

  return secondArray;
};
