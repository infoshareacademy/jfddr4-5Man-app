import { useState } from "react";
import { UserContext } from "./UserContext";
import { Redirect, Route, Switch } from "react-router";
import { Dashboard } from "./dashboard/Dashboard";
import { Login } from "./loginPage/Login";
import { Register } from "./registerPage/Register";

const App = () => {
  const [currentUser, changeCurrentUser] = useState("TestUser");

  return (
    <UserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route path="/main">
          <Dashboard />
        </Route>
      </Switch>
    </UserContext.Provider>
  );
};

export default App;
