import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import styled from "styled-components";
import { clearData, deleteUserFunc } from "../../../firebase";
import { UserContext } from "../../../UserContext";

const ErrorWrapper = styled.div`
  width: 274px;
  height: fit-content;
  font-size: 15px;
  color: red;
  margin-bottom: 20px;
  text-align: center;
`;
const ConfirmFormInsideWrapper = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  z-index: 10;
  background-color: ${(props) => props.theme.formsBackground};
`;
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const ConfirmMessage = styled.p`
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
  "&:hover": { backgroundColor: "#333193" },
};
const buttonRedStyles = {
  backgroundColor: "#C10A0A",
  borderRadius: "25px",
  color: "#FFFFFF",
  fontWeight: "bold",
  letterSpacing: "1px",
  fontSize: "20px",
  marginRight: "20px",
  "&:hover": { backgroundColor: "#730606" },
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

export const ConfirmForm = (props) => {
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
    document.querySelector(".confirmForm").classList.remove("displayed");
  };

  const validate = () => {
    let valid = true;
    if (loginEmail.length === 0 || loginPass.length === 0) {
      setErrorMessage("Please enter both email and password");
      valid = false;
      return valid;
    }
    return valid;
  };

  return (
    <>
      {props.type === "clearData" && (
        <ConfirmFormInsideWrapper>
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
          <ConfirmMessage>
            Are you sure?
            <br />
            You will not be able to recover your data.
            <br />
            This might take a moment.
          </ConfirmMessage>
          <ButtonsWrapper>
            <Button
              variant="outlined"
              sx={buttonRedStyles}
              onClick={() => {
                if (validate() === true) {
                  const auth = getAuth();
                  const email = loginEmail;
                  const password = loginPass;
                  signInWithEmailAndPassword(auth, email, password)
                    .then(() => {
                      clearData(
                        currentUser,
                        props.categories,
                        props.transactions
                      );
                      setLoginPass("");
                      setLoginEmail("");
                      goBackHandler("");
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
              CLEAR
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
        </ConfirmFormInsideWrapper>
      )}

      {props.type === "deleteAccount" && (
        <ConfirmFormInsideWrapper>
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
          <ConfirmMessage>
            Are you sure?
            <br />
            {`You will be logged out (obviously).`}
          </ConfirmMessage>
          <ButtonsWrapper>
            <Button
              variant="outlined"
              sx={buttonRedStyles}
              onClick={() => {
                if (validate() === true) {
                  const auth = getAuth();
                  const email = loginEmail;
                  const password = loginPass;
                  signInWithEmailAndPassword(auth, email, password)
                    .then(() => {
                      deleteUserFunc(goBackHandler, setErrorMessage);
                      setLoginPass("");
                      setLoginEmail("");
                      goBackHandler("");
                      window.location.reload();
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
              DELETE
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
        </ConfirmFormInsideWrapper>
      )}
    </>
  );
};
