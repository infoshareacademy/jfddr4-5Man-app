import { useContext, useEffect } from "react";
import styled from "styled-components";
import { DateContext } from "../DateContext";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const HistoryNavWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

export const HistoryNav = (props) => {
  const dateToDisplay = useContext(DateContext);

  const setYearMenuItems = () => {
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

  const setMonthMenuItems = () => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    if (currentYear === dateToDisplay.year) {
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

  const setCategoryMenuItems = (categories) => {
    const changedCategories = categories;
    if (
      changedCategories.find((data) => {
        return data.id === "All";
      }) === undefined
    ) {
      changedCategories.unshift({ id: "All" });
    }
    return changedCategories.map((data) => {
      return (
        <MenuItem key={data.id} value={data.id}>
          {data.id}
        </MenuItem>
      );
    });
  };

  useEffect(() => {
    props.chooseCategory("All");
  }, []);

  return (
    <HistoryNavWrapper>
      <FormControl>
        <InputLabel id="monthSelect">Month</InputLabel>
        <Select
          labelId="monthSelect"
          label="Month"
          value={dateToDisplay.month}
          onChange={(event) => {
            props.setDateToDisplay({
              month: event.target.value,
              year: dateToDisplay.year,
            });
          }}
        >
          {setMonthMenuItems()}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="yearSelect">Year</InputLabel>
        <Select
          labelId="yearSelect"
          label="Year"
          value={dateToDisplay.year}
          onChange={(event) => {
            props.setDateToDisplay({
              month: dateToDisplay.month,
              year: event.target.value,
            });
          }}
        >
          {setYearMenuItems()}
        </Select>
      </FormControl>
      <FormControl sx={{ width: 150 }}>
        <InputLabel id="categorySelect">Category</InputLabel>
        <Select
          labelId="categorySelect"
          label="Category"
          value={props.category}
          onChange={(event) => {
            props.chooseCategory(event.target.value);
          }}
        >
          {props.categories.length !== 0 &&
            setCategoryMenuItems(props.categories)}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="orderSelect">Sort by</InputLabel>
        <Select
          labelId="orderSelect"
          label="Sort by"
          value={props.sortOrder}
          onChange={(event) => {
            props.setSortOrder(event.target.value);
          }}
        >
          <MenuItem value={"newest"}>{"Newest"}</MenuItem>
          <MenuItem value={"oldest"}>{"Oldest"}</MenuItem>
        </Select>
      </FormControl>
    </HistoryNavWrapper>
  );
};
