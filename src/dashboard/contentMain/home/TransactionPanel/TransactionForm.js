import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { yellow, red } from "@mui/material/colors";
import { UserContext } from "../../../../UserContext";
import { addTransaction, updateBudget } from "../../../../firebase";

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
const DateWrapper = styled.div`
  display: flex;
`;
const ErrorWrapper = styled.div`
  width: 200px;
  height: 15px;
  font-size: 15px;
  color: red;
  margin-bottom: 20px;
`;

export const TransactionForm = (props) => {
  const [category, chooseCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [errorMessage, setErrorMessage] = useState("");
  const currentUser = useContext(UserContext);

  const setCategoryMenuItems = (categories) => {
    return categories.map((data) => {
      return data.id !== "Income" ? (
        <MenuItem key={data.id} value={data.id}>
          {data.id}
        </MenuItem>
      ) : (
        ""
      );
    });
  };

  const setYearMenuItems = () => {
    const currentYear = new Date().getFullYear();
    const arrayToReturn = [
      currentYear,
      currentYear - 1,
      currentYear - 2,
      currentYear - 3,
      currentYear - 4,
      currentYear - 5,
      currentYear - 6,
      currentYear - 7,
      currentYear - 8,
      currentYear - 9,
      currentYear - 10,
    ];
    return arrayToReturn.map((data) => {
      return (
        <MenuItem key={data} value={data}>
          {data}
        </MenuItem>
      );
    });
  };

  const setMonthMenuItems = () => {
    const currentMonth = new Date().getMonth() + 1;
    const months = [];
    for (let i = 1; i <= currentMonth; i++) {
      months.push(i);
    }
    return months.reverse().map((data) => {
      return (
        <MenuItem key={data} value={data}>
          {data < 10 ? `0${data}` : data}
        </MenuItem>
      );
    });
  };

  const setDayMenuItems = () => {
    const currentDay = new Date().getDate();
    const days = [];
    for (let i = 1; i <= currentDay; i++) {
      days.push(i);
    }
    return days.reverse().map((data) => {
      return (
        <MenuItem key={data} value={data}>
          {data < 10 ? `0${data}` : data}
        </MenuItem>
      );
    });
  };

  const goBackHandler = () => {
    setAmount("");
    setDescription("");
    chooseCategory("");
    document.querySelector(".opaquePanel").classList.remove("displayed");
    document.querySelector(".coverPanel").classList.remove("displayed");
  };

  const validate = () => {
    let valid = true;
    if (amount <= 0) {
      setErrorMessage("Invalid amount");
      valid = false;
      return valid;
    }
    if (props.type === "outcome") {
      if (category === "") {
        setErrorMessage("Please choose category");
        valid = false;
        return valid;
      }
    }
    return valid;
  };

  return (
    <FormWrapper>
      <ErrorWrapper>{errorMessage}</ErrorWrapper>
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(event) => {
          setAmount(event.target.value);
        }}
      ></TextField>
      <TextField
        label="Description"
        value={description}
        onChange={(event) => {
          if (event.target.value.length < 30) {
            setDescription(event.target.value);
          }
        }}
      ></TextField>
      <DateWrapper>
        <FormControl>
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
            {setDayMenuItems()}
          </Select>
        </FormControl>
        <FormControl>
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
            {setMonthMenuItems()}
          </Select>
        </FormControl>
        <FormControl>
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
      {props.type === "outcome" ? (
        <FormControl>
          <InputLabel id="categorySelect">Category</InputLabel>
          <Select
            labelId="categorySelect"
            label="Category"
            value={category}
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
      <ButtonsWrapper>
        <Button
          variant="outlined"
          sx={{ color: yellow[500], fontSize: 20 }}
          onClick={() => {
            if (validate() === true) {
              addTransaction(
                currentUser,
                amount,
                description,
                props.type === "outcome" ? category : "Income",
                date
              );
              updateBudget(
                currentUser,
                props.totalBudget,
                props.type === "outcome" ? -amount : +amount
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
  );
};
