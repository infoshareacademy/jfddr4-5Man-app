import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
    return (
        <ThemeProvider theme={loginTheme}>
            <div className="loginMainDiv">
                <section className="loginDirectDiv">
                    <h1 className="loginHeader">Your<span>Money</span></h1>
                    <form className="loginForm">

                        <TextField className="loginFormEmail"
                            id="outlined-basic" label="Email" variant="outlined" 
                            color="primary" />

                        <TextField className="loginFormPassword"
                            id="outlined-basic" label="Password" variant="outlined" 
                            color="primary" />

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
                    <p>Do not have an account? <a href="/register">Register here</a></p>
                </section>
            </div>
        </ThemeProvider>
    )
}