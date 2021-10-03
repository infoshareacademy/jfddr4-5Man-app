import { MenuItem, Select } from "@mui/material";
import { Redirect, Route, Switch } from "react-router";
import styled from "styled-components";
import BarGraph from "./BarGraph./BarGraph";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MonthContext } from "../MonthContext";
import { YearContext } from "../YearContext";

const HomeWrapper = styled.div`
  width: calc(100% - 283px);
  height: 100%;
`;

const HomeUpper = styled.div`
  height: 60%;
  border-bottom: 1px solid #d0d0d0;
`;
const HomeLower = styled.div`
  height: 40%;
  display: flex;
`;
const RecentWrapper = styled.div`
  width: 50%;
  height: 100%;
  border-right: 1px solid #d0d0d0;
  min-width: 670px;
`;
const PanelWrapper = styled.div`
  width: 50%;
  min-width: 670px;
`;
const GraphNavWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
const GraphWrapper = styled.div``;

export const Home = (props) => {
  const [chart, setChart] = useState("piechart");
  const chartChanger = (event) => {
    setChart(event.target.value);
  };
  const monthToDisplay = useContext(MonthContext);
  const yearToDisplay = useContext(YearContext);
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
      return <MenuItem value={data}>{data}</MenuItem>;
    });
  };

  return (
    <HomeWrapper>
      <HomeUpper>
        <GraphNavWrapper>
          <Select value={chart} onChange={chartChanger}>
            <MenuItem value="piechart">
              <Link to="/main/home/piechart">Pie Chart</Link>
            </MenuItem>
            <MenuItem value="barchart">
              <Link to="/main/home/barchart">Bar Chart</Link>
            </MenuItem>
          </Select>
          <Select
            value={monthToDisplay}
            onChange={(event) => {
              props.setMonthToDisplay(event.target.value);
            }}
          >
            <MenuItem value={1}>01</MenuItem>
            <MenuItem value={2}>02</MenuItem>
            <MenuItem value={3}>03</MenuItem>
            <MenuItem value={4}>04</MenuItem>
            <MenuItem value={5}>05</MenuItem>
            <MenuItem value={6}>06</MenuItem>
            <MenuItem value={7}>07</MenuItem>
            <MenuItem value={8}>08</MenuItem>
            <MenuItem value={9}>09</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
          </Select>
          <Select
            value={yearToDisplay}
            onChange={(event) => {
              props.setYearToDisplay(event.target.value);
            }}
          >
            {setYearMenuItems()}
          </Select>
        </GraphNavWrapper>
        <GraphWrapper>
          <Switch>
            <Route exact path="/main/home">
              <Redirect to="/main/home/piechart"></Redirect>
            </Route>
            <Route exact path="/main/home/piechart">
              piechart placeholder
            </Route>
            <Route exact path="/main/home/barchart">
              <BarGraph database={props.database}></BarGraph>
            </Route>
          </Switch>
        </GraphWrapper>
      </HomeUpper>
      <HomeLower>
        <RecentWrapper>recent placeholder</RecentWrapper>
        <PanelWrapper>panel placeholder</PanelWrapper>
      </HomeLower>
    </HomeWrapper>
  );
};
