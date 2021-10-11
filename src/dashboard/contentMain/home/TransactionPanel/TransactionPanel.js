import { IconButton } from "@mui/material";
import styled from "styled-components";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useContext } from "react";
import { CurrencyContext } from "../../CurrencyContext";
import { TransactionForm } from "./TransactionForm";
import { useState } from "react";
import { animateForm, animateOpaquePanel } from "../../animations";

const MainWrapper = styled.div`
  width: 50%;
  height: 100%;
  padding: 50px 75px;
  min-width: 670px;
  letter-spacing: 1px;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ButtonsTitle = styled.h3`
  font-weight: normal;
  font-size: 25px;
`;
const BudgetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BudgetTitle = styled.h3`
  font-size: 30px;
  font-weight: normal;
  margin-bottom: 15px;
`;
const BudgetDisplay = styled.h2`
  font-size: 40px;
  text-align: center;
`;
const FormOutsideWrapper = styled.div`
  display: none;
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
  background-color: ${(props) => props.theme.opaqueColor};
  opacity: 0.9;
`;

export const TransactionPanel = (props) => {
  const currency = useContext(CurrencyContext);
  const [transactionType, setTransactionType] = useState("");
  const totalBudget = props.totalBudget;
  return (
    <MainWrapper>
      <ButtonsWrapper>
        <ButtonWrapper>
          <ButtonsTitle>Add income</ButtonsTitle>
          <IconButton
            onClick={() => {
              setTransactionType("income");
              document.querySelector(".opaquePanel").classList.add("displayed");
              document.querySelector(".coverPanel").classList.add("displayed");
              document
                .querySelector(".transactionForm")
                .classList.add("displayed");
              animateForm("transactionForm");
              animateOpaquePanel();
            }}
          >
            <AddCircleIcon sx={{ color: "#5350E9", fontSize: 80 }} />
          </IconButton>
        </ButtonWrapper>
        <ButtonWrapper>
          <ButtonsTitle>Add outcome </ButtonsTitle>
          <IconButton
            onClick={() => {
              setTransactionType("outcome");
              document.querySelector(".opaquePanel").classList.add("displayed");
              document.querySelector(".coverPanel").classList.add("displayed");
              document
                .querySelector(".transactionForm")
                .classList.add("displayed");
              animateForm("transactionForm");
              animateOpaquePanel();
            }}
          >
            <RemoveCircleIcon sx={{ color: "#5350E9", fontSize: 80 }} />
          </IconButton>
        </ButtonWrapper>
      </ButtonsWrapper>
      <BudgetWrapper>
        <BudgetTitle>Total Budget</BudgetTitle>
        <BudgetDisplay title={`${totalBudget.toFixed(2)} ${currency}`}>{`${
          totalBudget.toFixed(2).toString().length < 11
            ? totalBudget.toFixed(2)
            : totalBudget > 0
            ? "9999999999..."
            : "-9999999999..."
        } ${currency}`}</BudgetDisplay>
      </BudgetWrapper>
      <CoverPanel className="coverPanel">
        <FormOutsideWrapper className="transactionForm">
          <TransactionForm
            categories={props.categories}
            type={transactionType}
            totalBudget={props.totalBudget}
          ></TransactionForm>
        </FormOutsideWrapper>
      </CoverPanel>
      <OpaquePanel className="opaquePanel"></OpaquePanel>
    </MainWrapper>
  );
};
