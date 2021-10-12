import { Button } from "@mui/material";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const ColorPickerInsideWrapper = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ColorsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: content-box;
  width: 480px;
  height: 320px;
  margin-bottom: 20px;
`;
const OneColor = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin: 10px;
  cursor: pointer;
`;
const ColorName = styled.div`
  display: none;
`;
const buttonStyles = {
  backgroundColor: "#5350E9",
  borderRadius: "25px",
  color: "#FFFFFF",
  fontWeight: "bold",
  letterSpacing: "1px",
  fontSize: "20px",
  width: "200px",
  "&:first-of-type": { marginRight: "20px" },
  "&:hover": { backgroundColor: "#333193" },
};

export const ColorPicker = (props) => {
  const colorsToDisplay = [
    "#FF0000",
    "#FF7676",
    "#FF8300",
    "#FFB261",
    "#F3FF00",
    "#F9FF7E",
    "#00FFE8",
    "#A3FFF7",
    "#A3FFF7",
    "#0013FF",
    "#7C00FF",
    "#C996FF",
    "#FF00F3",
    "#FFB2FB",
    "#FF0061",
    "#C1FF00",
    "#EDFFB4",
    "#D4E3E5",
    "#D8FFDE",
    "#B1FFD8",
    "#DEFFB1",
    "#FBECFF",
    "#ECFEFF",
    "#F6EDFF",
  ];

  return (
    <ColorPickerInsideWrapper>
      <ColorsWrapper>
        {colorsToDisplay.map((color) => {
          return (
            <OneColor
              key={uuidv4()}
              onClick={(event) => {
                props.setCategoryData({
                  color: event.currentTarget.childNodes[0].outerText,
                  name: props.categoryData.name,
                  id: props.categoryData.id,
                  initialName: props.categoryData.initialName,
                  plannerOn: props.categoryData.plannerOn,
                });
                document
                  .querySelector(".colorPicker")
                  .classList.remove("displayed");
              }}
              style={{ backgroundColor: color }}
            >
              <ColorName>{color}</ColorName>
            </OneColor>
          );
        })}
      </ColorsWrapper>
      <Button
        variant="outlined"
        sx={buttonStyles}
        onClick={() => {
          document.querySelector(".colorPicker").classList.remove("displayed");
        }}
      >
        GO BACK
      </Button>
    </ColorPickerInsideWrapper>
  );
};
