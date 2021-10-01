import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import './login.scss';

const loginTheme = createTheme({
    palette: {
        primary: {
            main: '#F6C90E',
            secondary: '#f50057',
            contrastText: '#FCFCFC'
        },
    },
});


export function Login() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPass, setLoginPass] = useState("");

    const [loginEmailError, setLoginEmailError] = useState("");
    const [loginPassError, setLoginPassError] = useState("");

    function loginEmailValidation(e) {
        setLoginEmail(e.target.value)
    }

    function loginPassValidation(e) {
        setLoginPass(e.target.value)
    }

    return (
        <ThemeProvider theme={loginTheme}>
            <div className="loginMainDiv">
                <section className="loginDirectDiv">
                    <h1 className="loginHeader">Your<span>Money</span></h1>
                    <form className="loginForm">

                        <input
                            type="text"
                            className="loginFormEmail"
                            name="loginFormEmail"
                            placeholder="Email"
                            onChange={loginEmailValidation}
                            value={loginEmail} />

                        <p id="loginMailError" className="loginParError">
                            {loginEmailError}
                        </p>


                        <input
                            type="password"
                            className="loginFormPassword"
                            name="loginFormPassword"
                            placeholder="Password"
                            onChange={loginPassValidation}
                            value={loginPass} />

                        <p id="loginPassError" className="loginParError">
                            {loginPassError}
                        </p>

                        <Button className="loginFormButton" variant="contained" color="primary">
                            Login
                        </Button>

                    </form>
                    <p> --- Or --- </p>
                    <div className="loginGoogle">
                        <p>Google</p>
                    </div>
                </section>
                <section className="goToRegisterDiv">
                    <p>Do not have an account? <Link to="/register">Register here</Link></p>
                    <Link to="/main/home">Continue witchout login</Link>
                </section>
            </div>
        </ThemeProvider>
    )
}