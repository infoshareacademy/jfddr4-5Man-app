import { IconButton } from "@mui/material";
import styled from "styled-components";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useContext } from "react";
import { CurrencyContext } from "../../CurrencyContext";
import { animateForm, animateOpaquePanel } from "../../animations";

const TotalBudgetPanelWrapper = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  padding: 0 10px;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  background-color: ${(props) => props.theme.contentBackground};
  border-radius: 25px;
  margin-bottom: 20px;
`;
const TotalBudgetDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 80px;
`;
const TotalBudgetText = styled.h3`
  font-weight: normal;
  font-size: 30px;
  margin-bottom: 15px;
`;
const TotalBudgetAmount = styled.h2`
  font-size: 40px;
`;

export const TotalBudgetPanel = (props) => {
  const currency = useContext(CurrencyContext);
  const totalBudget = props.totalBudget;
  if (props.totalBudget || props.totalBudget === 0) {
    return (
      <TotalBudgetPanelWrapper>
        <IconButton
          onClick={() => {
            props.setOperationType("add");
            document.querySelector(".opaquePanel").classList.add("displayed");
            document.querySelector(".coverPanel").classList.add("displayed");
            document.querySelector(".budgetForm").classList.add("displayed");
            animateForm("budgetForm");
            animateOpaquePanel();
          }}
        >
          <AddCircleIcon sx={{ color: "#5350E9", fontSize: 80 }} />
        </IconButton>
        <TotalBudgetDisplay>
          <TotalBudgetText>Total Budget</TotalBudgetText>
          <TotalBudgetAmount
            title={`${totalBudget.toFixed(2)} ${currency}`}
          >{`${
            totalBudget.toFixed(2).toString().length < 11
              ? totalBudget.toFixed(2)
              : totalBudget > 0
              ? "9999999999..."
              : "-9999999999..."
          } ${currency}`}</TotalBudgetAmount>
        </TotalBudgetDisplay>
        <IconButton
          onClick={() => {
            props.setOperationType("subtract");
            document.querySelector(".opaquePanel").classList.add("displayed");
            document.querySelector(".coverPanel").classList.add("displayed");
            document.querySelector(".budgetForm").classList.add("displayed");
            animateForm("budgetForm");
            animateOpaquePanel();
          }}
        >
          <RemoveCircleIcon sx={{ color: "#5350E9", fontSize: 80 }} />
        </IconButton>
      </TotalBudgetPanelWrapper>
    );
  }
};
