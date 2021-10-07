import { IconButton } from "@mui/material";
import styled from "styled-components";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { yellow } from "@mui/material/colors";
import { useContext } from "react";
import { CurrencyContext } from "../../CurrencyContext";

const TotalBudgetPanelWrapper = styled.div`
  width: 100%;
  height: 20%;
  border-bottom: 1px solid #d0d0d0;
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;
const TotalBudgetDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
`;
const TotalBudgetText = styled.h3``;
const TotalBudgetAmount = styled.h2``;

export const TotalBudgetPanel = (props) => {
  const currency = useContext(CurrencyContext);
  return (
    <TotalBudgetPanelWrapper>
      {props.totalBudget && (
        <>
          <IconButton>
            <AddCircleIcon sx={{ color: yellow[500], fontSize: 80 }} />
          </IconButton>
          <TotalBudgetDisplay>
            <TotalBudgetText>Total Budget</TotalBudgetText>
            <TotalBudgetAmount>{`${props.totalBudget.toFixed(
              2
            )} ${currency}`}</TotalBudgetAmount>
          </TotalBudgetDisplay>
          <IconButton>
            <RemoveCircleIcon sx={{ color: yellow[500], fontSize: 80 }} />
          </IconButton>
        </>
      )}
    </TotalBudgetPanelWrapper>
  );
};
