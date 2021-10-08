import Categories from "./Categories";
import styled from "styled-components";
import Bars from "./Bars";
import Summary from "./Summary";


const Wrapper = styled.div`
  margin: 15px;
  width: fit-content;
`;
const BarsAndSummaryWrapper = styled.div`
  display: flex;
  width: fit-content;
`;

const BarGraph = (props) => {
  return (
    <Wrapper>
      <Categories database={props.database}></Categories>
      <BarsAndSummaryWrapper>
        <Bars database={props.database}></Bars>
        <Summary database={props.database}></Summary>
      </BarsAndSummaryWrapper>
    </Wrapper>
  );
};

export default BarGraph;
