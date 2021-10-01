import { useEffect, useState } from "react";
import BarGraph from "../Components/BarGraph./BarGraph";
import { compileDatabase } from "../Components/BarGraph./utils";
import { UserContext } from "../Components/UserContext";
import { fetchCategories, fetchTransactions } from "./firebase";

const App = () => {
  const [currentUser, changeCurrentUser] = useState("TestUser");
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetchCategories(currentUser).then(setCategories);
  }, [currentUser]);
  useEffect(() => {
    fetchTransactions(currentUser).then(setTransactions);
  }, [currentUser]);
  let x = compileDatabase(categories, transactions);
  console.log(x);

  return (
    <UserContext.Provider value={currentUser}>
      <BarGraph></BarGraph>
    </UserContext.Provider>
  );
};

export default App;
