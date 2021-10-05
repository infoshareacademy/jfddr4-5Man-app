import { useState } from "react";
import styled from "styled-components";
import { HistoryList } from "./HistoryList";
import { HistoryNav } from "./HistoryNav";

const HistoryWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
`;

export const History = (props) => {
  const [sortOrder, setSortOrder] = useState("newest");
  const [category, chooseCategory] = useState("All");
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
      ></HistoryList>
    </HistoryWrapper>
  );
};
