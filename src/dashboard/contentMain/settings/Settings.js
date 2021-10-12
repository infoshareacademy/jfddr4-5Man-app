import { Button } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { animateForm, animateOpaquePanel } from "../animations";
import { getDate } from "../history/utils";
import { ConfirmForm } from "./ConfirmForm";
import { OnOffForm } from "./OnOffForm";
import { PicturePicker, picturesToDisplay } from "./PicturePicker";
import { TextForm } from "./TextForm";

const SettingsWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  position: relative;
`;
const SettingsInsideWrapper = styled.div`
  background-color: ${(props) => props.theme.contentBackground};
  border-radius: 25px;
  height: 100%;
  padding: 20px 20px;
  display: flex;
`;
const OneSettingRow = styled.div`
  margin-right: 90px;
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
  background-color: ${(props) => props.theme.opaqueBackground};
  opacity: 0.9;
`;
const TextFormOutsideWrapper = styled.div`
  display: none;
  transform-origin: center;
`;
const OnOffFormOutsideWrapper = styled.div`
  display: none;
  transform-origin: center;
`;
const ConfirmFormOutsideWrapper = styled.div`
  display: none;
  transform-origin: center;
`;
const PicturePickerOutsideWrapper = styled.div`
  display: none;
  transform-origin: center;
`;
const TimeDisplay = styled.span`
  display: block;
  margin-left: auto;
  margin-right: 40px;
  text-align: center;
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
  minWidth: "280px",
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
  const [chart, changeChart] = useState("");
  const pictures = picturesToDisplay;
  return (
    <SettingsWrapper>
      {props.userInfo && (
        <SettingsInsideWrapper>
          <OneSettingRow>
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
                    .querySelector(".textForm")
                    .classList.add("displayed");
                  changeCurrency(
                    props.userInfo.find((data) => {
                      return data.id === "Currency";
                    }).currency
                  );
                  changeType("currency");
                  animateForm("textForm");
                  animateOpaquePanel();
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
                  document
                    .querySelector(".onOffForm")
                    .classList.add("displayed");
                  changeType("nightmode");
                  changeNightmode(
                    props.userInfo.find((data) => {
                      return data.id === "Nightmode";
                    }).isOn
                  );
                  animateForm("onOffForm");
                  animateOpaquePanel();
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
                  document
                    .querySelector(".onOffForm")
                    .classList.add("displayed");
                  changeType("categoryColors");
                  changeCategoryColors(
                    props.userInfo.find((data) => {
                      return data.id === "CategoryColors";
                    }).isOn
                  );
                  animateForm("onOffForm");
                  animateOpaquePanel();
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
                  document
                    .querySelector(".onOffForm")
                    .classList.add("displayed");
                  changeType("chartsSelector");
                  changeChart(
                    props.userInfo.find((data) => {
                      return data.id === "InitialChart";
                    }).chart
                  );
                  animateForm("onOffForm");
                  animateOpaquePanel();
                }}
              >
                Initial Chart
              </Button>
              <OneSettingDisplayed>
                {props.userInfo.find((data) => {
                  return data.id === "InitialChart";
                })
                  ? props.userInfo.find((data) => {
                      return data.id === "InitialChart";
                    }).chart === "piechart"
                    ? "Pie Chart"
                    : "Bar Chart"
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
                    .querySelector(".textForm")
                    .classList.add("displayed");
                  changeNickname(
                    props.userInfo.find((data) => {
                      return data.id === "Nickname";
                    }).nickname
                  );
                  changeType("nickname");
                  animateForm("textForm");
                  animateOpaquePanel();
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
                  animateForm("picturePicker");
                  animateOpaquePanel();
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
          </OneSettingRow>
          <OneSettingRow>
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
                    .querySelector(".textForm")
                    .classList.add("displayed");
                  changeType("password");
                  animateForm("textForm");
                  animateOpaquePanel();
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
                  document
                    .querySelector(".textForm")
                    .classList.add("displayed");
                  changeType("email");
                  animateForm("textForm");
                  animateOpaquePanel();
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
                  animateForm("confirmForm");
                  animateOpaquePanel();
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
                  animateForm("confirmForm");
                  animateOpaquePanel();
                }}
              >
                Delete account
              </Button>
            </OneSettingWrapper>
          </OneSettingRow>
          <TimeDisplay>
            {`Account since : ${
              props.userInfo.find((data) => {
                return data.id === "AccountSince";
              })
                ? getDate(
                    props.userInfo.find((data) => {
                      return data.id === "AccountSince";
                    }).date
                  )
                : ""
            }`}
          </TimeDisplay>
        </SettingsInsideWrapper>
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
            chart={chart}
            changeChart={changeChart}
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
