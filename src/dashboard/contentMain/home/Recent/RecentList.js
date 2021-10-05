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
`;
const ListItemCategory = styled.span`
  font-size: 25px;
  color: white;
  width: 100px;
`;
const ListItemAmount = styled.span`
  font-size: 25px;
  font-weight: bold;
  color: white;
`;
const ListItemDate = styled.span`
  font-size: 25px;
  color: white;
  width: 130px;
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
    <div>
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
    </div>
  );
};
