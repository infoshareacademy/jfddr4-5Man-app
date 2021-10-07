import { Button, TextField } from "@mui/material";
import { red, yellow } from "@mui/material/colors";
import { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { updateBudget } from "../../../../firebase";
import { UserContext } from "../../../../UserContext";

const TotalBudgetFormInsideWrapper = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
`;
const ErrorWrapper = styled.div`
  width: 320px;
  height: 15px;
  font-size: 15px;
  color: red;
  margin-bottom: 20px;
  text-align: center;
`;
const ButtonsWrapper = styled.div`
  display: flex;
`;

export const TotalBudgetForm = (props) => {
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const currentUser = useContext(UserContext);

  const validate = () => {
    let valid = true;
    if (amount <= 0) {
      setErrorMessage("Invalid amount");
      valid = false;
      return valid;
    }

    return valid;
  };

  const goBackHandler = () => {
    setAmount("");
    setErrorMessage("");
    document.querySelector(".budgetForm").classList.remove("displayed");
    document.querySelector(".opaquePanel").classList.remove("displayed");
    document.querySelector(".coverPanel").classList.remove("displayed");
  };

  return (
    <TotalBudgetFormInsideWrapper>
      <ErrorWrapper>{errorMessage}</ErrorWrapper>
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(event) => {
          const decimalValidation = (value) => {
            let validate = true;
            if ((value + "").search(/[.]/g) !== -1) {
              if ((value + "").split(".")[1].length > 2) {
                validate = false;
              }
            }
            return validate;
          };
          if (
            event.target.value.length < 15 &&
            decimalValidation(event.target.value)
          ) {
            setAmount(event.target.value);
          }
        }}
      ></TextField>
      <ButtonsWrapper>
        <Button
          variant="outlined"
          sx={{ color: yellow[500], fontSize: 20 }}
          onClick={() => {
            if (validate() === true) {
              let changedAmount = 0;
              if (props.operationType === "add") {
                changedAmount = amount;
              }
              if (props.operationType === "subtract") {
                changedAmount = -amount;
              }
              updateBudget(currentUser, props.totalBudget, changedAmount);
              goBackHandler();
            }
          }}
        >
          {props.operationType === "add" ? "ADD" : "SUBTRACT"}
        </Button>
        <Button
          variant="outlined"
          sx={{ color: red[500], fontSize: 20 }}
          onClick={() => {
            goBackHandler();
          }}
        >
          GO BACK
        </Button>
      </ButtonsWrapper>
    </TotalBudgetFormInsideWrapper>
  );
};
