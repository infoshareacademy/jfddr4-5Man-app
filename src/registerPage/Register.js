import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./register.scss";

const registerTheme = createTheme({
    palette: {
        primary: {
            main: '#F6C90E',
            secondary: '#f50057',
            contrastText: '#FCFCFC'
        },
    },
});

export function Register() {
    return (
        <ThemeProvider theme={registerTheme}>
            <div className="registerMainDiv">
                <section className="registerDirectDiv">
                    <h1 className="registerHeader">Your<span>Money</span></h1>
                    <form className="registerForm">

                        <TextField className="registerFormEmail"
                            id="outlined-basic" label="Email" variant="outlined"
                            color="primary" />

                        <TextField className="registerFormPassword"
                            id="outlined-basic" label="Password" variant="outlined"
                            color="primary" />

                        <TextField className="registerFormPasswordRepeat"
                            id="outlined-basic" label="Repeat the Password" variant="outlined"
                            color="primary" />

                        <Button className="registerFormButton" variant="contained" color="primary">
                            Register
                        </Button>

                    </form>
                    <p> --- Or --- </p>
                    <div className="registerGoogle">
                        <p>Google</p>
                    </div>
                </section>
                <section className="goToLoginDiv">
                    <p>You have an account? <a href="/login">Login here</a></p>
                </section>
            </div>
        </ThemeProvider>
    )
}