import { useState } from "react";
import styled from "styled-components";
import { HistoryList } from "./HistoryList";
import { HistoryNav } from "./HistoryNav";
import { EditForm } from "./EditForm";

const HistoryWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  min-width: 1290px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 15px;
  }
  ::-webkit-scrollbar-track {
    background: #b3b2e6;
  }
  ::-webkit-scrollbar-thumb {
    background: #5350e9;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #333193;
  }
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

export const History = (props) => {
  const [sortOrder, setSortOrder] = useState("newest");
  const [category, chooseCategory] = useState("All");
  const [transactionData, setTransactionData] = useState("");
  return (
    <HistoryWrapper>
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
      <CoverPanel className="coverPanel">
        <EditForm
          transactionData={transactionData}
          setTransactionData={setTransactionData}
          categories={props.categories}
          totalBudget={props.totalBudget}
        ></EditForm>
      </CoverPanel>
      <OpaquePanel className="opaquePanel"></OpaquePanel>
    </HistoryWrapper>
  );
};
