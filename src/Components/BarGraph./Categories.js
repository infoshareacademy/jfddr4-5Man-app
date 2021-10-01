import styled from "styled-components";
import { myDatabase } from "./db";
import { useContext } from "react";
import { outcomeSumContext } from "./SummaryContext";

const OneCategory = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
`;
const CategoryColor = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 15px;
  :hover {
    opacity: 0.6;
  }
  cursor: default;
`;
const CategoryName = styled.p``;
const CategoriesWrapper = styled.div`
  display: flex;
  margin-bottom: 40px;
`;
const moneyImage = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M12.164 7.165c-1.15.191-1.702 1.233-1.231 2.328.498 1.155 1.921 1.895 3.094 1.603 1.039-.257 1.519-1.252 1.069-2.295-.471-1.095-1.784-1.827-2.932-1.636zm1.484 2.998l.104.229-.219.045-.097-.219c-.226.041-.482.035-.719-.027l-.065-.387c.195.03.438.058.623.02l.125-.041c.221-.109.152-.387-.176-.453-.245-.054-.893-.014-1.135-.552-.136-.304-.035-.621.356-.766l-.108-.239.217-.045.104.229c.159-.026.345-.036.563-.017l.087.383c-.17-.021-.353-.041-.512-.008l-.06.016c-.309.082-.21.375.064.446.453.105.994.139 1.208.612.173.385-.028.648-.36.774zm10.312 1.057l-3.766-8.22c-6.178 4.004-13.007-.318-17.951 4.454l3.765 8.22c5.298-4.492 12.519-.238 17.952-4.454zm-2.803-1.852c-.375.521-.653 1.117-.819 1.741-3.593 1.094-7.891-.201-12.018 1.241-.667-.354-1.503-.576-2.189-.556l-1.135-2.487c.432-.525.772-1.325.918-2.094 3.399-1.226 7.652.155 12.198-1.401.521.346 1.13.597 1.73.721l1.315 2.835zm2.843 5.642c-6.857 3.941-12.399-1.424-19.5 5.99l-4.5-9.97 1.402-1.463 3.807 8.406-.002.007c7.445-5.595 11.195-1.176 18.109-4.563.294.648.565 1.332.684 1.593z"
    />
  </svg>
);

const Categories = () => {
  const outcomeSum = useContext(outcomeSumContext);

  return (
    <CategoriesWrapper>
      {myDatabase.map((category) => {
        return (
          <OneCategory key={category.name.toString()}>
            <CategoryColor
              style={{ backgroundColor: category.color }}
              title={
                category.dataPoints[0] !== undefined
                  ? `${category.dataPoints
                      .map((data) => {
                        return data.y;
                      })
                      .reduce((data1, data2) => {
                        return data1 + data2;
                      })} PLN`
                  : "0 PLN"
              }
            >
              {category.name === "Income"
                ? moneyImage
                : `${Math.round(
                    category.dataPoints[0] !== undefined
                      ? (category.dataPoints
                          .map((data) => {
                            return data.y;
                          })
                          .reduce((data1, data2) => {
                            return data1 + data2;
                          }) /
                          outcomeSum) *
                          100
                      : 0
                  )}%`}
            </CategoryColor>
            <CategoryName>{category.name}</CategoryName>
          </OneCategory>
        );
      })}
    </CategoriesWrapper>
  );
};

export default Categories;
