import { Button, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useContext } from "react";
import styled from "styled-components";
import {
  updateCategoryColors,
  updateInitialChart,
  updateNightmode,
} from "../../../firebase";
import { UserContext } from "../../../UserContext";

const OnOffFormInsideWrapper = styled.div`
  padding: 20px;
  background-color: ${(props) => props.theme.formsBackground};
  color: ${(props) => props.theme.formsColor};
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  z-index: 10;
  align-items: center;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
`;
const ChartOptionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ChartOption = styled.span`
  color: black;
  font-size: 20px;
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
const switchChartStyles = {
  width: "fit-content",
  position: "relative",
  left: "15px",
  "& .MuiTypography-root": { fontSize: "20px", marginLeft: "10px" },
  "& .MuiSwitch-switchBase": {
    "& .MuiSwitch-thumb": { backgroundColor: "#5350E9" },
    "&.Mui-checked": {
      "& + .MuiSwitch-track": { backgroundColor: "#000", opacity: 0.38 },
    },
  },
};

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
        <OnOffFormInsideWrapper>
          <FormGroup sx={switchStyles}>
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
              sx={buttonStyles}
              onClick={() => {
                updateNightmode(currentUser, props.nightmode);
                goBackHandler();
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
        </OnOffFormInsideWrapper>
      )}

      {props.type === "categoryColors" && (
        <OnOffFormInsideWrapper>
          <FormGroup sx={switchStyles}>
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
              sx={buttonStyles}
              onClick={() => {
                updateCategoryColors(currentUser, props.categoryColors);
                goBackHandler();
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
        </OnOffFormInsideWrapper>
      )}

      {props.type === "chartsSelector" && (
        <OnOffFormInsideWrapper>
          <ChartOptionsWrapper>
            <ChartOption>Pie Chart</ChartOption>
            <FormGroup sx={switchChartStyles}>
              <FormControlLabel
                control={
                  <Switch
                    checked={props.chart === "barchart" ? true : false}
                    onChange={(event) => {
                      props.changeChart(
                        event.target.checked === true ? "barchart" : "piechart"
                      );
                    }}
                  />
                }
                label=""
              />
            </FormGroup>
            <ChartOption>Bar Chart</ChartOption>
          </ChartOptionsWrapper>
          <ButtonsWrapper>
            <Button
              variant="outlined"
              sx={buttonStyles}
              onClick={() => {
                updateInitialChart(currentUser, props.chart);
                goBackHandler();
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
        </OnOffFormInsideWrapper>
      )}
    </>
  );
};
