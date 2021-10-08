import { Button, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { red, yellow } from "@mui/material/colors";
import { useContext } from "react";
import styled from "styled-components";
import { updateCategoryColors, updateNightmode } from "../../../firebase";
import { UserContext } from "../../../UserContext";

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

export const OnOffForm = (props) => {
  const currentUser = useContext(UserContext);

  const goBackHandler = () => {
    props.changeType("");
    document.querySelector(".opaquePanel").classList.remove("displayed");
    document.querySelector(".coverPanel").classList.remove("displayed");
    document.querySelector(".onOffForm").classList.remove("displayed");
  };

  return (
    <>
      {props.type === "nightmode" && (
        <FormWrapper>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={props.nightmode === "true" ? true : false}
                  onChange={(event) => {
                    props.changeNightmode(
                      event.target.checked === true ? "true" : "false"
                    );
                  }}
                />
              }
              label="Nightmode"
            />
          </FormGroup>
          <ButtonsWrapper>
            <Button
              variant="outlined"
              sx={{ color: yellow[500], fontSize: 20 }}
              onClick={() => {
                updateNightmode(currentUser, props.nightmode);
                goBackHandler();
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
        </FormWrapper>
      )}

      {props.type === "categoryColors" && (
        <FormWrapper>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={props.categoryColors === "true" ? true : false}
                  onChange={(event) => {
                    props.changeCategoryColors(
                      event.target.checked === true ? "true" : "false"
                    );
                  }}
                />
              }
              label="Category colors"
            />
          </FormGroup>
          <ButtonsWrapper>
            <Button
              variant="outlined"
              sx={{ color: yellow[500], fontSize: 20 }}
              onClick={() => {
                updateCategoryColors(currentUser, props.categoryColors);
                goBackHandler();
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
        </FormWrapper>
      )}
    </>
  );
};
