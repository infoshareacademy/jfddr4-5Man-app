import { myDatabase } from "./db";
import Category from "./Category";
import styled from "styled-components";
import Bars from "./Bar";

const Wrapper = styled.div`
  display: flex;
`;
const Categories = styled.div`
  display: flex;
`;

const BarGraph = () => {
  return (
    <Wrapper>
      <div>
        <Categories>
          {myDatabase.map((category) => {
            return (
              <Category
                key={category.name.toString()}
                name={category.name}
                color={category.color}
              ></Category>
            );
          })}
        </Categories>
        <Bars></Bars>
      </div>
      {/* <Summary></Summary> */}
    </Wrapper>
  );
};

export default BarGraph;
