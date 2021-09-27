import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import { Login } from './loginPage/Login';
import './main.css';
import { Register } from './registerPage/Register';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path='/login'>
          <Login/>
        </Route>
        <Route exact path='/register'>
          <Register/>
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('app')
);
