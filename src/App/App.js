import { useEffect, useState } from "react";
import BarGraph from "../Components/BarGraph./BarGraph";
import { compileDatabase } from "../Components/BarGraph./utils";
import { UserContext } from "../Components/UserContext";
import { CurrencyContext } from "../Components/CurrencyContext";
import { MonthContext } from "../Components/MonthContext";
import { YearContext } from "../Components/YearContext";
import { fetchCategories, fetchTransactions } from "./firebase";

const App = () => {
  const [currentUser, changeCurrentUser] = useState("TestUser");
  const [currentCurrency, changeCurrentCurrency] = useState("PLN");
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [monthToDisplay, setMonthToDisplay] = useState(10);
  const [yearToDisplay, setYearToDisplay] = useState(2021);
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
    <UserContext.Provider value={currentUser}>
      <CurrencyContext.Provider value={currentCurrency}>
        <MonthContext.Provider value={monthToDisplay}>
          <YearContext.Provider value={yearToDisplay}>
            <BarGraph database={compiledDatabase}></BarGraph>
          </YearContext.Provider>
        </MonthContext.Provider>
      </CurrencyContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
