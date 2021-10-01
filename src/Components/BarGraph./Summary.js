import { useContext } from "react";
import styled from "styled-components";
import { incomeSumContext, outcomeSumContext } from "./SummaryContext";

const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const Summary = () => {
  const incomeSum = useContext(incomeSumContext);
  const outcomeSum = useContext(outcomeSumContext);

  return (
    <SummaryWrapper>
      <SummaryItem title={incomeSum}>
        <SummaryTitle>Income:</SummaryTitle>
        <SummaryAmount>{incomeSum}</SummaryAmount>
        <SummaryCurrency> PLN</SummaryCurrency>
      </SummaryItem>
      <SummaryItem title={outcomeSum}>
        <SummaryTitle>Outcome:</SummaryTitle>
        <SummaryAmount>{outcomeSum}</SummaryAmount>
        <SummaryCurrency>PLN</SummaryCurrency>
      </SummaryItem>
      <SummaryItem title={incomeSum - outcomeSum}>
        <SummaryTitle>Savings:</SummaryTitle>
        <SummaryAmount>{incomeSum - outcomeSum}</SummaryAmount>
        <SummaryCurrency>PLN</SummaryCurrency>
      </SummaryItem>
    </SummaryWrapper>
  );
};

export default Summary;
