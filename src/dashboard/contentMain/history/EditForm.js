import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import styled from "styled-components";
import { yellow, red } from "@mui/material/colors";
import { UserContext } from "../../../UserContext";
import {
  updateBudgetForExistingTransaction,
  updateTransaction,
} from "../../../firebase";

const FormWrapper = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  z-index: 10;
`;
const ButtonsWrapper = styled.div`
  display: flex;
`;
const ErrorWrapper = styled.div`
  width: 235px;
  height: 15px;
  font-size: 15px;
  color: red;
  margin-bottom: 20px;
  text-align: center;
`;

export const EditForm = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const currentUser = useContext(UserContext);

  const setCategoryMenuItems = (categories) => {
    return categories.map((data) => {
      return (
        <MenuItem key={data.id} value={data.id}>
          {data.id}
        </MenuItem>
      );
    });
  };

  const goBackHandler = () => {
    props.setTransactionData("");
    document.querySelector(".opaquePanel").classList.remove("displayed");
    document.querySelector(".coverPanel").classList.remove("displayed");
  };

  const validate = () => {
    let valid = true;
    if (props.transactionData.amount <= 0) {
      setErrorMessage("Invalid amount");
      valid = false;
      return valid;
    }
    return valid;
  };

  return (
    props.transactionData && (
      <FormWrapper>
        <ErrorWrapper>{errorMessage}</ErrorWrapper>
        <TextField
          label="Amount"
          type="number"
          value={props.transactionData.amount}
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
              props.setTransactionData({
                category: props.transactionData.category,
                description: props.transactionData.description,
                amount: event.target.value,
                id: props.transactionData.id,
                initialAmount: props.transactionData.initialAmount,
              });
            }
          }}
        ></TextField>
        <TextField
          label="Description"
          value={props.transactionData.description}
          onChange={(event) => {
            if (event.target.value.length < 30) {
              props.setTransactionData({
                category: props.transactionData.category,
                description: event.target.value,
                amount: props.transactionData.amount,
                id: props.transactionData.id,
                initialAmount: props.transactionData.initialAmount,
              });
            }
          }}
        ></TextField>
        <FormControl>
          <InputLabel id="categorySelect">Category</InputLabel>
          <Select
            labelId="categorySelect"
            label="Category"
            value={props.transactionData.category}
            onChange={(event) => {
              props.setTransactionData({
                category: event.target.value,
                description: props.transactionData.description,
                amount: props.transactionData.amount,
                id: props.transactionData.id,
                initialAmount: props.transactionData.initialAmount,
              });
            }}
          >
            {props.categories.length !== 0 &&
              setCategoryMenuItems(props.categories)}
          </Select>
        </FormControl>
        <ButtonsWrapper>
          <Button
            variant="outlined"
            sx={{ color: yellow[500], fontSize: 20 }}
            onClick={() => {
              if (validate() === true) {
                updateTransaction(
                  currentUser,
                  props.transactionData.amount,
                  props.transactionData.description,
                  props.transactionData.category,
                  props.transactionData.id
                );
                updateBudgetForExistingTransaction(
                  currentUser,
                  props.totalBudget,
                  props.transactionData.amount,
                  props.transactionData.initialAmount
                );
                goBackHandler();
              }
            }}
          >
            ADD
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
      </FormWrapper>
    )
  );
};
