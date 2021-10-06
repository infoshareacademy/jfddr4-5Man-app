import styled from "styled-components";
import { Categories } from "./Categories/Categories";
import { TotalBudgetPanel } from "./TotalBudgetPanel/TotalBudgetPanel";
import { Planner } from "./Planner/Planner";

const BudgetWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
const BudgetWrapperRight = styled.div`
  width: 100%;
  height: 100%;
`;

export const Budget = () => {
  return (
    <BudgetWrapper>
      <Categories></Categories>
      <BudgetWrapperRight>
        <TotalBudgetPanel></TotalBudgetPanel>
        <Planner></Planner>
      </BudgetWrapperRight>
    </BudgetWrapper>
  );
};
