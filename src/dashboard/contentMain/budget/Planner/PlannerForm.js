import { Button, TextField } from "@mui/material";
import { red, yellow } from "@mui/material/colors";
import { useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { updatePlanner } from "../../../../firebase";
import { UserContext } from "../../../../UserContext";

const PanelsFormInsideWrapper = styled.div`
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

export const PlannerForm = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const currentUser = useContext(UserContext);

  const validate = () => {
    let valid = true;
    if (props.plannerData.amount < 0) {
      setErrorMessage("Invalid amount");
      valid = false;
      return valid;
    }

    return valid;
  };

  const goBackHandler = () => {
    props.setPlannerData("");
    setErrorMessage("");
    document.querySelector(".plannerForm").classList.remove("displayed");
    document.querySelector(".opaquePanel").classList.remove("displayed");
    document.querySelector(".coverPanel").classList.remove("displayed");
  };

  return (
    <PanelsFormInsideWrapper>
      {props.plannerData && (
        <>
          <ErrorWrapper>{errorMessage}</ErrorWrapper>
          <TextField
            sx={textFieldStyles}
            label="Amount"
            type="number"
            value={props.plannerData.amount}
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
                props.setPlannerData({
                  id: props.plannerData.id,
                  amount: event.target.value,
                });
              }
            }}
          ></TextField>
          <ButtonsWrapper>
            <Button
              variant="contained"
              sx={buttonStyles}
              onClick={() => {
                if (validate() === true) {
                  updatePlanner(
                    currentUser,
                    props.plannerData.id,
                    props.plannerData.amount
                  );
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
        </>
      )}
    </PanelsFormInsideWrapper>
  );
};
