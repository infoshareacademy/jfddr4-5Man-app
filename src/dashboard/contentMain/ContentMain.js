import { useContext, useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {
  compileGraphDatabase,
  compileHistoryDatabase,
  filterCategoryColors,
  getInitialChart,
  getTotalBudget,
} from "./utils";
import { CurrencyContext } from "./CurrencyContext";
import { DateContext } from "./DateContext";
import { DisplayContext } from "./DisplayContext";
import {
  fetchCategories,
  fetchTransactions,
  fetchUserInfo,
} from "../../firebase";
import { UserContext } from "../../UserContext";
import { Home } from "./home/Home";
import { History } from "./history/History";
import { Budget } from "./budget/Budget";
import { Setting } from "./settings/Settings";

export function ContentMain(props) {
  const [currentCurrency, changeCurrentCurrency] = useState("");
  const [dateToDisplay, setDateToDisplay] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [displayType, setDisplayType] = useState("monthly");

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

  const filteredCategories = filterCategoryColors(categories, userInfo);

  const compiledGraphDatabase = compileGraphDatabase(
    filteredCategories,
    transactions,
    dateToDisplay,
    displayType
  );

  const compiledHistoryDatabase = compileHistoryDatabase(
    filteredCategories,
    transactions
  );

  const totalBudget = getTotalBudget(userInfo);

  const initialChart = getInitialChart(userInfo);

  return (
    <CurrencyContext.Provider value={currentCurrency}>
      <DateContext.Provider value={dateToDisplay}>
        <DisplayContext.Provider value={displayType}>
          <Switch>
            <Route exact path="/main">
              <Redirect to="/main/home" />
            </Route>
            <Route path="/main/home">
              <Home
                graphDatabase={compiledGraphDatabase}
                historyDatabase={compiledHistoryDatabase}
                setDateToDisplay={setDateToDisplay}
                totalBudget={totalBudget}
                categories={filteredCategories}
                initialChart={initialChart}
                setDisplayType={setDisplayType}
                nightmode={props.nightmode}
              ></Home>
            </Route>
            <Route exact path="/main/budget">
              <Budget
                categories={filteredCategories}
                transactions={transactions}
                totalBudget={totalBudget}
              ></Budget>
            </Route>
            <Route exact path="/main/history">
              <History
                historyDatabase={compiledHistoryDatabase}
                setDateToDisplay={setDateToDisplay}
                categories={filteredCategories}
                totalBudget={totalBudget}
                setDisplayType={setDisplayType}
              ></History>
            </Route>
            <Route exact path="/main/settings">
              <Setting
                userInfo={userInfo}
                categories={filteredCategories}
                transactions={transactions}
              ></Setting>
            </Route>
          </Switch>
        </DisplayContext.Provider>
      </DateContext.Provider>
    </CurrencyContext.Provider>
  );
}
