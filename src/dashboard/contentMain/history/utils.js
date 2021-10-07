import { MenuItem } from "@mui/material";

export const setCategoryMenuItems = (categories) => {
  return categories.map((data) => {
    return (
      <MenuItem key={data.id} value={data.name}>
        {data.name}
      </MenuItem>
    );
  });
};

export const setChangedCategories = (initialCategories) => {
  let returnArray = initialCategories;
  if (
    returnArray.find((data) => {
      return data.id === "All";
    }) === undefined
  ) {
    returnArray = [{ id: "All", name: "All" }, ...returnArray];
  }
  return returnArray;
};

export const setMonthMenuItems = (chosenYear) => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  if (currentYear === chosenYear) {
    const months = [];
    for (let i = 1; i <= currentMonth; i++) {
      months.push(i);
    }
    return months.reverse().map((data) => {
      return (
        <MenuItem key={data} value={data}>
          {data < 10 ? `0${data}` : data}
        </MenuItem>
      );
    });
  } else {
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return months.reverse().map((data) => {
      return (
        <MenuItem key={data} value={data}>
          {data < 10 ? `0${data}` : data}
        </MenuItem>
      );
    });
  }
};

export const setYearMenuItems = () => {
  const currentYear = new Date().getFullYear();
  const arrayToReturn = [
    currentYear,
    currentYear - 1,
    currentYear - 2,
    currentYear - 3,
    currentYear - 4,
    currentYear - 5,
    currentYear - 6,
    currentYear - 7,
    currentYear - 8,
    currentYear - 9,
    currentYear - 10,
  ];
  return arrayToReturn.map((data) => {
    return (
      <MenuItem key={data} value={data}>
        {data}
      </MenuItem>
    );
  });
};

export const orderAndFilterData = (database, order, category, date) => {
  if (database.length === 0) {
    return [];
  } else {
    const sortedDatabase = database
      .map((data1) => {
        const date = new Date(data1.date);
        return {
          ...data1,
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        };
      })
      .filter((data2) => data2.year === date.year)
      .filter((data3) => data3.month === date.month)
      .filter((data4) =>
        category === "All" ? data4 === data4 : data4.category === category
      )
      .sort((data5, data6) => {
        return order === "newest"
          ? data6.date - data5.date
          : data5.date - data6.date;
      });
    return sortedDatabase;
  }
};

export const getDate = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}.${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }.${date.getFullYear()}`;
};
