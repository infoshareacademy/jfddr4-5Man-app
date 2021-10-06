import { Button, TextField } from "@mui/material";
import { red, yellow } from "@mui/material/colors";
import { useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import {
  updateCategory,
  updateTransactionsForCategoryChange,
} from "../../../../firebase";
import { UserContext } from "../../../../UserContext";

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
  width: 320px;
  height: 15px;
  font-size: 15px;
  color: red;
  margin-bottom: 20px;
  text-align: center;
`;
const ConfirmWrapper = styled.div`
  display: none;
  margin-top: 10px;
`;
const ConfirmMessage = styled.span`
  color: red;
`;
const ColorWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const CategoryColor = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-left: 15px;
  cursor: pointer;
`;

export const CategoryForm = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const currentUser = useContext(UserContext);
  const goBackHandler = () => {
    props.setCategoryData("");
    document.querySelector(".opaquePanel").classList.remove("displayed");
    document.querySelector(".coverPanel").classList.remove("displayed");
  };
  const validate = () => {
    let valid = true;
    if (props.categoryData.name <= 0) {
      setErrorMessage("Invalid name");
      valid = false;
      return valid;
    }
    return valid;
  };

  return (
    <FormWrapper>
      <ErrorWrapper>{errorMessage}</ErrorWrapper>
      <TextField
        label="Name"
        type="text"
        value={props.categoryData.name ? props.categoryData.name : ""}
        onChange={(event) => {
          if (event.target.value.length < 11) {
            props.setCategoryData({
              name: event.target.value,
              initialName: props.categoryData.initialName,
              id: props.categoryData.id,
              color: props.categoryData.color,
            });
          }
        }}
      ></TextField>
      <ColorWrapper>
        Color:
        <CategoryColor
          style={{ backgroundColor: props.categoryData.color }}
          onClick={() => {
            document.querySelector(".colorPicker").classList.add("displayed");
          }}
        ></CategoryColor>
      </ColorWrapper>
      <ButtonsWrapper>
        <Button
          variant="outlined"
          sx={{ color: yellow[500], fontSize: 20 }}
          onClick={() => {
            if (validate() === true) {
              updateCategory(
                currentUser,
                props.categoryData.color,
                props.categoryData.name,
                props.categoryData.id
              );
              updateTransactionsForCategoryChange(
                currentUser,
                props.categoryData.initialName,
                props.categoryData.name,
                props.transactions
              );
              goBackHandler();
            }
          }}
        >
          EDIT
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
        <Button
          variant="outlined"
          sx={{ color: red[500], fontSize: 20 }}
          onClick={() => {}}
        >
          DELETE
        </Button>
      </ButtonsWrapper>
      <ConfirmWrapper className="confirmWrapper">
        <ConfirmMessage>Are you sure ?</ConfirmMessage>
        <ButtonsWrapper>
          <Button
            variant="outlined"
            sx={{ color: red[500], fontSize: 20 }}
            onClick={() => {}}
          >
            YES
          </Button>
          <Button
            variant="outlined"
            sx={{ color: red[500], fontSize: 20 }}
            onClick={() => {}}
          >
            NO
          </Button>
        </ButtonsWrapper>
      </ConfirmWrapper>
    </FormWrapper>
  );
};
