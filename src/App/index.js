import { useState } from "react";
import BarGraph from "../Components/BarGraph./BarGraph";
import { UserContext } from "../Components/UserContext";

const App = () => {
  const [currentUser, changeCurrentUser] = useState("TestUser");
  return (
    <UserContext.Provider value={currentUser}>
      <BarGraph></BarGraph>
    </UserContext.Provider>
  );
};

export default App;
