import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Link, useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";
import { TextField } from "@mui/material";

const MainWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #b3b2e6;
`;
const MainPanelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  border-radius: 25px;
  background-color: white;
`;
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 100px;
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

export function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const validate = () => {
    let valid = true;
    if (loginEmail.length === 0) {
      setErrorMessage("Please enter email");
      valid = false;
      return valid;
    }
    if (loginPass.length === 0) {
      setErrorMessage("Please enter password");
      valid = false;
      return valid;
    }
    return valid;
  };

  function loginUser() {
    const auth = getAuth();

    const email = loginEmail;
    const password = loginPass;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setErrorMessage("");
        setLoginEmail("");
        setLoginPass("");
        history.push("/main");
      })
      .catch((error) => {
        if (
          error.message === "Firebase: Error (auth/user-not-found)." ||
          error.message === "Firebase: Error (auth/invalid-email)."
        ) {
          setErrorMessage("Wrong email");
        } else if (error.message === "Firebase: Error (auth/wrong-password).") {
          setErrorMessage("Wrong password");
        } else {
          console.log(error.message);
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
              setLoginEmail(event.target.value);
            }
          }}
          value={loginEmail}
        />

        <TextField
          sx={textFieldStyles}
          type="password"
          label="Password"
          onChange={(event) => {
            if (event.target.value.length < 30) {
              setLoginPass(event.target.value);
            }
          }}
          value={loginPass}
        />

        <Button
          sx={buttonStyles}
          onClick={() => {
            if (validate() === true) {
              loginUser();
            }
          }}
          variant="contained"
        >
          Login
        </Button>

        <RegisterInfo>
          Do not have an account?
          <br />
          <Link to="/register">Register here</Link>
        </RegisterInfo>
      </MainPanelWrapper>
    </MainWrapper>
  );
}
