import { Button } from "@mui/material";
import { red } from "@mui/material/colors";
import styled from "styled-components";

const ColorPickerInsideWrapper = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
`;
const ColorsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: content-box;
  width: 360px;
  height: 240px;
  margin-bottom: 20px;
`;
const OneColor = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin: 5px;
  cursor: pointer;
`;
const ColorName = styled.div`
  display: none;
`;

export const ColorPicker = (props) => {
  const colorsToDisplay = [
    "Aqua",
    "Blue",
    "BlueViolet",
    "Brown",
    "Chocolate",
    "Crimson",
    "DarkBlue",
    "DarkMagenta",
    "DarkRed",
    "Red",
    "DeepPink",
    "DarkKhaki",
    "Grey",
    "Gold",
    "Indigo",
    "Yellow",
    "Purple",
    "Orange",
    "DarkSalmon",
    "Tomato",
    "Teal",
    "Turquoise",
    "Tan",
    "SaddleBrown",
  ];

  return (
    <ColorPickerInsideWrapper>
      <ColorsWrapper>
        {colorsToDisplay.map((color) => {
          return (
            <OneColor
              key={color}
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
        sx={{ color: red[500], fontSize: 20 }}
        onClick={() => {
          document.querySelector(".colorPicker").classList.remove("displayed");
        }}
      >
        GO BACK
      </Button>
    </ColorPickerInsideWrapper>
  );
};
