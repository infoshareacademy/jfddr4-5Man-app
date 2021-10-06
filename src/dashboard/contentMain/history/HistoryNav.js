import { useContext } from "react";
import styled from "styled-components";
import { DateContext } from "../DateContext";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  setCategoryMenuItems,
  setChangedCategories,
  setMonthMenuItems,
  setYearMenuItems,
} from "./utils";

const HistoryNavWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

export const HistoryNav = (props) => {
  const dateToDisplay = useContext(DateContext);

  const changedCategories = setChangedCategories(props.categories);

  return (
    changedCategories && (
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
            {setMonthMenuItems(dateToDisplay.year)}
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
              setCategoryMenuItems(changedCategories)}
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
    )
  );
};
