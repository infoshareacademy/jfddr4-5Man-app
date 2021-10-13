import {
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../../UserContext";
import {
  deleteTransaction,
  updateBudgetForExistingTransaction,
  updatePlannerForTransactionChange,
  updateTransaction,
} from "../../../firebase";
import { setCategoryMenuItems } from "./utils";

const FormInsideWrapper = styled.div`
  padding: 20px;
  background-color: ${(props) => props.theme.formsBackground};
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  z-index: 10;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;
const ConfirmButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ErrorWrapper = styled.div`
  width: 372px;
  height: 15px;
  font-size: 15px;
  color: red;
  margin-bottom: 20px;
  text-align: center;
`;
const ConfirmWrapper = styled.div`
  display: none;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;
const ConfirmMessage = styled.span`
  color: red;
  letter-spacing: 1px;
  margin-right: 15px;
`;
const buttonNormalStyles = {
  backgroundColor: "#5350E9",
  borderRadius: "25px",
  color: "#FFFFFF",
  fontWeight: "bold",
  letterSpacing: "1px",
  fontSize: "20px",
  marginRight: "20px",
  "&:last-of-type": { marginRight: "0px" },
  "&:hover": { backgroundColor: "#333193" },
};
const buttonRedStyles = {
  backgroundColor: "#C10A0A",
  borderRadius: "25px",
  color: "#FFFFFF",
  fontWeight: "bold",
  letterSpacing: "1px",
  fontSize: "20px",
  marginRight: "20px",
  "&:last-of-type": { marginRight: "0px" },
  "&:hover": { backgroundColor: "#730606" },
};
const textFieldStyles = {
  marginBottom: "20px",
  "& label": { color: "#5350E9" },
  "& label.Mui-focused": {
    color: "#333193",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#5350E9",
    },
    "&:hover fieldset": {
      borderColor: "#5350E9",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#333193",
    },
  },
};
const selectStyles = {
  "& label": { color: "#5350E9" },
  "& label.Mui-focused": {
    color: "#333193",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#5350E9",
    },
    "&:hover fieldset": {
      borderColor: "#5350E9",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#333193",
    },
  },
  "& .MuiList-root": { backgroundColor: "#5350E9" },
};

export const EditForm = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const currentUser = useContext(UserContext);

  const goBackHandler = () => {
    props.setTransactionData("");
    setErrorMessage("");
    document.querySelector(".opaquePanel").classList.remove("displayed");
    document.querySelector(".coverPanel").classList.remove("displayed");
    document.querySelector(".historyForm").classList.remove("displayed");
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
      <FormInsideWrapper>
        <ErrorWrapper>{errorMessage}</ErrorWrapper>
        <TextField
          sx={textFieldStyles}
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
              event.target.value.length < 11 &&
              decimalValidation(event.target.value)
            ) {
              props.setTransactionData({
                category: props.transactionData.category,
                description: props.transactionData.description,
                amount: event.target.value,
                id: props.transactionData.id,
                initialAmount: props.transactionData.initialAmount,
                initialCategory: props.transactionData.initialCategory,
              });
            }
          }}
        ></TextField>
        <TextField
          sx={textFieldStyles}
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
                initialCategory: props.transactionData.initialCategory,
              });
            }
          }}
        ></TextField>
        <FormControl sx={selectStyles}>
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
                initialCategory: props.transactionData.initialCategory,
              });
            }}
          >
            {props.categories.length !== 0 &&
              setCategoryMenuItems(props.categories)}
          </Select>
        </FormControl>
        <ButtonsWrapper>
          <Button
            variant="contained"
            sx={buttonNormalStyles}
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
                  props.transactionData.initialAmount,
                  props.transactionData.category,
                  props.transactionData.initialCategory
                );
                updatePlannerForTransactionChange(
                  currentUser,
                  props.transactionData.initialCategory === "Income"
                    ? "noData"
                    : props.categories.find((category) => {
                        return (
                          category.name ===
                          props.transactionData.initialCategory
                        );
                      }).planner,
                  props.transactionData.category === "Income"
                    ? "noData"
                    : props.categories.find((category) => {
                        return category.name === props.transactionData.category;
                      }).planner,
                  props.transactionData.initialCategory === "Income"
                    ? "noData"
                    : props.categories.find((category) => {
                        return (
                          category.name ===
                          props.transactionData.initialCategory
                        );
                      }).plannerOn,
                  props.transactionData.category === "Income"
                    ? "noData"
                    : props.categories.find((category) => {
                        return category.name === props.transactionData.category;
                      }).plannerOn,
                  props.transactionData.initialAmount,
                  props.transactionData.amount,
                  props.transactionData.initialCategory,
                  props.transactionData.category,
                  props.transactionData.initialCategory === "Income"
                    ? "Income"
                    : props.categories.find((category) => {
                        return (
                          category.name ===
                          props.transactionData.initialCategory
                        );
                      }).id,
                  props.transactionData.category === "Income"
                    ? "Icome"
                    : props.categories.find((category) => {
                        return category.name === props.transactionData.category;
                      }).id
                );
                goBackHandler();
              }
            }}
          >
            EDIT
          </Button>
          <Button
            variant="contained"
            sx={buttonNormalStyles}
            onClick={() => {
              goBackHandler();
            }}
          >
            GO BACK
          </Button>
          <Button
            variant="contained"
            sx={buttonRedStyles}
            onClick={() => {
              document
                .querySelector(".confirmWrapper")
                .classList.add("displayed");
            }}
          >
            DELETE
          </Button>
        </ButtonsWrapper>
        <ConfirmWrapper className="confirmWrapper">
          <ConfirmMessage>Are you sure ?</ConfirmMessage>
          <ConfirmButtonsWrapper>
            <Button
              variant="contained"
              sx={buttonRedStyles}
              onClick={() => {
                deleteTransaction(currentUser, props.transactionData.id);
                updateBudgetForExistingTransaction(
                  currentUser,
                  props.totalBudget,
                  0,
                  props.transactionData.initialAmount,
                  props.transactionData.category,
                  props.transactionData.initialCategory
                );
                document
                  .querySelector(".confirmWrapper")
                  .classList.remove("displayed");
                goBackHandler();
              }}
            >
              YES
            </Button>
            <Button
              variant="contained"
              sx={buttonNormalStyles}
              onClick={() => {
                document
                  .querySelector(".confirmWrapper")
                  .classList.remove("displayed");
              }}
            >
              NO
            </Button>
          </ConfirmButtonsWrapper>
        </ConfirmWrapper>
      </FormInsideWrapper>
    )
  );
};
