import { IconButton } from "@mui/material";
import styled from "styled-components";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { yellow } from "@mui/material/colors";
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
  justify-content: space-between;
`;
const PlannerItemTitle = styled.span`
  font-size: 30px;
  font-weight: bold;
  width: 230px;
`;
const PlannerItemPanelWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;
const PlannerItemPanelAmount = styled.span`
  width: 310px;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
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
                style={{ backgroundColor: category.color }}
              >
                <PlannerItemTitle>{category.name}</PlannerItemTitle>
                <PlannerItemPanelWrapper>
                  <IconButton>
                    <AddCircleIcon sx={{ color: yellow[500], fontSize: 45 }} />
                  </IconButton>
                  <PlannerItemPanelAmount>
                    {`${
                      category.planner.toFixed(2).toString().length < 11
                        ? category.planner.toFixed(2)
                        : category.planner > 0
                        ? "9999999999..."
                        : "-9999999999..."
                    } ${currency}`}
                  </PlannerItemPanelAmount>
                  <IconButton>
                    <RemoveCircleIcon
                      sx={{ color: yellow[500], fontSize: 45 }}
                    />
                  </IconButton>
                </PlannerItemPanelWrapper>
                <PlannerItemId>{category.id}</PlannerItemId>
              </PlannerItemWrapper>
            )
          );
        })}
    </PlannerWrapper>
  );
};
