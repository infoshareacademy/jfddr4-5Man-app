import { Redirect, Route, Switch } from "react-router";
import styled from "styled-components";
import BarGraph from "./BarGraph/BarGraph";
import { GraphNav } from "./GraphNav/GraphNav";
import { PieChart } from "./Piechart/Piechart";
import { Recent } from "./Recent/Recent";
import { TransactionPanel } from "./TransactionPanel/TransactionPanel";

const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-width: 1080px;
`;

const HomeUpper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => props.theme.contentBackground};
  border-radius: 25px;
  margin-bottom: 20px;
  max-height: 65%;
  height: 100%;
  padding: 10px;
  min-width: 1400px;
`;
const HomeLower = styled.div`
  display: flex;
  max-height: 35%;
  height: 100%;
`;

export const Home = (props) => {
  return (
    <HomeWrapper>
      <HomeUpper>
        <GraphNav
          setDateToDisplay={props.setDateToDisplay}
          initialChart={props.initialChart}
          setDisplayType={props.setDisplayType}
        ></GraphNav>
        <Switch>
          <Route exact path="/main/home">
            {props.initialChart === "piechart" ? (
              <Redirect to="/main/home/piechart"></Redirect>
            ) : (
              <Redirect to="/main/home/barchart"></Redirect>
            )}
          </Route>
          <Route exact path="/main/home/piechart">
            <PieChart database={props.graphDatabase} />
          </Route>
          <Route exact path="/main/home/barchart">
            <BarGraph database={props.graphDatabase}></BarGraph>
          </Route>
        </Switch>
      </HomeUpper>
      <HomeLower>
        <Recent database={props.historyDatabase}></Recent>
        <TransactionPanel
          totalBudget={props.totalBudget}
          categories={props.categories}
        ></TransactionPanel>
      </HomeLower>
    </HomeWrapper>
  );
};
