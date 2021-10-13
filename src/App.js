import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { Redirect, Route, Switch } from "react-router";
import { Dashboard } from "./dashboard/Dashboard";
import { Login } from "./loginPage/Login";
import { Register } from "./registerPage/Register";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import styled from "styled-components";

const MainWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  max-height: 1080px;
  max-width: 1920px;
  min-height: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #b3b2e6;
`;
const FixWrapper = styled.div`
  max-height: 1080px;
  max-width: 1920px;
  min-height: 900px;
  background-color: #b3b2e6;
  overflow: hidden;
`;

const App = () => {
  const [currentUser, changeCurrentUser] = useState("");

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        changeCurrentUser(user.uid);
        if (
          window.location.href.includes("login") ||
          window.location.href.includes("register")
        ) {
          setTimeout(() => {
            window.location.replace("/main");
          }, 1500);
        }
      } else {
        if (window.location.href.includes("main")) {
          setTimeout(() => {
            window.location.replace(window.location.origin);
          }, 1500);
        }
      }
    });
  }, []);

  return (
    <UserContext.Provider value={currentUser}>
      <FixWrapper>
        <MainWrapper className="mainWrapper">
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
        </MainWrapper>
      </FixWrapper>
    </UserContext.Provider>
  );
};

export default App;
