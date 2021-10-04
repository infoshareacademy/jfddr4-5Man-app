import { Redirect, Route, Switch } from "react-router";
import styled from "styled-components";
import BarGraph from "./BarGraph./BarGraph";
import { GraphNav } from "./GraphNav/GraphNav";
import { Recent } from "./Recent/Recent";

const HomeWrapper = styled.div`
  width: calc(100% - 283px);
  height: 100%;
`;

const HomeUpper = styled.div`
  height: 60%;
  min-height: 608px;
  border-bottom: 1px solid #d0d0d0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 1375px;
`;
const HomeLower = styled.div`
  height: 40%;
  display: flex;
`;
const PanelWrapper = styled.div`
  width: 50%;
  min-width: 670px;
`;

const GraphWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Home = (props) => {
  return (
    <HomeWrapper>
      <HomeUpper>
        <GraphNav
          setMonthToDisplay={props.setMonthToDisplay}
          setYearToDisplay={props.setYearToDisplay}
        ></GraphNav>
        <GraphWrapper>
          <Switch>
            <Route exact path="/main/home">
              <Redirect to="/main/home/piechart"></Redirect>
            </Route>
            <Route exact path="/main/home/piechart">
              piechart placeholder
            </Route>
            <Route exact path="/main/home/barchart">
              <BarGraph database={props.graphDatabase}></BarGraph>
            </Route>
          </Switch>
        </GraphWrapper>
      </HomeUpper>
      <HomeLower>
        <Recent database={props.historyDatabase}></Recent>
        <PanelWrapper>panel placeholder</PanelWrapper>
      </HomeLower>
    </HomeWrapper>
  );
};
