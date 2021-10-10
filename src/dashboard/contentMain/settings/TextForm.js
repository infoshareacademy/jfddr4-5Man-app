import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import styled from "styled-components";
import {
  changeEmail,
  changePassword,
  updateCurrency,
  updateNickname,
} from "../../../firebase";
import { UserContext } from "../../../UserContext";

const ErrorWrapper = styled.div`
  width: 274px;
  height: fit-content;
  font-size: 15px;
  color: red;
  margin-bottom: 20px;
  text-align: center;
`;
const TextFormInsideWrapper = styled.div`
  padding: 20px;
  background-color: ${(props) => props.theme.formsBackgroundColor};
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  z-index: 10;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
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

export const TextForm = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const currentUser = useContext(UserContext);

  const goBackHandler = () => {
    props.changeType("");
    setErrorMessage("");
    setLoginPass("");
    setLoginEmail("");
    document.querySelector(".opaquePanel").classList.remove("displayed");
    document.querySelector(".coverPanel").classList.remove("displayed");
    document.querySelector(".textForm").classList.remove("displayed");
  };

  const validateCurrency = () => {
    let valid = true;
    if (props.currency.length === 0) {
      setErrorMessage("Invalid currency");
      valid = false;
      return valid;
    }
    return valid;
  };
  const validateNickname = () => {
    let valid = true;
    if (props.nickname.length === 0) {
      setErrorMessage("Invalid nickname");
      valid = false;
      return valid;
    }
    return valid;
  };
  const validatePassword = () => {
    let valid = true;
    if (loginEmail.length === 0 || loginPass.length === 0) {
      setErrorMessage("Please enter both email and password");
      valid = false;
      return valid;
    }
    if (props.password.length === 0) {
      setErrorMessage("Invalid new password");
      valid = false;
      return valid;
    }
    if (props.password.length < 6) {
      setErrorMessage("New password too short");
      valid = false;
      return valid;
    }
    if (props.password !== props.repeatPassword) {
      setErrorMessage("Passwords must match");
      valid = false;
      return valid;
    }
    return valid;
  };
  const validateEmail = () => {
    let valid = true;
    if (loginEmail.length === 0 || loginPass.length === 0) {
      setErrorMessage("Please enter both email and password");
      valid = false;
      return valid;
    }
    if (props.email.length === 0 || props.email.match(/[@]/g) === null) {
      setErrorMessage("Invalid new email");
      valid = false;
      return valid;
    }
    return valid;
  };

  return (
    <>
      {props.type === "currency" && (
        <TextFormInsideWrapper>
          <ErrorWrapper>{errorMessage}</ErrorWrapper>
          <TextField
            sx={textFieldStyles}
            label="Currency"
            type="text"
            value={props.currency}
            onChange={(event) => {
              if (event.target.value.length < 6) {
                props.changeCurrency(event.target.value);
              }
            }}
          ></TextField>
          <ButtonsWrapper>
            <Button
              sx={buttonStyles}
              variant="contained"
              onClick={() => {
                if (validateCurrency() === true) {
                  updateCurrency(currentUser, props.currency);
                  goBackHandler();
                }
              }}
            >
              CHANGE
            </Button>
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
        </TextFormInsideWrapper>
      )}

      {props.type === "nickname" && (
        <TextFormInsideWrapper>
          <ErrorWrapper>{errorMessage}</ErrorWrapper>
          <TextField
            sx={textFieldStyles}
            label="Nickname"
            type="text"
            value={props.nickname}
            onChange={(event) => {
              if (event.target.value.length < 11) {
                props.changeNickname(event.target.value);
              }
            }}
          ></TextField>
          <ButtonsWrapper>
            <Button
              variant="outlined"
              sx={buttonStyles}
              onClick={() => {
                if (validateNickname() === true) {
                  updateNickname(currentUser, props.nickname);
                  goBackHandler();
                }
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
        </TextFormInsideWrapper>
      )}

      {props.type === "password" && (
        <TextFormInsideWrapper>
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
          <TextField
            sx={textFieldStyles}
            label="New password"
            type="password"
            value={props.password}
            onChange={(event) => {
              if (event.target.value.length < 30) {
                props.changePassword(event.target.value);
              }
            }}
          ></TextField>
          <TextField
            sx={textFieldStyles}
            label="Repeat new password"
            type="password"
            value={props.repeatPassword}
            onChange={(event) => {
              if (event.target.value.length < 30) {
                props.changeRepeatPassword(event.target.value);
              }
            }}
          ></TextField>
          <ButtonsWrapper>
            <Button
              variant="outlined"
              sx={buttonStyles}
              onClick={() => {
                if (validatePassword() === true) {
                  const auth = getAuth();
                  const email = loginEmail;
                  const password = loginPass;
                  signInWithEmailAndPassword(auth, email, password)
                    .then(() => {
                      changePassword(
                        props.password,
                        props.changePassword,
                        props.changeRepeatPassword,
                        goBackHandler,
                        setErrorMessage
                      );
                      setErrorMessage("");
                      setLoginEmail("");
                      setLoginPass("");
                    })
                    .catch((error) => {
                      if (
                        error.message ===
                          "Firebase: Error (auth/user-not-found)." ||
                        error.message ===
                          "Firebase: Error (auth/invalid-email)."
                      ) {
                        setErrorMessage("Wrong email");
                      } else if (
                        error.message ===
                        "Firebase: Error (auth/wrong-password)."
                      ) {
                        setErrorMessage("Wrong password");
                      } else {
                        console.log(error.message);
                        setErrorMessage("Something went wrong :(");
                      }
                    });
                }
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
        </TextFormInsideWrapper>
      )}

      {props.type === "email" && (
        <TextFormInsideWrapper>
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
          <TextField
            sx={textFieldStyles}
            label="New email"
            type="email"
            value={props.email}
            onChange={(event) => {
              if (event.target.value.length < 30) {
                props.changeEmail(event.target.value);
              }
            }}
          ></TextField>
          <ButtonsWrapper>
            <Button
              variant="outlined"
              sx={buttonStyles}
              onClick={() => {
                if (validateEmail() === true) {
                  const auth = getAuth();
                  const email = loginEmail;
                  const password = loginPass;
                  signInWithEmailAndPassword(auth, email, password)
                    .then(() => {
                      changeEmail(
                        props.email,
                        props.changeEmail,
                        goBackHandler,
                        setErrorMessage
                      );
                      setErrorMessage("");
                      setLoginEmail("");
                      setLoginPass("");
                    })
                    .catch((error) => {
                      if (
                        error.message ===
                          "Firebase: Error (auth/user-not-found)." ||
                        error.message ===
                          "Firebase: Error (auth/invalid-email)."
                      ) {
                        setErrorMessage("Wrong email");
                      } else if (
                        error.message ===
                        "Firebase: Error (auth/wrong-password)."
                      ) {
                        setErrorMessage("Wrong password");
                      } else {
                        console.log(error.message);
                        setErrorMessage("Something went wrong :(");
                      }
                    });
                }
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
        </TextFormInsideWrapper>
      )}
    </>
  );
};
