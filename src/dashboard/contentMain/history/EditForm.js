import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

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
  height: fit-content;
  font-size: 15px;
  color: red;
  margin-bottom: 20px;
  text-align: center;
`;

export const EditForm = (props) => {
  const [errorMessage, setErrorMessage] = useState("");

  const setCategoryMenuItems = (categories) => {
    return categories.map((data) => {
      return (
        <MenuItem key={data.id} value={data.id}>
          {data.id}
        </MenuItem>
      );
    });
  };

  return (
    props.transactionData && (
      <FormWrapper>
        <ErrorWrapper></ErrorWrapper>
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
              });
            }}
          >
            {props.categories.length !== 0 &&
              setCategoryMenuItems(props.categories)}
          </Select>
        </FormControl>
      </FormWrapper>
    )
  );
};
