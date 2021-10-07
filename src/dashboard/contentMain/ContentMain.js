import { useContext, useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Account } from "./account/Account";
import "./contentMain.css";
import {
  compileGraphDatabase,
  compileHistoryDatabase,
  getTotalBudget,
} from "./utils";
import { CurrencyContext } from "./CurrencyContext";
import { DateContext } from "./DateContext";
import {
  fetchCategories,
  fetchTransactions,
  fetchUserInfo,
} from "../../firebase";
import { UserContext } from "../../UserContext";
import { Home } from "./home/Home";
import { History } from "./history/History";
import { Budget } from "./budget/Budget";

export function ContentMain() {
  const [currentCurrency, changeCurrentCurrency] = useState("");
  const [dateToDisplay, setDateToDisplay] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  const currentUser = useContext(UserContext);

  useEffect(() => {
    fetchCategories(currentUser, setCategories);
  }, [currentUser]);
  useEffect(() => {
    fetchTransactions(currentUser, setTransactions);
  }, [currentUser]);
  useEffect(() => {
    fetchUserInfo(currentUser, setUserInfo);
  }, [currentUser]);
  useEffect(() => {
    changeCurrentCurrency(
      userInfo.find((data) => {
        return data.id === "Currency";
      })
        ? userInfo.find((data) => {
            return data.id === "Currency";
          }).currency
        : ""
    );
  }, [userInfo]);

  const compiledGraphDatabase = compileGraphDatabase(
    categories,
    transactions,
    dateToDisplay
  );

  const compiledHistoryDatabase = compileHistoryDatabase(
    categories,
    transactions
  );

  const totalBudget = getTotalBudget(userInfo);

  return (
    <CurrencyContext.Provider value={currentCurrency}>
      <DateContext.Provider value={dateToDisplay}>
        <Switch>
          <Route exact path="/main">
            <section className="contentMainSection">
              <Redirect to="/main/home" />
            </section>
          </Route>
          <Route path="/main/home">
            <Home
              graphDatabase={compiledGraphDatabase}
              historyDatabase={compiledHistoryDatabase}
              setDateToDisplay={setDateToDisplay}
              totalBudget={totalBudget}
              categories={categories}
            ></Home>
          </Route>
          <Route exact path="/main/budget">
            <Budget
              categories={categories}
              transactions={transactions}
              totalBudget={totalBudget}
            ></Budget>
          </Route>
          <Route exact path="/main/history">
            <History
              historyDatabase={compiledHistoryDatabase}
              setDateToDisplay={setDateToDisplay}
              categories={categories}
              totalBudget={totalBudget}
            ></History>
          </Route>
          <Route exact path="/main/settings">
            <section className="contentMainSection">setting</section>
          </Route>
          <Route exact path="/main/account">
            <Account />
          </Route>
        </Switch>
      </DateContext.Provider>
    </CurrencyContext.Provider>
  );
}
