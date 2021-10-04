import { useContext } from "react";
import styled from "styled-components";
import { CurrencyContext } from "../../CurrencyContext";
import {
  getDailyMaxValue,
  getMaxValue,
  setBarHeight,
  setSegmentTitle,
  setBorder,
  setMarginBottom,
  setMinHeight,
  setOrder,
  setSegmentHeight,
} from "./utils";
import { v4 as uuidv4 } from "uuid";

const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-right: 15px;
  width: 20px;
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
  const maxValue = getMaxValue(props.database);
  const daysMaxValues = getDailyMaxValue(props.database);
  return (
    <BarWrapper
      style={{ height: `${setBarHeight(daysMaxValues, props.day, maxValue)}%` }}
    >
      {props.database.map((data1) => {
        return data1.dataPoints.map((data2) => {
          return (
            <OneSegment
              style={{
                backgroundColor: data1.color,
                height: `${setSegmentHeight(
                  data2,
                  data1,
                  props.day,
                  daysMaxValues
                )}%`,
                marginBottom: setMarginBottom(data2, props.day),
                minHeight: setMinHeight(data2, data1, props.day),
                order: setOrder(data1, props.day),
                border: setBorder(data2, data1, props.day),
              }}
              title={`${setSegmentTitle(data2, props.day)} ${currency}`}
              key={uuidv4()}
            ></OneSegment>
          );
        });
      })}
      <SegmentDate>{props.day}</SegmentDate>
    </BarWrapper>
  );
};

export default OneBar;
