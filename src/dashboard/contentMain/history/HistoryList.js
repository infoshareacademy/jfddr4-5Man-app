import { useContext } from "react";
import styled from "styled-components";
import { animateForm, animateOpaquePanel } from "../animations";
import { CurrencyContext } from "../CurrencyContext";
import { DateContext } from "../DateContext";
import { getDate, orderAndFilterData } from "./utils";

const HistoryListWrapper = styled.div`
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
  padding-right: 50px;
  margin-bottom: 20px;
  overflow-y: auto;
  height: 100%;
  min-width: 650px;
`;
const ListItem = styled.div`
  height: 75px;
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  cursor: pointer;
  border-radius: 25px;
  transition: box-shadow 0.2s ease-out;
  letter-spacing: 1px;
  border: 2px solid #5350e9;
  :hover {
    box-shadow: inset 0px 0px 50px -10px rgba(0, 0, 0, 0.61);
  }
`;
const ListItemCategory = styled.span`
  font-size: 27px;
  color: black;
  width: 270px;
`;
const ListItemAmount = styled.span`
  font-size: 27px;
  font-weight: bold;
  color: black;
  width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;
const ListItemDate = styled.span`
  font-size: 23px;
  color: black;
  width: 130px;
`;
const ListItemDescription = styled.span`
  font-size: 22.5px;
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
              document.querySelector(".historyForm").classList.add("displayed");
              animateForm("historyForm");
              animateOpaquePanel();
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
