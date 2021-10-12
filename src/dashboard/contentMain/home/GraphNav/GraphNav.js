import styled from "styled-components";
import { Link } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useContext, useState } from "react";
import { DateContext } from "../../DateContext";

const GraphNavWrapper = styled.div`
  width: fit-content;
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  background-color: ${(props) => props.theme.navBackground};
  border-radius: 25px;
  padding: 10px 15px;
  a {
    color: black !important;
  }
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

export const GraphNav = (props) => {
  const initialChartSetter = () => {
    if (
      window.location.pathname === "/main/home" ||
      window.location.pathname === "/main/home/piechart"
    ) {
      return "piechart";
    } else {
      return "barchart";
    }
  };

  const [chart, setChart] = useState(initialChartSetter());

  const chartChanger = (event) => {
    setChart(event.target.value);
  };

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

  return (
    <GraphNavWrapper>
      <FormControl sx={selectStyles}>
        <InputLabel id="chartSelect">Chart</InputLabel>
        <Select
          labelId="chartSelect"
          label="Chart"
          value={chart}
          onChange={chartChanger}
        >
          <MenuItem
            value="piechart"
            sx={{ padding: "0px", width: "116px", height: "36px" }}
          >
            <Link to="/main/home/piechart">Pie Chart</Link>
          </MenuItem>
          <MenuItem
            value="barchart"
            sx={{ padding: "0px", width: "116px", height: "36px" }}
          >
            <Link to="/main/home/barchart">Bar Chart</Link>
          </MenuItem>
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
          {setMonthMenuItems()}
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
    </GraphNavWrapper>
  );
};
