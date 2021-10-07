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
`;

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
              variant="outlined"
              sx={{ color: yellow[500], fontSize: 20 }}
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
              variant="outlined"
              sx={{ color: red[500], fontSize: 20 }}
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
