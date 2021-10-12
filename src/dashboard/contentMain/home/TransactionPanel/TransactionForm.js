import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { Button, FormControl, InputLabel, Select } from "@mui/material";
import { UserContext } from "../../../../UserContext";
import {
  addTransaction,
  updateBudgetForNewTransaction,
  updatePlannerForTransactionAdd,
} from "../../../../firebase";
import {
  setCategoryMenuItems,
  setDayMenuItems,
  setMonthMenuItems,
  setYearMenuItems,
} from "./utils";

const FormInsideWrapper = styled.div`
  padding: 20px;
  background-color: ${(props) => props.theme.formsBackgroundColor};
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  z-index: 10;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const DateWrapper = styled.div`
  display: flex;
`;
const ErrorWrapper = styled.div`
  width: 250px;
  height: fit-content;
  font-size: 15px;
  color: red;
  margin-bottom: 20px;
  text-align: center;
`;
const CategoryWrapper = styled.div`
  width: 250px;
  div {
    width: 250px;
  }
`;
const buttonStyles = {
  backgroundColor: "#5350E9",
  borderRadius: "25px",
  color: "#FFFFFF",
  fontWeight: "bold",
  letterSpacing: "1px",
  fontSize: "20px",
  "&:first-of-type": { marginRight: "20px" },
  "&:hover": { backgroundColor: "#333193" },
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
  marginRight: "20px",
  marginBottom: "20px",
  "&:last-of-type": { marginRight: "0px" },
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

export const TransactionForm = (props) => {
  const [chosenCategory, chooseCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [errorMessage, setErrorMessage] = useState(
    "Please make sure that you set the right date"
  );
  const currentUser = useContext(UserContext);

  const goBackHandler = () => {
    setAmount("");
    setDescription("");
    chooseCategory("");
    setErrorMessage("Please make sure that you set the right date");
    document.querySelector(".opaquePanel").classList.remove("displayed");
    document.querySelector(".coverPanel").classList.remove("displayed");
    document.querySelector(".transactionForm").classList.remove("displayed");
  };

  const validate = () => {
    let valid = true;
    if (amount <= 0) {
      setErrorMessage("Invalid amount");
      valid = false;
      return valid;
    }
    if (props.type === "outcome") {
      if (chosenCategory === "") {
        setErrorMessage("Please choose category");
        valid = false;
        return valid;
      }
    }
    return valid;
  };

  return (
    <FormInsideWrapper>
      <ErrorWrapper>{errorMessage}</ErrorWrapper>
      <TextField
        sx={textFieldStyles}
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
            event.target.value.length < 11 &&
            decimalValidation(event.target.value)
          ) {
            setAmount(event.target.value);
          }
        }}
      ></TextField>
      <TextField
        sx={textFieldStyles}
        label="Description"
        value={description}
        onChange={(event) => {
          if (event.target.value.length < 30) {
            setDescription(event.target.value);
          }
        }}
      ></TextField>
      <DateWrapper>
        <FormControl sx={selectStyles}>
          <InputLabel id="daySelect">Day</InputLabel>
          <Select
            labelId="daySelect"
            label="Day"
            value={date.day}
            onChange={(event) => {
              setDate({
                day: event.target.value,
                month: date.month,
                year: date.year,
              });
            }}
          >
            {setDayMenuItems(date.year, date.month)}
          </Select>
        </FormControl>
        <FormControl sx={selectStyles}>
          <InputLabel id="monthSelect">Month</InputLabel>
          <Select
            labelId="monthSelect"
            label="Month"
            value={date.month}
            onChange={(event) => {
              setDate({
                day: date.day,
                month: event.target.value,
                year: date.year,
              });
            }}
          >
            {setMonthMenuItems(date.year)}
          </Select>
        </FormControl>
        <FormControl sx={selectStyles}>
          <InputLabel id="yearSelect">Category</InputLabel>
          <Select
            labelId="yeatSelect"
            label="year"
            value={date.year}
            onChange={(event) => {
              setDate({
                day: date.day,
                month: date.month,
                year: event.target.value,
              });
            }}
          >
            {setYearMenuItems()}
          </Select>
        </FormControl>
      </DateWrapper>
      <CategoryWrapper>
        {props.type === "outcome" ? (
          <FormControl sx={selectStyles}>
            <InputLabel id="categorySelect">Category</InputLabel>
            <Select
              labelId="categorySelect"
              label="Category"
              value={chosenCategory}
              onChange={(event) => {
                chooseCategory(event.target.value);
              }}
            >
              {props.categories.length !== 0 &&
                setCategoryMenuItems(props.categories)}
            </Select>
          </FormControl>
        ) : (
          ""
        )}
      </CategoryWrapper>
      <ButtonsWrapper>
        <Button
          variant="contained"
          sx={buttonStyles}
          onClick={() => {
            if (validate() === true) {
              addTransaction(
                currentUser,
                amount,
                description,
                props.type === "outcome" ? chosenCategory : "Income",
                date
              );
              updateBudgetForNewTransaction(
                currentUser,
                props.totalBudget,
                props.type === "outcome" ? -amount : +amount
              );
              props.type === "outcome" &&
                updatePlannerForTransactionAdd(
                  currentUser,
                  props.categories.find((category) => {
                    return category.name === chosenCategory;
                  }).planner,
                  props.categories.find((category) => {
                    return category.name === chosenCategory;
                  }).plannerOn,
                  amount,
                  props.categories.find((category) => {
                    return category.name === chosenCategory;
                  }).id
                );
              goBackHandler();
            }
          }}
        >
          ADD
        </Button>
        <Button
          variant="contained"
          sx={buttonStyles}
          onClick={() => {
            goBackHandler();
          }}
        >
          GO BACK
        </Button>
      </ButtonsWrapper>
    </FormInsideWrapper>
  );
};
