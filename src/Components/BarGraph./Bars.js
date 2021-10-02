import styled from "styled-components";
import OneBar from "./OneBar";

const BarsWrapper = styled.div`
  display: flex;
  height: 500px;
  align-items: flex-end;
  margin-right: 20px;
`;

const Bars = () => {
  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  return (
    <BarsWrapper>
      {days.map((data) => {
        return <OneBar key={data} day={data}></OneBar>;
      })}
    </BarsWrapper>
  );
};

export default Bars;
