import { useContext } from "react";
import styled from "styled-components";
import { CurrencyContext } from "../CurrencyContext";
import { myDatabase } from "./db";
import {
  getDailyMaxValue,
  getMaxValue,
  setBarHeight,
  setBarTitle,
  setBorder,
  setMarginBottom,
  setMinHeight,
  setOrder,
  setSegmentHeight,
} from "./utils";

const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-right: 15px;
  align-items: center;
`;

const OneSegment = styled.div`
  width: 20px;
  :hover {
    opacity: 0.6;
  }
`;
const SegmentDate = styled.div`
  margin-top: 5px;
  order: 99;
`;

const OneBar = (props) => {
  const currency = useContext(CurrencyContext);
  const maxValue = getMaxValue(myDatabase);
  const daysMaxValues = getDailyMaxValue(myDatabase);

  return (
    <BarWrapper
      style={{ height: `${setBarHeight(daysMaxValues, props.day, maxValue)}%` }}
    >
      {myDatabase.map((data) => {
        return (
          <OneSegment
            style={{
              backgroundColor: data.color,
              height: `${setSegmentHeight(data, props.day, daysMaxValues)}%`,
              marginBottom: setMarginBottom(data, props.day),
              minHeight: setMinHeight(data, props.day),
              order: setOrder(data, props.day),
              border: setBorder(data, props.day),
            }}
            key={data.name.toString()}
            title={`${setBarTitle(data, props.day)} ${currency}`}
          ></OneSegment>
        );
      })}
      <SegmentDate>{props.day}</SegmentDate>
    </BarWrapper>
  );
};

export default OneBar;
