import { Button, TextField } from "@mui/material";
import { red, yellow } from "@mui/material/colors";
import { useContext, useState } from "react";
import styled from "styled-components";
import { updateCurrency, updateNickname } from "../../../firebase";
import { UserContext } from "../../../UserContext";

const ErrorWrapper = styled.div`
  width: 235px;
  height: fit-content;
  font-size: 15px;
  color: red;
  margin-bottom: 20px;
  text-align: center;
`;
const TextFormInsideWrapper = styled.div`
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

export const TextForm = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const currentUser = useContext(UserContext);

  const goBackHandler = () => {
    props.changeType("");
    setErrorMessage("");
    document.querySelector(".opaquePanel").classList.remove("displayed");
    document.querySelector(".coverPanel").classList.remove("displayed");
    document.querySelector(".textForm").classList.remove("displayed");
  };

  const validateCurrency = () => {
    let valid = true;
    if (props.currency.length === 0) {
      setErrorMessage("Invalid currency");
      valid = false;
      return valid;
    }
    return valid;
  };
  const validateNickname = () => {
    let valid = true;
    if (props.nickname.length === 0) {
      setErrorMessage("Invalid nickname");
      valid = false;
      return valid;
    }
    return valid;
  };

  return (
    <>
      {props.type === "currency" && (
        <TextFormInsideWrapper>
          <ErrorWrapper>{errorMessage}</ErrorWrapper>
          <TextField
            label="Currency"
            type="text"
            value={props.currency}
            onChange={(event) => {
              if (event.target.value.length < 6) {
                props.changeCurrency(event.target.value);
              }
            }}
          ></TextField>
          <ButtonsWrapper>
            <Button
              variant="outlined"
              sx={{ color: yellow[500], fontSize: 20 }}
              onClick={() => {
                if (validateCurrency() === true) {
                  updateCurrency(currentUser, props.currency);
                  goBackHandler();
                }
              }}
            >
              CHANGE
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
        </TextFormInsideWrapper>
      )}

      {props.type === "nickname" && (
        <TextFormInsideWrapper>
          <ErrorWrapper>{errorMessage}</ErrorWrapper>
          <TextField
            label="Nickname"
            type="text"
            value={props.nickname}
            onChange={(event) => {
              if (event.target.value.length < 20) {
                props.changeNickname(event.target.value);
              }
            }}
          ></TextField>
          <ButtonsWrapper>
            <Button
              variant="outlined"
              sx={{ color: yellow[500], fontSize: 20 }}
              onClick={() => {
                if (validateNickname() === true) {
                  updateNickname(currentUser, props.nickname);
                  goBackHandler();
                }
              }}
            >
              CHANGE
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
        </TextFormInsideWrapper>
      )}
    </>
  );
};
