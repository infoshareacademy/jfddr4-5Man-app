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
import { addTransaction } from "../../../../firebase";

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

export const TransactionForm = (props) => {
  const [category, chooseCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
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
    setAmount("");
    setDescription("");
    chooseCategory("");
    document.querySelector(".opaquePanel").classList.remove("displayed");
    document.querySelector(".coverPanel").classList.remove("displayed");
  };

  return (
    <FormWrapper>
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
          setDescription(event.target.value);
        }}
      ></TextField>
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
      <ButtonsWrapper>
        <Button
          variant="outlined"
          sx={{ color: yellow[500], fontSize: 20 }}
          onClick={() => {
            addTransaction(currentUser, amount, description, category);
            goBackHandler();
          }}
        >
          SEND
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
