import styled from "styled-components";
import { Categories } from "./Categories/Categories";
import { TotalBudgetPanel } from "./TotalBudgetPanel/TotalBudgetPanel";
import { Planner } from "./Planner/Planner";
import { CategoryForm } from "./Categories/CategoryForm";
import { useState } from "react";
import { ColorPicker } from "./Categories/ColorPicker";

const BudgetWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
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

export const Budget = (props) => {
  const [categoryData, setCategoryData] = useState("");
  return (
    <BudgetWrapper>
      <Categories
        categories={props.categories}
        setCategoryData={setCategoryData}
      ></Categories>
      <BudgetWrapperRight>
        <TotalBudgetPanel></TotalBudgetPanel>
        <Planner></Planner>
      </BudgetWrapperRight>
      <CoverPanel className="coverPanel">
        <CategoryForm
          categoryData={categoryData}
          categories={props.categories}
          setCategoryData={setCategoryData}
          transactions={props.transactions}
        ></CategoryForm>
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
