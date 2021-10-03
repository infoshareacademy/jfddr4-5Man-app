import { useContext } from "react";
import styled from "styled-components";
import { CurrencyContext } from "../../CurrencyContext";
import { getIncomeSum, getOutcomeSum } from "./utils";

const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15px;
`;
const SummaryItem = styled.div`
  margin-bottom: 30px;
  font-size: 20px;
  display: flex;
  cursor: default;
`;
const SummaryTitle = styled.div`
  margin-right: 5px;
  width: 85px;
`;
const SummaryAmount = styled.div`
  margin-right: 5px;
  min-width: 85px;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SummaryCurrency = styled.div``;

const Summary = (props) => {
  const currency = useContext(CurrencyContext);
  const outcomeSum = getOutcomeSum(props.database).toFixed(2);
  const incomeSum = getIncomeSum(props.database).toFixed(2);

  return (
    <SummaryWrapper>
      <SummaryItem title={incomeSum}>
        <SummaryTitle>Income:</SummaryTitle>
        <SummaryAmount>{incomeSum}</SummaryAmount>
        <SummaryCurrency>{currency}</SummaryCurrency>
      </SummaryItem>
      <SummaryItem title={outcomeSum}>
        <SummaryTitle>Outcome:</SummaryTitle>
        <SummaryAmount>{outcomeSum}</SummaryAmount>
        <SummaryCurrency>{currency}</SummaryCurrency>
      </SummaryItem>
      <SummaryItem title={incomeSum - outcomeSum}>
        <SummaryTitle>Savings:</SummaryTitle>
        <SummaryAmount>{(incomeSum - outcomeSum).toFixed(2)}</SummaryAmount>
        <SummaryCurrency>{currency}</SummaryCurrency>
      </SummaryItem>
    </SummaryWrapper>
  );
};

export default Summary;
