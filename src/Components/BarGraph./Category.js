import styled from "styled-components";

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
`;
const CategoryColor = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin-right: 10px;
`;
const CategoryName = styled.p``;

const Category = (props) => {
  const color = { backgroundColor: props.color };
  return (
    <CategoryWrapper>
      <CategoryColor style={color}></CategoryColor>
      <CategoryName>{props.name}</CategoryName>
    </CategoryWrapper>
  );
};

export default Category;
