import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";
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
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPass, setRegisterPass] = useState("");
    const [registerPassRepeat, setRegisterPassRepeat] = useState("");

    const [registerEmailError, setRegisterEmailError] = useState("");
    const [registerPassError, setRegisterPassError] = useState("");
    const [registerPassRepeatError, setRegisterPassRepeatError] = useState("");

    const mailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    function registerEmailValidation(e) {
        setRegisterEmail(e.target.value);
        console.log(registerEmail);
        if (e.target.value.match(mailRegex)) {
            setRegisterEmailError("");
            return true;
        } else {
            setRegisterEmailError("Wrong Mail");
            return false;
        }
    }

    function registerPassValidation(e) {
        setRegisterPass(e.target.value);
        if(e.target.value.length < 6){
            setRegisterPassError("Password is too short")
            return false;
        } else {
            setRegisterPassError("")
            return true;
        }
    }

    function registerPassRepeatValidation(e) {
        setRegisterPassRepeat(e.target.value);
        if(registerPass === e.target.value){
            setRegisterPassRepeatError("")
            return true;
        } else {
            setRegisterPassRepeatError("Password don't match")
            return false;
        }
    }

    function registerCreateUser(){
        console.log(registerEmailError);
        console.log(registerPassError);
        console.log(registerPassRepeatError);
        if(registerEmailError === "",registerPassError === "", registerPassRepeatError === ""){
            
            // CONNECT AND CREATE WITH FIREBASE
            <Redirect to='/main'/>

        } else {
            return false;
        }
    }

    return (
        <ThemeProvider theme={registerTheme}>
            <div className="registerMainDiv">
                <section className="registerDirectDiv">
                    <h1 className="registerHeader">Your<span>Money</span></h1>
                    <form className="registerForm">

                        <input type="text"
                            className="registerFormEmail"
                            name="registerFormEmail"
                            placeholder="Email"
                            onChange={registerEmailValidation} 
                            value={registerEmail}/>

                        <p id="registerMailError" className="registerParError">
                            {registerEmailError}
                        </p>

                        <input type="password"
                            className="registerFormPassword"
                            name="registerFormPassword"
                            placeholder="Password"
                            onChange={registerPassValidation} 
                            value={registerPass}/>

                        <p id="registerPasswordError" className="registerParError">
                            {registerPassError}
                        </p>

                        <input type="password"
                            className="registerFormPasswordRepeat"
                            name="registerFormPasswordRepeat"
                            placeholder="Repeat Password"
                            onChange={registerPassRepeatValidation} 
                            value={registerPassRepeat}/>

                        <p id="registerPasswordRepeatError" className="registerParError">
                            {registerPassRepeatError}
                        </p>

                        <Button onClick={registerCreateUser} className="registerFormButton" variant="contained" color="primary">
                            Register
                        </Button>

                    </form>

                    <p> --- Or --- </p>

                    <div className="registerGoogle">
                        <p>Google</p>
                    </div>

                </section>

                <section className="goToLoginDiv">
                    <p>You have an account? <Link to="/login">Login here</Link></p>
                </section>

            </div>
        </ThemeProvider>
    )
}