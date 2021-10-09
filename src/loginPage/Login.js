import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./login.scss";

const loginTheme = createTheme({
  palette: {
    primary: {
      main: "#F6C90E",
      secondary: "#f50057",
      contrastText: "#FCFCFC",
    },
  },
});

export function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const history = useHistory();

  function loginEmailValidation(e) {
    setLoginEmail(e.target.value);
  }

  function loginPassValidation(e) {
    setLoginPass(e.target.value);
  }

  function loginUser() {
    const auth = getAuth();

    const email = loginEmail;
    const password = loginPass;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        history.push("/main");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <ThemeProvider theme={loginTheme}>
      <div className="loginMainDiv">
        <section className="loginDirectDiv">
          <h1 className="loginHeader">
            Your<span>Money</span>
          </h1>
          <form className="loginForm">
            <input
              type="text"
              className="loginFormEmail"
              name="loginFormEmail"
              placeholder="Email"
              onChange={loginEmailValidation}
              value={loginEmail}
            />

            <input
              type="password"
              className="loginFormPassword"
              name="loginFormPassword"
              placeholder="Password"
              onChange={loginPassValidation}
              value={loginPass}
            />

            <Button
              onClick={loginUser}
              className="loginFormButton"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </form>
        </section>
        <section className="goToRegisterDiv">
          <p>
            Do not have an account? <Link to="/register">Register here</Link>
          </p>
          <Link to="/main/home">Continue witchout login</Link>
        </section>
      </div>
    </ThemeProvider>
  );
}
