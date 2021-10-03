import { Route, Switch, Redirect } from "react-router-dom";
import { Account } from "./account/Account";
import "./contentMain.css";

export function ContentMain() {
  return (
    <Switch>
      <Route exact path="/main">
        <section className="contentMainSection">
          <Redirect to="/main/home" />
        </section>
      </Route>
      <Route exact path="/main/home">
        <section className="contentMainSection">home</section>
      </Route>
      <Route exact path="/main/budget">
        <section className="contentMainSection">budget</section>
      </Route>
      <Route exact path="/main/history">
        <section className="contentMainSection">history</section>
      </Route>
      <Route exact path="/main/settings">
        <section className="contentMainSection">setting</section>
      </Route>
      <Route exact path="/main/account">
        <Account />
      </Route>
    </Switch>
  );
}
