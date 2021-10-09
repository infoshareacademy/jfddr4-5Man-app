import { Button } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { ConfirmForm } from "./ConfirmForm";
import { OnOffForm } from "./OnOffForm";
import { PicturePicker, picturesToDisplay } from "./PicturePicker";
import { TextForm } from "./TextForm";

const SettingsWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  position: relative;
`;
const OneSettingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 5px;
  width: fit-content;
`;
const OneSettingDisplayed = styled.div`
  margin-left: 10px;
  height: 37px;
  display: flex;
  align-items: center;
`;
const CoverPanel = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: none;
  z-index: 9;
`;
const OpaquePanel = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: none;
  z-index: 8;
  background-color: #b5b5b5;
  opacity: 0.9;
`;
const TextFormOutsideWrapper = styled.div`
  display: none;
`;
const OnOffFormOutsideWrapper = styled.div`
  display: none;
`;
const ConfirmFormOutsideWrapper = styled.div`
  display: none;
`;
const PicturePickerOutsideWrapper = styled.div`
  display: none;
`;

export const Setting = (props) => {
  const [currency, changeCurrency] = useState("");
  const [type, changeType] = useState("");
  const [nickname, changeNickname] = useState("");
  const [nightmode, changeNightmode] = useState("");
  const [categoryColors, changeCategoryColors] = useState("");
  const [picture, changePicture] = useState("");
  const pictures = picturesToDisplay;
  return (
    <SettingsWrapper>
      {props.userInfo && (
        <>
          <OneSettingWrapper>
            <Button
              variant="contained"
              onClick={() => {
                document
                  .querySelector(".opaquePanel")
                  .classList.add("displayed");
                document
                  .querySelector(".coverPanel")
                  .classList.add("displayed");
                document.querySelector(".textForm").classList.add("displayed");
                changeCurrency(
                  props.userInfo.find((data) => {
                    return data.id === "Currency";
                  }).currency
                );
                changeType("currency");
              }}
            >
              Currency
            </Button>
            <OneSettingDisplayed>
              {props.userInfo.find((data) => {
                return data.id === "Currency";
              })
                ? props.userInfo.find((data) => {
                    return data.id === "Currency";
                  }).currency
                : ""}
            </OneSettingDisplayed>
          </OneSettingWrapper>
          <OneSettingWrapper>
            <Button
              variant="contained"
              onClick={() => {
                document
                  .querySelector(".opaquePanel")
                  .classList.add("displayed");
                document
                  .querySelector(".coverPanel")
                  .classList.add("displayed");
                document.querySelector(".onOffForm").classList.add("displayed");
                changeType("nightmode");
                changeNightmode(
                  props.userInfo.find((data) => {
                    return data.id === "Nightmode";
                  }).isOn
                );
              }}
            >
              Nightmode
            </Button>
            <OneSettingDisplayed>
              {props.userInfo.find((data) => {
                return data.id === "Nightmode";
              })
                ? props.userInfo.find((data) => {
                    return data.id === "Nightmode";
                  }).isOn === "true"
                  ? "ON"
                  : "OFF"
                : ""}
            </OneSettingDisplayed>
          </OneSettingWrapper>
          <OneSettingWrapper>
            <Button
              variant="contained"
              onClick={() => {
                document
                  .querySelector(".opaquePanel")
                  .classList.add("displayed");
                document
                  .querySelector(".coverPanel")
                  .classList.add("displayed");
                document.querySelector(".onOffForm").classList.add("displayed");
                changeType("categoryColors");
                changeCategoryColors(
                  props.userInfo.find((data) => {
                    return data.id === "CategoryColors";
                  }).isOn
                );
              }}
            >
              Category colors
            </Button>
            <OneSettingDisplayed>
              {props.userInfo.find((data) => {
                return data.id === "CategoryColors";
              })
                ? props.userInfo.find((data) => {
                    return data.id === "CategoryColors";
                  }).isOn === "true"
                  ? "ON"
                  : "OFF"
                : ""}
            </OneSettingDisplayed>
          </OneSettingWrapper>
          <OneSettingWrapper>
            <Button
              variant="contained"
              onClick={() => {
                document
                  .querySelector(".opaquePanel")
                  .classList.add("displayed");
                document
                  .querySelector(".coverPanel")
                  .classList.add("displayed");
                document.querySelector(".textForm").classList.add("displayed");
                changeNickname(
                  props.userInfo.find((data) => {
                    return data.id === "Nickname";
                  }).nickname
                );
                changeType("nickname");
              }}
            >
              Nickname
            </Button>
            <OneSettingDisplayed>
              {props.userInfo.find((data) => {
                return data.id === "Nickname";
              })
                ? props.userInfo.find((data) => {
                    return data.id === "Nickname";
                  }).nickname
                : ""}
            </OneSettingDisplayed>
          </OneSettingWrapper>
          <OneSettingWrapper>
            <Button
              variant="contained"
              onClick={() => {
                document
                  .querySelector(".opaquePanel")
                  .classList.add("displayed");
                document
                  .querySelector(".coverPanel")
                  .classList.add("displayed");
                document
                  .querySelector(".picturePicker")
                  .classList.add("displayed");
                changePicture(
                  props.userInfo.find((data) => {
                    return data.id === "Picture";
                  }).number
                );
              }}
            >
              Picture
            </Button>
            <OneSettingDisplayed>
              {
                pictures[
                  props.userInfo.find((data) => {
                    return data.id === "Picture";
                  })
                    ? props.userInfo.find((data) => {
                        return data.id === "Picture";
                      }).number
                    : ""
                ]
              }
            </OneSettingDisplayed>
          </OneSettingWrapper>
          <OneSettingWrapper>
            <Button
              variant="contained"
              onClick={() => {
                document
                  .querySelector(".opaquePanel")
                  .classList.add("displayed");
                document
                  .querySelector(".coverPanel")
                  .classList.add("displayed");
                document
                  .querySelector(".confirmForm")
                  .classList.add("displayed");
              }}
            >
              Logout
            </Button>
          </OneSettingWrapper>
          <OneSettingWrapper>
            <Button
              variant="contained"
              onClick={() => {
                document
                  .querySelector(".opaquePanel")
                  .classList.add("displayed");
                document
                  .querySelector(".coverPanel")
                  .classList.add("displayed");
                document.querySelector(".textForm").classList.add("displayed");
                changeType("password");
              }}
            >
              Change password
            </Button>
          </OneSettingWrapper>
          <OneSettingWrapper>
            <Button
              variant="contained"
              onClick={() => {
                document
                  .querySelector(".opaquePanel")
                  .classList.add("displayed");
                document
                  .querySelector(".coverPanel")
                  .classList.add("displayed");
                document.querySelector(".textForm").classList.add("displayed");
                changeType("email");
              }}
            >
              Change email
            </Button>
          </OneSettingWrapper>
          <OneSettingWrapper>
            <Button
              variant="contained"
              onClick={() => {
                document
                  .querySelector(".opaquePanel")
                  .classList.add("displayed");
                document
                  .querySelector(".coverPanel")
                  .classList.add("displayed");
                document
                  .querySelector(".confirmForm")
                  .classList.add("displayed");
              }}
            >
              Clear all data
            </Button>
          </OneSettingWrapper>
          <OneSettingWrapper>
            <Button
              variant="contained"
              onClick={() => {
                document
                  .querySelector(".opaquePanel")
                  .classList.add("displayed");
                document
                  .querySelector(".coverPanel")
                  .classList.add("displayed");
                document
                  .querySelector(".confirmForm")
                  .classList.add("displayed");
              }}
            >
              Delete account
            </Button>
          </OneSettingWrapper>
        </>
      )}
      <CoverPanel className="coverPanel">
        <TextFormOutsideWrapper className="textForm">
          <TextForm
            currency={currency}
            changeCurrency={changeCurrency}
            type={type}
            changeType={changeType}
            nickname={nickname}
            changeNickname={changeNickname}
          ></TextForm>
        </TextFormOutsideWrapper>
        <OnOffFormOutsideWrapper className="onOffForm">
          <OnOffForm
            nightmode={nightmode}
            categoryColors={categoryColors}
            changeNightmode={changeNightmode}
            changeCategoryColors={changeCategoryColors}
            type={type}
            changeType={changeType}
          ></OnOffForm>
        </OnOffFormOutsideWrapper>
        <ConfirmFormOutsideWrapper className="confirmForm">
          <ConfirmForm></ConfirmForm>
        </ConfirmFormOutsideWrapper>
        <PicturePickerOutsideWrapper className="picturePicker">
          <PicturePicker
            picture={picture}
            changePicture={changePicture}
          ></PicturePicker>
        </PicturePickerOutsideWrapper>
      </CoverPanel>
      <OpaquePanel className="opaquePanel"></OpaquePanel>
    </SettingsWrapper>
  );
};
