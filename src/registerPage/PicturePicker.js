import { Button } from "@mui/material";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { picturesToDisplay } from "../dashboard/contentMain/settings/PicturePicker";

const PicturePickerInsideWrapper = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PicturesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: content-box;
  width: 360px;
  height: 270px;
  margin-bottom: 20px;
`;
const ButtonsWrapper = styled.div`
  display: flex;
`;
const OnePicture = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 30px;
  box-sizing: content-box;
  padding: 15px;
  margin: 5px;
  cursor: pointer;
  img {
    width: 50px;
    height: 50px;
  }
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

export const PicturePicker = (props) => {
  const pictures = picturesToDisplay;
  const goBackHandler = () => {
    document.querySelector(".opaquePanel").classList.remove("displayed");
    document.querySelector(".coverPanel").classList.remove("displayed");
    document.querySelector(".picturePicker").classList.remove("displayed");
  };

  return (
    <PicturePickerInsideWrapper>
      <PicturesWrapper>
        {pictures.map((picture) => {
          return (
            <OnePicture
              style={
                pictures.indexOf(picture) === props.picture
                  ? { backgroundColor: "#D2D2D2" }
                  : { backgroundColor: "white" }
              }
              key={uuidv4()}
              onClick={() => {
                props.setPicture(picturesToDisplay.indexOf(picture));
                goBackHandler();
              }}
            >
              {picture}
            </OnePicture>
          );
        })}
      </PicturesWrapper>
      <ButtonsWrapper>
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
    </PicturePickerInsideWrapper>
  );
};
