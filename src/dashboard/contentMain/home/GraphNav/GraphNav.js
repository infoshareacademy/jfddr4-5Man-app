import styled from "styled-components";
import { Link } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useContext, useState } from "react";
import { DateContext } from "../../DateContext";

const GraphNavWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

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
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return months.map((data) => {
      return (
        <MenuItem key={data} value={data}>
          {data < 10 ? `0${data}` : data}
        </MenuItem>
      );
    });
  };

  return (
    <GraphNavWrapper>
      <FormControl>
        <InputLabel id="chartSelect">Chart</InputLabel>
        <Select
          labelId="chartSelect"
          label="Chart"
          value={chart}
          onChange={chartChanger}
        >
          <MenuItem value="piechart">
            <Link to="/main/home/piechart">Pie Chart</Link>
          </MenuItem>
          <MenuItem value="barchart">
            <Link to="/main/home/barchart">Bar Chart</Link>
          </MenuItem>
        </Select>
      </FormControl>
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
    </GraphNavWrapper>
  );
};
