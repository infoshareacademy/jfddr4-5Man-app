import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import styled from "styled-components";
import { updateCurrency, updateNickname } from "../../../firebase";
import { UserContext } from "../../../UserContext";

const ErrorWrapper = styled.div`
  width: 274px;
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
  margin-top: 20px;
  justify-content: center;
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
            sx={textFieldStyles}
            mode
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
              sx={buttonStyles}
              variant="contained"
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
              variant="contained"
              sx={buttonStyles}
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
            sx={textFieldStyles}
            label="Nickname"
            type="text"
            value={props.nickname}
            onChange={(event) => {
              if (event.target.value.length < 11) {
                props.changeNickname(event.target.value);
              }
            }}
          ></TextField>
          <ButtonsWrapper>
            <Button
              variant="outlined"
              sx={buttonStyles}
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
              sx={buttonStyles}
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
