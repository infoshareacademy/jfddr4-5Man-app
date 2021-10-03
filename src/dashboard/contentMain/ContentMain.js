import { useContext, useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Account } from "./account/Account";
import "./contentMain.css";
import { compileDatabase } from "./home/BarGraph./utils";
import { CurrencyContext } from "./CurrencyContext";
import { MonthContext } from "./MonthContext";
import { YearContext } from "./YearContext";
import { fetchCategories, fetchTransactions } from "../../firebase";
import { UserContext } from "../../UserContext";
import { Home } from "./home/home";

export function ContentMain() {
  const [currentCurrency, changeCurrentCurrency] = useState("PLN");
  const [monthToDisplay, setMonthToDisplay] = useState(10);
  const [yearToDisplay, setYearToDisplay] = useState(2021);
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const currentUser = useContext(UserContext);

  useEffect(() => {
    fetchCategories(currentUser).then(setCategories);
  }, [currentUser]);
  useEffect(() => {
    fetchTransactions(currentUser).then(setTransactions);
  }, [currentUser]);

  const compiledDatabase = compileDatabase(
    categories,
    transactions,
    monthToDisplay,
    yearToDisplay
  );

  return (
    <CurrencyContext.Provider value={currentCurrency}>
      <MonthContext.Provider value={monthToDisplay}>
        <YearContext.Provider value={yearToDisplay}>
          <Switch>
            <Route exact path="/main">
              <section className="contentMainSection">
                <Redirect to="/main/home" />
              </section>
            </Route>
            <Route path="/main/home">
              <Home
                database={compiledDatabase}
                setMonthToDisplay={setMonthToDisplay}
                setYearToDisplay={setYearToDisplay}
              ></Home>
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
        </YearContext.Provider>
      </MonthContext.Provider>
    </CurrencyContext.Provider>
  );
}
