import Categories from "./Categories";
import styled from "styled-components";
import Bars from "./Bars";
import Summary from "./Summary";

const Wrapper = styled.div`
  display: flex;
`;

const BarGraph = () => {
  return (
    <Wrapper>
      <div>
        <Categories></Categories>
        <Bars></Bars>
      </div>
      <Summary></Summary>
    </Wrapper>
  );
};

export default BarGraph;
