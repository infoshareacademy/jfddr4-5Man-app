import styled from "styled-components";
import { useContext } from "react";
import { CurrencyContext } from "../../CurrencyContext";

const PlannerWrapper = styled.div`
  width: 100%;
  height: 80%;
  padding: 20px;
`;
const PlannerTitle = styled.h2`
  font-size: 50px;
  margin-bottom: 20px;
`;
const PlannerItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 15px;
  height: 75px;
  justify-content: space-between;
  :hover {
    opacity: 0.8;
  }
  position: relative;
`;
const PlannerItemTitle = styled.span`
  font-size: 30px;
  font-weight: bold;
  width: 230px;
  margin-left: 15px;
`;
const PlannerItemAmount = styled.span`
  width: 310px;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  margin-right: 30px;
`;
const PlannerItemId = styled.div`
  display: none;
`;

export const Planner = (props) => {
  const currency = useContext(CurrencyContext);
  return (
    <PlannerWrapper>
      <PlannerTitle>Planner</PlannerTitle>
      {props.categories &&
        props.categories.map((category) => {
          return (
            category.name !== "Income" && (
              <PlannerItemWrapper
                key={category.id}
                title={`${category.planner.toFixed(2)} ${currency}`}
                style={
                  category.plannerOn === "true"
                    ? { backgroundColor: category.color, cursor: "pointer" }
                    : { backgroundColor: "grey", cursor: "not-allowed" }
                }
                onClick={(event) => {
                  category.plannerOn === "true" &&
                    props.setPlannerData({
                      id: event.currentTarget.childNodes[2].outerText,
                      amount:
                        event.currentTarget.childNodes[1].outerText.split(
                          " "
                        )[0],
                    });
                  category.plannerOn === "true" &&
                    document
                      .querySelector(".opaquePanel")
                      .classList.add("displayed");
                  category.plannerOn === "true" &&
                    document
                      .querySelector(".coverPanel")
                      .classList.add("displayed");
                  category.plannerOn === "true" &&
                    document
                      .querySelector(".plannerForm")
                      .classList.add("displayed");
                }}
              >
                <PlannerItemTitle>{category.name}</PlannerItemTitle>
                <PlannerItemAmount>
                  {`${
                    category.planner.toFixed(2).toString().length < 11
                      ? category.planner.toFixed(2)
                      : category.planner > 0
                      ? "9999999999..."
                      : "-9999999999..."
                  } ${currency}`}
                </PlannerItemAmount>
                <PlannerItemId>{category.id}</PlannerItemId>
              </PlannerItemWrapper>
            )
          );
        })}
    </PlannerWrapper>
  );
};
