import { useContext } from "react";
import styled from "styled-components";
import { myDatabase } from "./db";
import { maxValueContext, daysMaxValuesContext } from "./GraphContext";

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
  const maxValue = useContext(maxValueContext);
  const daysMaxValues = useContext(daysMaxValuesContext);

  return (
    <BarWrapper
      style={{ height: `${(daysMaxValues[props.index] / maxValue) * 100}%` }}
    >
      {myDatabase.map((data) => {
        return (
          <OneSegment
            style={{
              backgroundColor: data.color,
              height: `${
                data.name === "Income"
                  ? data.dataPoints[props.index] !== undefined
                    ? data.dataPoints[props.index].y !== 0
                      ? 10
                      : 0
                    : 0
                  : data.dataPoints.length !== 0
                  ? (data.dataPoints[props.index] !== undefined
                      ? data.dataPoints[props.index].y /
                        daysMaxValues[props.index]
                      : 0) * 100
                  : 0
              }%`,
              marginBottom: `${
                data.dataPoints[props.index] !== undefined
                  ? data.dataPoints[props.index].y !== 0
                    ? "3px"
                    : 0
                  : 0
              }`,
              minHeight: `${
                data.dataPoints[props.index] !== undefined
                  ? data.dataPoints[props.index].y !== 0
                    ? "7.5px"
                    : 0
                  : 0
              }`,
              order: `${data.name === "Income" ? 98 : props.index}`,
              border: `${
                data.name === "Income"
                  ? data.dataPoints[props.index] !== undefined
                    ? data.dataPoints[props.index].y !== 0
                      ? "3px dashed darkred"
                      : 0
                    : 0
                  : 0
              }`,
            }}
            key={data.name.toString()}
            title={
              data.dataPoints[props.index] !== undefined
                ? `${data.dataPoints[props.index].y} PLN`
                : ""
            }
          ></OneSegment>
        );
      })}
      <SegmentDate>{props.index + 1}</SegmentDate>
    </BarWrapper>
  );
};

export default OneBar;
