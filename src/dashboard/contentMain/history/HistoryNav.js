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
import { DisplayContext } from "../DisplayContext";

const HistoryNavWrapper = styled.div`
  width: fit-content;
  display: flex;
  justify-content: center;
  margin: 15px 0;
  background-color: ${(props) => props.theme.navBackground};
  border-radius: 25px;
  padding: 20px;
`;
const selectStyles = {
  marginRight: "20px",
  "&:last-of-type": { marginRight: "0px" },
  "& label": { color: "#5350E9" },
  "& label.Mui-focused": {
    color: "#333193",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#5350E9",
    },
    "&:hover fieldset": {
      borderColor: "#5350E9",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#333193",
    },
  },
  "& .MuiList-root": { backgroundColor: "#5350E9" },
};
const selectCategoryStyles = {
  marginRight: "20px",
  "&:last-of-type": { marginRight: "0px" },
  "& label": { color: "#5350E9" },
  "& label.Mui-focused": {
    color: "#333193",
  },
  "& .MuiOutlinedInput-root": {
    width: "100px",
    "& fieldset": {
      borderColor: "#5350E9",
    },
    "&:hover fieldset": {
      borderColor: "#5350E9",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#333193",
    },
  },
  "& .MuiList-root": { backgroundColor: "#5350E9" },
};

export const HistoryNav = (props) => {
  const dateToDisplay = useContext(DateContext);
  const typeToDisplay = useContext(DisplayContext);

  const changedCategories = setChangedCategories(props.categories);

  return (
    changedCategories && (
      <HistoryNavWrapper>
        <FormControl sx={selectStyles}>
          <InputLabel id="typeSelect">Range</InputLabel>
          <Select
            labelId="typeSelect"
            label="Range"
            value={typeToDisplay}
            onChange={(event) => {
              props.setDisplayType(event.target.value);
            }}
          >
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={selectStyles}>
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
        <FormControl sx={selectStyles}>
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
        <FormControl sx={selectCategoryStyles}>
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
        <FormControl sx={selectStyles}>
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
