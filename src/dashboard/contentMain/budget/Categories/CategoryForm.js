import {
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from "@mui/material";
import { red, yellow } from "@mui/material/colors";
import { useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import {
  addCategory,
  deleteCategory,
  deleteTransactionsForCategoryDelete,
  updateCategory,
  updateTransactionsForCategoryChange,
} from "../../../../firebase";
import { UserContext } from "../../../../UserContext";

const CategoryFormInsideWrapper = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ButtonsWrapper = styled.div`
  display: flex;
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
  width: 300px;
  font-size: 15px;
`;
const ColorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 50px;
  font-size: 20px;
`;
const CategoryColor = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-left: 15px;
  cursor: pointer;
`;
const ColorAndPlannerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
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
const switchStyles = {
  width: "fit-content",
  "& .MuiTypography-root": { fontSize: "20px", marginLeft: "10px" },
  "& .MuiSwitch-switchBase": {
    "& .MuiSwitch-thumb": { backgroundColor: "#5350E9" },
    "&.Mui-checked": {
      "& + .MuiSwitch-track": { backgroundColor: "#333193", opacity: 1 },
    },
  },
};

export const CategoryForm = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const currentUser = useContext(UserContext);
  const goBackHandler = () => {
    props.setCategoryData("");
    setErrorMessage("");
    document.querySelector(".categoryForm").classList.remove("displayed");
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
    if (props.categoryData.color === "") {
      setErrorMessage("Choose color");
      valid = false;
      return valid;
    }
    return valid;
  };

  return (
    <CategoryFormInsideWrapper>
      {props.categoryData.initialName !== "" ? (
        <>
          <ErrorWrapper>{errorMessage}</ErrorWrapper>
          <TextField
            sx={textFieldStyles}
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
                  plannerOn: props.categoryData.plannerOn,
                });
              }
            }}
          ></TextField>
          <ColorAndPlannerWrapper>
            <ColorWrapper>
              Color:
              <CategoryColor
                style={{ backgroundColor: props.categoryData.color }}
                onClick={() => {
                  document
                    .querySelector(".colorPicker")
                    .classList.add("displayed");
                }}
              ></CategoryColor>
            </ColorWrapper>
            {props.categoryData && (
              <FormGroup sx={switchStyles}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={props.categoryData.plannerOn}
                      onChange={(event) => {
                        props.setCategoryData({
                          name: props.categoryData.name,
                          initialName: props.categoryData.initialName,
                          id: props.categoryData.id,
                          color: props.categoryData.color,
                          plannerOn: event.target.checked,
                        });
                      }}
                    />
                  }
                  label="Planner"
                />
              </FormGroup>
            )}
          </ColorAndPlannerWrapper>
          <ButtonsWrapper>
            <Button
              variant="outlined"
              sx={buttonNormalStyles}
              onClick={() => {
                if (validate() === true) {
                  updateCategory(
                    currentUser,
                    props.categoryData.color,
                    props.categoryData.name,
                    props.categoryData.id,
                    props.categoryData.plannerOn
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
              sx={buttonNormalStyles}
              onClick={() => {
                goBackHandler();
              }}
            >
              GO BACK
            </Button>
            <Button
              variant="outlined"
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
            <ConfirmMessage>
              Are you sure ?<br />
              This will delete all the transactions for the given category, but
              will not update your budget.
            </ConfirmMessage>
            <ButtonsWrapper>
              <Button
                variant="outlined"
                sx={buttonRedStyles}
                onClick={() => {
                  deleteCategory(currentUser, props.categoryData.id);
                  deleteTransactionsForCategoryDelete(
                    currentUser,
                    props.categoryData.initialName,
                    props.transactions
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
                variant="outlined"
                sx={buttonNormalStyles}
                onClick={() => {
                  document
                    .querySelector(".confirmWrapper")
                    .classList.remove("displayed");
                }}
              >
                NO
              </Button>
            </ButtonsWrapper>
          </ConfirmWrapper>
        </>
      ) : (
        <>
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
                  plannerOn: props.categoryData.plannerOn,
                });
              }
            }}
          ></TextField>
          <ColorAndPlannerWrapper>
            <ColorWrapper>
              Color:
              <CategoryColor
                style={
                  props.categoryData.color !== ""
                    ? { backgroundColor: props.categoryData.color }
                    : { backgroundColor: "black" }
                }
                onClick={() => {
                  document
                    .querySelector(".colorPicker")
                    .classList.add("displayed");
                }}
              ></CategoryColor>
            </ColorWrapper>
            {props.categoryData && (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={props.categoryData.plannerOn}
                      onChange={(event) => {
                        props.setCategoryData({
                          name: props.categoryData.name,
                          initialName: props.categoryData.initialName,
                          id: props.categoryData.id,
                          color: props.categoryData.color,
                          plannerOn: event.target.checked,
                        });
                      }}
                    />
                  }
                  label="Planner"
                />
              </FormGroup>
            )}
          </ColorAndPlannerWrapper>
          <ButtonsWrapper>
            <Button
              variant="outlined"
              sx={{ color: yellow[500], fontSize: 20 }}
              onClick={() => {
                if (validate() === true) {
                  addCategory(
                    currentUser,
                    props.categoryData.name,
                    props.categoryData.color,
                    props.categoryData.plannerOn
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
        </>
      )}
    </CategoryFormInsideWrapper>
  );
};
