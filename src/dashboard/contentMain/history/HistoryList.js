import { useContext } from "react";
import styled from "styled-components";
import { CurrencyContext } from "../CurrencyContext";
import { DateContext } from "../DateContext";
import { getDate, orderAndFilterData } from "./utils";

const HistoryListWrapper = styled.div``;
const ListItem = styled.div`
  height: 75px;
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const ListItemCategory = styled.span`
  font-size: 35px;
  color: black;
  width: 270px;
`;
const ListItemAmount = styled.span`
  font-size: 30px;
  font-weight: bold;
  color: black;
  width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;
const ListItemDate = styled.span`
  font-size: 25px;
  color: black;
  width: 130px;
`;
const ListItemDescription = styled.span`
  font-size: 25px;
  color: black;
  width: 405px;
  text-align: center;
`;
const ListItemId = styled.span`
  display: none;
`;

export const HistoryList = (props) => {
  const currency = useContext(CurrencyContext);
  const date = useContext(DateContext);

  return (
    <HistoryListWrapper>
      {orderAndFilterData(
        props.database,
        props.sortOrder,
        props.category,
        date
      ).map((data) => {
        return (
          <ListItem
            key={data.id}
            style={{ backgroundColor: data.color }}
            onClick={(event) => {
              props.setTransactionData({
                category: event.currentTarget.childNodes[0].outerText,
                description: event.currentTarget.childNodes[1].outerText,
                amount:
                  +event.currentTarget.childNodes[2].outerText.split(" ")[0],
                id: event.currentTarget.childNodes[4].outerText,
                initialAmount:
                  +event.currentTarget.childNodes[2].outerText.split(" ")[0],
                initialCategory: event.currentTarget.childNodes[0].outerText,
              });
              document.querySelector(".opaquePanel").classList.add("displayed");
              document.querySelector(".coverPanel").classList.add("displayed");
            }}
          >
            <ListItemCategory>{data.category}</ListItemCategory>
            <ListItemDescription>{data.description}</ListItemDescription>
            <ListItemAmount>{`${
              data.amount && data.amount.toFixed(2)
            } ${currency}`}</ListItemAmount>
            <ListItemDate>{getDate(data.date)}</ListItemDate>
            <ListItemId>{data.id}</ListItemId>
          </ListItem>
        );
      })}
    </HistoryListWrapper>
  );
};
