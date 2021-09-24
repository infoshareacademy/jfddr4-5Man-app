import styled from "styled-components";
import { myDatabase } from "./db";

const maxValueDays = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
];
const maxValuePrep = myDatabase
  .map((data) => {
    return data.dataPoints;
  })
  .forEach((data) => {
    data.forEach((data) => {
      maxValueDays[data.x].push(data.y);
    });
  });
const maxValue = Math.max(
  ...maxValueDays.map((data) => {
    if (data.length != 0) {
      return data.reduce((data1, data2) => {
        return data1 + data2;
      });
    } else {
      return 0;
    }
  })
);
console.log(maxValue);

const BarWrapper = styled.div`
  height: 500px;
`;
const BarsWrapper = styled.div`
  display: flex;
`;
const OneSegment = styled.div`
  width: 20px;
`;
const SegmentDate = styled.div``;

const Bars = () => {
  return (
    <BarsWrapper>
      <BarWrapper>
        {myDatabase.map((data) => {
          return (
            <OneSegment
              style={{
                backgroundColor: data.color,
                height:
                  data.dataPoints.length !== 0
                    ? maxValue * (data.dataPoints[0].y / maxValue)
                    : 0,
              }}
              key={data.name.toString()}
            ></OneSegment>
          );
        })}
        <SegmentDate>01</SegmentDate>
      </BarWrapper>
      <BarWrapper>
        {myDatabase.map((data) => {
          return (
            <OneSegment
              style={{
                backgroundColor: data.color,
                height:
                  data.dataPoints.length !== 0
                    ? maxValue * (data.dataPoints[1].y / maxValue)
                    : 0,
              }}
              key={data.name.toString()}
            ></OneSegment>
          );
        })}
        <SegmentDate>02</SegmentDate>
      </BarWrapper>
      <BarWrapper>
        {myDatabase.map((data) => {
          return (
            <OneSegment
              style={{
                backgroundColor: data.color,
                height:
                  data.dataPoints.length !== 0
                    ? maxValue * (data.dataPoints[2].y / maxValue)
                    : 0,
              }}
              key={data.name.toString()}
            ></OneSegment>
          );
        })}
        <SegmentDate>03</SegmentDate>
      </BarWrapper>
      <BarWrapper></BarWrapper>
      <BarWrapper></BarWrapper>
    </BarsWrapper>
  );
};

export default Bars;
