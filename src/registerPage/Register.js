import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { TextField } from "@mui/material";
import styled from "styled-components";
import { picturesToDisplay } from "../dashboard/contentMain/settings/PicturePicker";
import { PicturePicker } from "./PicturePicker";
import {
  animateForm,
  animateLoginOrPass,
  animateOpaquePanel,
} from "../dashboard/contentMain/animations";

const MainWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #b3b2e6;
  position: relative;
`;
const MainPanelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  border-radius: 25px;
  background-color: white;
  position: relative;
  top: -50px;
`;
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 100px;
  position: relative;
  top: -50px;
`;
const LogoImage = styled.div`
  width: 100px;
  height: 100px;
  margin-right: 30px;
  img {
    width: 100px;
    height: 100px;
  }
`;
const Logo1 = styled.h2`
  font-size: 45px;
  margin-right: 15px;
  font-weight: bold;
`;
const Logo2 = styled.h2`
  font-size: 45px;
  color: #15810b;
  font-weight: bold;
  text-decoration: underline;
`;
const RegisterInfo = styled.p`
  text-align: center;
  a {
    text-decoration: underline;
    display: block;
    margin-top: 5px;
    color: #333193;
  }
`;
const ErrorWrapper = styled.div`
  width: 235px;
  height: fit-content;
  font-size: 15px;
  color: red;
  margin-bottom: 20px;
  text-align: center;
`;
const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: #5350e9;
`;
const ImageChosen = styled.div`
  width: 50px;
  height: 50px;
  margin-left: 25px;
  cursor: pointer;
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
  background-color: #b5b5b5;
  opacity: 0.9;
`;
const PicturePickerOutsideWrapper = styled.div`
  display: none;
`;
const buttonStyles = {
  backgroundColor: "#5350E9",
  borderRadius: "25px",
  color: "#FFFFFF",
  fontWeight: "bold",
  letterSpacing: "1px",
  fontSize: "20px",
  marginBottom: "20px",
  "&:hover": { backgroundColor: "#333193" },
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

export function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPass, setRegisterPass] = useState("");
  const [registerPassRepeat, setRegisterPassRepeat] = useState("");
  const [registerNickname, setRegisterNickname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [registerPicture, setRegisterPicture] = useState(0);
  const pictures = picturesToDisplay;

  const validate = () => {
    let valid = true;
    if (registerEmail.length === 0) {
      setErrorMessage("Please enter email");
      valid = false;
      return valid;
    }
    if (registerEmail.match(/[@]/g) === null) {
      setErrorMessage("Wrong email");
      valid = false;
      return valid;
    }
    if (registerNickname.length === 0) {
      setErrorMessage("Please enter name");
      valid = false;
      return valid;
    }
    if (registerPass.length === 0) {
      setErrorMessage("Please enter password");
      valid = false;
      return valid;
    }
    if (registerPass.length < 6) {
      setErrorMessage("Password too short");
      valid = false;
      return valid;
    }
    if (registerPassRepeat.length === 0) {
      setErrorMessage("Please repeat password");
      valid = false;
      return valid;
    }
    if (registerPassRepeat !== registerPass) {
      setErrorMessage("Passwords must match");
      valid = false;
      return valid;
    }
    return valid;
  };

  function registerCreateUser() {
    const email = registerEmail;
    const password = registerPass;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const db = getFirestore();

        // CATEGORIES

        setDoc(doc(db, user.uid + " - categories", "Income"), {
          color: "#3BCA2D",
          createdAt: +new Date(),
          name: "Income",
        });

        // USER DATA

        setDoc(doc(db, user.uid + " - data", "Currency"), {
          currency: "PLN",
        });

        setDoc(doc(db, user.uid + " - data", "Nightmode"), {
          isOn: "false",
        });

        setDoc(doc(db, user.uid + " - data", "TotalBudget"), {
          amount: 0,
        });

        setDoc(doc(db, user.uid + " - data", "Nickname"), {
          nickname: registerNickname,
        });

        setDoc(doc(db, user.uid + " - data", "Picture"), {
          number: registerPicture,
        });

        setDoc(doc(db, user.uid + " - data", "CategoryColors"), {
          isOn: "true",
        });

        setDoc(doc(db, user.uid + " - data", "InitialChart"), {
          chart: "piechart",
        });

        // TRANSACTION

        setDoc(doc(db, user.uid + " - transactions", "test"), {
          amount: 1,
          category: "Income",
          date: +new Date(),
          description: "test",
        });

        setRegisterNickname("");
        setRegisterEmail("");
        setRegisterPass("");
        setRegisterPassRepeat("");
        setRegisterPicture(0);
        setErrorMessage("");
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setErrorMessage("Email already in use");
        } else {
          setErrorMessage("Something went wrong :(");
        }
      });
  }

  return (
    <MainWrapper>
      <LogoWrapper>
        <LogoImage>
          <img src="../../../images/logo.png" alt=""></img>
        </LogoImage>
        <Logo1>YOUR</Logo1>
        <Logo2>MONEY</Logo2>
      </LogoWrapper>
      <MainPanelWrapper>
        <ErrorWrapper>{errorMessage}</ErrorWrapper>
        <TextField
          sx={textFieldStyles}
          type="text"
          label="Email"
          onChange={(event) => {
            if (event.target.value.length < 30) {
              setRegisterEmail(event.target.value);
            }
          }}
          value={registerEmail}
        />

        <TextField
          sx={textFieldStyles}
          type="text"
          label="Name"
          onChange={(event) => {
            if (event.target.value.length < 11) {
              setRegisterNickname(event.target.value);
            }
          }}
          value={registerNickname}
        />

        <ImageWrapper>
          Image:
          <ImageChosen
            onClick={() => {
              document.querySelector(".opaquePanel").classList.add("displayed");
              document.querySelector(".coverPanel").classList.add("displayed");
              document
                .querySelector(".picturePicker")
                .classList.add("displayed");
              animateForm("picturePicker");
              animateOpaquePanel();
            }}
          >
            {pictures[registerPicture]}
          </ImageChosen>
        </ImageWrapper>

        <TextField
          sx={textFieldStyles}
          type="password"
          label="Password"
          onChange={(event) => {
            if (event.target.value.length < 30) {
              setRegisterPass(event.target.value);
            }
          }}
          value={registerPass}
        />

        <TextField
          sx={textFieldStyles}
          type="password"
          onChange={(event) => {
            if (event.target.value.length < 30) {
              setRegisterPassRepeat(event.target.value);
            }
          }}
          label="Repeat Password"
          value={registerPassRepeat}
        />

        <Button
          sx={buttonStyles}
          onClick={() => {
            if (validate() === true) {
              registerCreateUser();
            }
          }}
          variant="contained"
        >
          Register
        </Button>
        <RegisterInfo
          onClick={() => {
            animateLoginOrPass("loginForm");
          }}
        >
          You have an account?
          <Link to="/login">Login here</Link>
        </RegisterInfo>
      </MainPanelWrapper>
      <CoverPanel className="coverPanel">
        <PicturePickerOutsideWrapper className="picturePicker">
          <PicturePicker
            picture={registerPicture}
            setPicture={setRegisterPicture}
          ></PicturePicker>
        </PicturePickerOutsideWrapper>
      </CoverPanel>
      <OpaquePanel className="opaquePanel"></OpaquePanel>
    </MainWrapper>
  );
}
