import styled from "styled-components";
import { Categories } from "./Categories/Categories";
import { TotalBudgetPanel } from "./TotalBudgetPanel/TotalBudgetPanel";
import { Planner } from "./Planner/Planner";
import { CategoryForm } from "./Categories/CategoryForm";
import { useState } from "react";
import { ColorPicker } from "./Categories/ColorPicker";
import "./budget.scss";
import { TotalBudgetForm } from "./TotalBudgetPanel/TotalBudgetForm";
import { PlannerForm } from "./Planner/PlannerForm";

const BudgetWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  min-width: 1240px;
`;
const BudgetWrapperRight = styled.div`
  width: 100%;
  height: 100%;
`;
const CoverPanel = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: none;
  z-index: 9;
`;
const OpaquePanel = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: none;
  z-index: 8;
  background-color: #b5b5b5;
  opacity: 0.9;
`;
const ColorPickerOutsideWrapper = styled.div`
  display: none;
  z-index: 11;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const CategoryFormOutsideWrapper = styled.div`
  display: none;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const TotalBudgetFormOutsideWrapper = styled.div`
  display: none;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const PlannerFormOutsideWrapper = styled.div`
  display: none;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Budget = (props) => {
  const [categoryData, setCategoryData] = useState("");
  const [operationType, setOperationType] = useState("");
  const [plannerData, setPlannerData] = useState("");
  console.log(categoryData);
  return (
    <BudgetWrapper>
      <Categories
        categories={props.categories}
        setCategoryData={setCategoryData}
      ></Categories>
      <BudgetWrapperRight>
        <TotalBudgetPanel
          totalBudget={props.totalBudget}
          setOperationType={setOperationType}
        ></TotalBudgetPanel>
        <Planner
          categories={props.categories}
          setPlannerData={setPlannerData}
        ></Planner>
      </BudgetWrapperRight>
      <CoverPanel className="coverPanel">
        <CategoryFormOutsideWrapper className="categoryForm">
          <CategoryForm
            categoryData={categoryData}
            categories={props.categories}
            setCategoryData={setCategoryData}
            transactions={props.transactions}
          ></CategoryForm>
        </CategoryFormOutsideWrapper>
        <TotalBudgetFormOutsideWrapper className="budgetForm">
          <TotalBudgetForm
            operationType={operationType}
            totalBudget={props.totalBudget}
          ></TotalBudgetForm>
        </TotalBudgetFormOutsideWrapper>
        <PlannerFormOutsideWrapper className="plannerForm">
          <PlannerForm
            plannerData={plannerData}
            setPlannerData={setPlannerData}
          ></PlannerForm>
        </PlannerFormOutsideWrapper>
        <ColorPickerOutsideWrapper className="colorPicker">
          <ColorPicker
            setCategoryData={setCategoryData}
            categoryData={categoryData}
          ></ColorPicker>
        </ColorPickerOutsideWrapper>
      </CoverPanel>
      <OpaquePanel className="opaquePanel"></OpaquePanel>
    </BudgetWrapper>
  );
};
