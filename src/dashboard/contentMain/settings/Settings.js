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
  padding: 50px 30px 30px 50px;
  position: relative;
`;
const OneSettingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 5px;
  width: fit-content;
`;
const OneSettingDisplayed = styled.div`
  margin-left: 25px;
  padding-left: 25px;
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 30px;
  letter-spacing: 1px;
  border-left: 2px solid #d0d0d0;
`;
const UserImage = styled.div`
  background-color: white;
  width: 60px;
  height: 60px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  img {
    width: 50px;
    height: 50px;
  }
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
  background-color: ${(props) => props.theme.opaqueColor};
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
const normalButtonStyle = {
  backgroundColor: "#5350E9",
  fontSize: 20,
  width: 280,
  borderRadius: 25,
  color: "#FFFFFF",
  fontWeight: "bold",
  letterSpacing: 1,
  height: 60,
  "&:hover": { backgroundColor: "#333193" },
};
const redButtonStyle = {
  backgroundColor: "#5350E9",
  fontSize: 20,
  width: 280,
  borderRadius: 25,
  color: "#800C0C",
  fontWeight: "bold",
  letterSpacing: 1,
  height: 60,
  "&:hover": { backgroundColor: "#333193" },
};

export const Setting = (props) => {
  const [currency, changeCurrency] = useState("");
  const [type, changeType] = useState("");
  const [nickname, changeNickname] = useState("");
  const [nightmode, changeNightmode] = useState("");
  const [categoryColors, changeCategoryColors] = useState("");
  const [picture, changePicture] = useState("");
  const [password, changePassword] = useState("");
  const [repeatPassword, changeRepeatPassword] = useState("");
  const [email, changeEmail] = useState("");
  const pictures = picturesToDisplay;
  return (
    <SettingsWrapper>
      {props.userInfo && (
        <>
          <OneSettingWrapper>
            <Button
              sx={normalButtonStyle}
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
              sx={normalButtonStyle}
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
              sx={normalButtonStyle}
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
              sx={normalButtonStyle}
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
              sx={normalButtonStyle}
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
              <UserImage>
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
              </UserImage>
            </OneSettingDisplayed>
          </OneSettingWrapper>
          <OneSettingWrapper>
            <Button
              sx={normalButtonStyle}
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
              sx={normalButtonStyle}
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
              sx={redButtonStyle}
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
                changeType("clearData");
              }}
            >
              Clear all data
            </Button>
          </OneSettingWrapper>
          <OneSettingWrapper>
            <Button
              sx={redButtonStyle}
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
                changeType("deleteAccount");
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
            password={password}
            changePassword={changePassword}
            repeatPassword={repeatPassword}
            changeRepeatPassword={changeRepeatPassword}
            email={email}
            changeEmail={changeEmail}
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
          <ConfirmForm
            type={type}
            changeType={changeType}
            categories={props.categories}
            transactions={props.transactions}
          ></ConfirmForm>
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
