import { useContext } from "react";
import styled from "styled-components";
import { CurrencyContext } from "../../CurrencyContext";

const ListItem = styled.div`
  height: 60px;
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  color: black;
  border-radius: 25px;
  border: 2px solid #5350e9;
  :last-of-type {
    margin-bottom: 0px;
  }
`;
const ListItemCategory = styled.span`
  font-size: 25px;
  min-width: 150px;
`;
const ListItemAmount = styled.span`
  font-size: 25px;
  font-weight: bold;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  right: 10px;
`;
const ListItemDate = styled.span`
  font-size: 20px;
  width: 110px;
`;
const ListItemWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 0 15px 0 0;
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

export const RecentList = (props) => {
  const currency = useContext(CurrencyContext);

  const orderAndLimitData = (database, amount) => {
    if (database.length === 0) {
      return [];
    } else {
      const sortedDatabase = database
        .sort((data1, data2) => {
          return data2.date - data1.date;
        })
        .slice(0, amount);
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
    <ListItemWrapper>
      {orderAndLimitData(props.database, 10).map((data) => {
        return (
          <ListItem key={data.id} style={{ backgroundColor: data.color }}>
            <ListItemCategory>{data.category}</ListItemCategory>
            <ListItemAmount>{`${
              data.amount && data.amount.toFixed(2)
            } ${currency}`}</ListItemAmount>
            <ListItemDate>{getDate(data.date)}</ListItemDate>
          </ListItem>
        );
      })}
    </ListItemWrapper>
  );
};
