import { MenuItem } from "@mui/material";

export const setCategoryMenuItems = (categories) => {
  return categories.map((data) => {
    return data.id !== "Income" ? (
      <MenuItem key={data.id} value={data.name}>
        {data.name}
      </MenuItem>
    ) : (
      ""
    );
  });
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

export const setDayMenuItems = (chosenYear, chosenMonth) => {
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  if (currentYear === chosenYear && currentMonth === chosenMonth) {
    const days = [];
    for (let i = 1; i <= currentDay; i++) {
      days.push(i);
    }
    return days.reverse().map((data) => {
      return (
        <MenuItem key={data} value={data}>
          {data < 10 ? `0${data}` : data}
        </MenuItem>
      );
    });
  } else {
    const days = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ];
    return days.reverse().map((data) => {
      return (
        <MenuItem key={data} value={data}>
          {data < 10 ? `0${data}` : data}
        </MenuItem>
      );
    });
  }
};
