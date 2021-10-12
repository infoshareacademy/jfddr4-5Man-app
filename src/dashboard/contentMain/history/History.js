import { useState } from "react";
import styled from "styled-components";
import { HistoryList } from "./HistoryList";
import { HistoryNav } from "./HistoryNav";
import { EditForm } from "./EditForm";

const HistoryWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  min-width: 1290px;
  overflow: hidden;
  position: relative;
`;
const HistoryInsideWrapper = styled.div`
  background-color: ${(props) => props.theme.contentBackground};
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const FormOutsideWrapper = styled.div`
  display: none;
  transform-origin: center;
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
  background-color: ${(props) => props.theme.opaqueBackground};
  opacity: 0.9;
`;

export const History = (props) => {
  const [sortOrder, setSortOrder] = useState("newest");
  const [category, chooseCategory] = useState("All");
  const [transactionData, setTransactionData] = useState("");
  return (
    <HistoryWrapper>
      <HistoryInsideWrapper>
        <HistoryNav
          categories={props.categories}
          setDateToDisplay={props.setDateToDisplay}
          setSortOrder={setSortOrder}
          sortOrder={sortOrder}
          category={category}
          chooseCategory={chooseCategory}
        ></HistoryNav>
        <HistoryList
          database={props.historyDatabase}
          sortOrder={sortOrder}
          category={category}
          setTransactionData={setTransactionData}
        ></HistoryList>
      </HistoryInsideWrapper>
      <CoverPanel className="coverPanel">
        <FormOutsideWrapper className="historyForm">
          <EditForm
            transactionData={transactionData}
            setTransactionData={setTransactionData}
            categories={props.categories}
            totalBudget={props.totalBudget}
          ></EditForm>
        </FormOutsideWrapper>
      </CoverPanel>
      <OpaquePanel className="opaquePanel"></OpaquePanel>
    </HistoryWrapper>
  );
};
