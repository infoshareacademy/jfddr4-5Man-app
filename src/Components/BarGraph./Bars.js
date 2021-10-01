import styled from "styled-components";
import OneBar from "./OneBar";

const BarsWrapper = styled.div`
  display: flex;
  height: 500px;
  align-items: flex-end;
  margin-right: 20px;
`;

const Bars = () => {
  return (
    <BarsWrapper>
      <OneBar index={0}></OneBar>
      <OneBar index={1}></OneBar>
      <OneBar index={2}></OneBar>
      <OneBar index={3}></OneBar>
      <OneBar index={4}></OneBar>
      <OneBar index={5}></OneBar>
      <OneBar index={6}></OneBar>
      <OneBar index={7}></OneBar>
      <OneBar index={8}></OneBar>
      <OneBar index={9}></OneBar>
      <OneBar index={10}></OneBar>
      <OneBar index={11}></OneBar>
      <OneBar index={12}></OneBar>
      <OneBar index={13}></OneBar>
      <OneBar index={14}></OneBar>
      <OneBar index={15}></OneBar>
      <OneBar index={16}></OneBar>
      <OneBar index={17}></OneBar>
      <OneBar index={18}></OneBar>
      <OneBar index={19}></OneBar>
      <OneBar index={20}></OneBar>
      <OneBar index={21}></OneBar>
      <OneBar index={22}></OneBar>
      <OneBar index={23}></OneBar>
      <OneBar index={24}></OneBar>
      <OneBar index={25}></OneBar>
      <OneBar index={26}></OneBar>
      <OneBar index={27}></OneBar>
      <OneBar index={28}></OneBar>
      <OneBar index={29}></OneBar>
      <OneBar index={30}></OneBar>
    </BarsWrapper>
  );
};

export default Bars;
