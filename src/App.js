import { useState } from "react";
import { UserContext } from "./UserContext";
import { Redirect, Route, Switch } from "react-router";
import { Dashboard } from "./dashboard/Dashboard";
import { Login } from "./loginPage/Login";
import { Register } from "./registerPage/Register";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const App = () => {
  const [currentUser, changeCurrentUser] = useState("TestUser");
  const auth = getAuth();
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     changeCurrentUser(user.uid);
  //   } else {
  //     if (window.location.href.includes("main")) {
  //       window.location.href = window.location.origin;
  //     }
  //   }
  // });

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
