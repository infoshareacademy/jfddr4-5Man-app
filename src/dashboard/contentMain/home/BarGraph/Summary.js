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
  margin-bottom: 40px;
  font-size: 20px;
  display: flex;
  cursor: default;
  :last-of-type {
    margin-bottom: 0px;
  }
`;
const SummaryTitle = styled.span`
  margin-right: 15px;
  width: 85px;
`;
const SummaryAmount = styled.span`
  margin-right: 5px;
  min-width: 85px;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  :hover {
    opacity: 0.75;
  }
`;
const SummaryCurrency = styled.span``;

const Summary = (props) => {
  const currency = useContext(CurrencyContext);
  const outcomeSum = getOutcomeSum(props.database).toFixed(2);
  const incomeSum = getIncomeSum(props.database).toFixed(2);

  return (
    <SummaryWrapper>
      <SummaryItem title={`${incomeSum} ${currency}`}>
        <SummaryTitle>Income:</SummaryTitle>
        <SummaryAmount>{incomeSum}</SummaryAmount>
        <SummaryCurrency>{currency}</SummaryCurrency>
      </SummaryItem>
      <SummaryItem title={`${outcomeSum} ${currency}`}>
        <SummaryTitle>Outcome:</SummaryTitle>
        <SummaryAmount>{outcomeSum}</SummaryAmount>
        <SummaryCurrency>{currency}</SummaryCurrency>
      </SummaryItem>
      <SummaryItem title={`${(incomeSum - outcomeSum).toFixed(2)} ${currency}`}>
        <SummaryTitle>Savings:</SummaryTitle>
        <SummaryAmount>{(incomeSum - outcomeSum).toFixed(2)}</SummaryAmount>
        <SummaryCurrency>{currency}</SummaryCurrency>
      </SummaryItem>
    </SummaryWrapper>
  );
};

export default Summary;
