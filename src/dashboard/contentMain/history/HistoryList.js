import { useContext } from "react";
import styled from "styled-components";
import { CurrencyContext } from "../CurrencyContext";
import { DateContext } from "../DateContext";

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
  width: 170px;
`;
const ListItemAmount = styled.span`
  font-size: 30px;
  font-weight: bold;
  color: black;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  width: 276px;
`;
const ListItemDate = styled.span`
  font-size: 25px;
  color: black;
  width: 130px;
`;
const ListItemDescription = styled.span`
  font-size: 25px;
  color: black;
`;
const ListItemId = styled.span`
  display: none;
`;

export const HistoryList = (props) => {
  const currency = useContext(CurrencyContext);
  const date = useContext(DateContext);

  const orderAndFilterData = (database, order, category, date) => {
    if (database.length === 0) {
      return [];
    } else {
      const sortedDatabase = database
        .map((data1) => {
          const date = new Date(data1.date);
          return {
            ...data1,
            month: date.getMonth() + 1,
            year: date.getFullYear(),
          };
        })
        .filter((data2) => data2.year === date.year)
        .filter((data3) => data3.month === date.month)
        .filter((data4) =>
          category === "All" ? data4 === data4 : data4.category === category
        )
        .sort((data5, data6) => {
          return order === "newest"
            ? data6.date - data5.date
            : data5.date - data6.date;
        });
      return sortedDatabase;
    }
  };

  const getDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}.${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }.${date.getFullYear()}`;
  };

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
