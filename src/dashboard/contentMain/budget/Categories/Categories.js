import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import { grey } from "@mui/material/colors";

const CategoriesWrapper = styled.div`
  height: 100%;
  width: 500px;
  min-width: 500px;
  border-right: 1px solid #d0d0d0;
  display: flex;
  flex-direction: column;
  padding: 25px;
  letter-spacing: 1px;
`;
const OneCategory = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  padding: 10px;
  border-radius: 25px;
  transition: background-color 0.2s ease-out;
  :hover {
    background-color: ${(props) => props.theme.hoverCategoriesColor};
  }
`;
const OneCategoryIncome = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
`;
const CategoryCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 35px;
`;
const CategoryName = styled.p`
  font-size: 30px;
`;
const CategoriesTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 50px;
`;
const CategoryId = styled.div`
  display: none;
`;
const CategoryColor = styled.div`
  display: none;
`;
const CategoryPlanner = styled.div`
  display: none;
`;

export const Categories = (props) => {
  return (
    <CategoriesWrapper>
      <CategoriesTitle>Categories</CategoriesTitle>
      {props.categories.map((category) => {
        if (category.name === "Income") {
          return (
            <OneCategoryIncome key={category.name}>
              <CategoryCircle
                style={{ backgroundColor: category.color }}
              ></CategoryCircle>
              <CategoryName>{category.name}</CategoryName>
            </OneCategoryIncome>
          );
        } else {
          return (
            <OneCategory
              key={category.name}
              onClick={(event) => {
                props.setCategoryData({
                  name: event.currentTarget.childNodes[1].outerText,
                  initialName: event.currentTarget.childNodes[1].outerText,
                  id: event.currentTarget.childNodes[2].outerText,
                  color: event.currentTarget.childNodes[3].outerText,
                  plannerOn:
                    event.currentTarget.childNodes[4].outerText === "true"
                      ? true
                      : false,
                });
                document
                  .querySelector(".opaquePanel")
                  .classList.add("displayed");
                document
                  .querySelector(".coverPanel")
                  .classList.add("displayed");
                document
                  .querySelector(".categoryForm")
                  .classList.add("displayed");
              }}
            >
              <CategoryCircle
                style={{ backgroundColor: category.color }}
              ></CategoryCircle>
              <CategoryName>{category.name}</CategoryName>
              <CategoryId>{category.id}</CategoryId>
              <CategoryColor>{category.color}</CategoryColor>
              <CategoryPlanner>{category.plannerOn}</CategoryPlanner>
            </OneCategory>
          );
        }
      })}
      {props.categories.length < 8 && (
        <OneCategory
          key="addCategory"
          onClick={() => {
            props.setCategoryData({
              name: "",
              initialName: "",
              id: "",
              color: "",
              plannerOn: false,
            });
            document.querySelector(".opaquePanel").classList.add("displayed");
            document.querySelector(".coverPanel").classList.add("displayed");
            document.querySelector(".categoryForm").classList.add("displayed");
          }}
        >
          <CategoryCircle style={{ backgroundColor: "#1C31E3" }}>
            <AddIcon sx={{ color: grey[50], fontSize: 60 }}></AddIcon>
          </CategoryCircle>
          <CategoryName>Add category</CategoryName>
        </OneCategory>
      )}
    </CategoriesWrapper>
  );
};
