import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  query,
  collection,
  orderBy,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  getAuth,
  updatePassword,
  updateEmail,
  deleteUser,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAuW15Qk3tMLE-2sAEFXay41S1puJ-i_Pk",
  authDomain: "man-app-112a4.firebaseapp.com",
  projectId: "man-app-112a4",
  storageBucket: "man-app-112a4.appspot.com",
  messagingSenderId: "889539831155",
  appId: "1:889539831155:web:4372767c42ea3c4672d106",
};
const app = initializeApp(firebaseConfig);
if (1 < 0) {
  console.log(app);
} /// FIX CONSOLE MESSAGE THAT APP IS UNASSIGNED
const db = getFirestore();

export const fetchCategories = (userName, setCategories) => {
  const c = collection(db, `${userName} - categories`);
  const q = query(c, orderBy("createdAt"));
  return onSnapshot(q, (response) => {
    const returnArray = [];
    response.forEach((doc) => {
      returnArray.push({ ...doc.data(), id: doc.id });
    });
    setCategories(returnArray);
  });
};

export const fetchTransactions = (userName, setTransactions) => {
  const c = collection(db, `${userName} - transactions`);
  return onSnapshot(c, (response) => {
    const returnArray = [];
    response.forEach((doc) => {
      returnArray.push({ ...doc.data(), id: doc.id });
    });
    setTransactions(returnArray);
  });
};

export const fetchUserInfo = (userName, setUserInfo) => {
  const c = collection(db, `${userName} - data`);
  return onSnapshot(c, (response) => {
    const returnArray = [];
    response.forEach((doc) => {
      returnArray.push({ ...doc.data(), id: doc.id });
    });
    setUserInfo(returnArray);
  });
};

export const addTransaction = (
  userName,
  amount,
  description,
  category,
  date
) => {
  addDoc(collection(db, `${userName} - transactions`), {
    amount: +amount,
    category: category,
    description: description,
    date: new Date(
      `${date.year}.${date.month}.${
        date.day
      } ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
    ).getTime(),
  });
};

export const updateBudgetForNewTransaction = (
  userName,
  currentBudget,
  changedAmount
) => {
  const c = doc(db, `${userName} - data`, "TotalBudget");
  updateDoc(c, { amount: +currentBudget + +changedAmount });
};

export const updateTransaction = (
  userName,
  amount,
  description,
  category,
  id
) => {
  const c = doc(db, `${userName} - transactions`, `${id}`);
  updateDoc(c, {
    amount: +amount,
    description: description,
    category: category,
  });
};

export const updateBudgetForExistingTransaction = (
  userName,
  currentBudget,
  changedAmount,
  initialAmount,
  changedCategory,
  initialCategory
) => {
  const c = doc(db, `${userName} - data`, "TotalBudget");
  const categoryComparison = compareCategoriesForBudget(
    changedCategory,
    initialCategory
  );
  const amount = computeAmountForBudget(
    categoryComparison,
    +changedAmount,
    +initialAmount,
    initialCategory
  );

  updateDoc(c, { amount: +currentBudget + amount });
};

const compareCategoriesForBudget = (changedCategory, initialCategory) => {
  if (initialCategory === changedCategory) {
    return "noChange";
  }
  if (initialCategory === "Income" && changedCategory !== "Income") {
    return "IncomeToOutcome";
  }
  if (initialCategory !== "Income" && changedCategory === "Income") {
    return "OutcomeToIncome";
  }
  if (initialCategory !== "Income" && changedCategory !== "Income") {
    return "OutcomeToOutcome";
  }
};

const computeAmountForBudget = (
  categoryComparison,
  changedAmount,
  initialAmount,
  initialCategory
) => {
  if (categoryComparison === "noChange" && initialCategory === "Income") {
    return changedAmount - initialAmount;
  }
  if (categoryComparison === "noChange" && initialCategory !== "Income") {
    return initialAmount - changedAmount;
  }
  if (categoryComparison === "IncomeToOutcome") {
    return -initialAmount * 2 - (changedAmount - initialAmount);
  }
  if (categoryComparison === "OutcomeToIncome") {
    return initialAmount * 2 + (changedAmount - initialAmount);
  }
  if (categoryComparison === "OutcomeToOutcome") {
    return initialAmount - changedAmount;
  }
};

export const deleteTransaction = (userName, id) => {
  const c = doc(db, `${userName} - transactions`, id);
  deleteDoc(c);
};

export const updateCategory = (userName, color, name, id, planner) => {
  const c = doc(db, `${userName} - categories`, id);
  updateDoc(c, {
    color: color,
    name: name,
    plannerOn: planner === true ? "true" : "false",
  });
};

export const updateTransactionsForCategoryChange = (
  userName,
  oldCategory,
  newCategory,
  transactions
) => {
  transactions.forEach((transaction) => {
    transaction.category === oldCategory &&
      updateDoc(doc(db, `${userName} - transactions`, transaction.id), {
        category: newCategory,
      });
  });
};

export const deleteCategory = (userName, id) => {
  const c = doc(db, `${userName} - categories`, id);
  deleteDoc(c);
};

export const deleteTransactionsForCategoryDelete = (
  userName,
  category,
  transactions
) => {
  transactions.forEach((transaction) => {
    transaction.category === category &&
      deleteDoc(doc(db, `${userName} - transactions`, transaction.id));
  });
};

export const addCategory = (userName, name, color, planner) => {
  addDoc(collection(db, `${userName} - categories`), {
    name: name,
    color: color,
    planner: 0,
    createdAt: +new Date(),
    plannerOn: planner === true ? "true" : "false",
  });
};

export const updateBudget = (userName, currentBudget, changedAmount) => {
  const c = doc(db, `${userName} - data`, "TotalBudget");
  updateDoc(c, { amount: +currentBudget + +changedAmount });
};

export const updatePlanner = (userName, id, amount) => {
  const c = doc(db, `${userName} - categories`, id);
  updateDoc(c, { planner: +amount });
};

export const updatePlannerForTransactionAdd = (
  userName,
  plannerAmount,
  plannerOn,
  amount,
  category
) => {
  const c = doc(db, `${userName} - categories`, category);
  plannerOn === "true" && updateDoc(c, { planner: plannerAmount - amount });
};

export const updatePlannerForTransactionChange = (
  userName,
  plannerAmountforInitial,
  plannerAmountforChanged,
  plannerOnforInitial,
  plannerOnforChanged,
  initialAmount,
  changedAmount,
  initialCategory,
  changedCategory,
  initialCategoryId,
  changedCategoryId
) => {
  const categoryComparison = compareCategoriesForPlanner(
    initialCategory,
    changedCategory
  );
  if (categoryComparison === "incomeToIncome") {
    return;
  }
  if (categoryComparison === "outcomeToSameOutcome") {
    if (plannerOnforInitial === "false") {
      return;
    }
    if (+initialAmount === +changedAmount) {
      return;
    } else {
      const amount =
        +plannerAmountforInitial + (+initialAmount - +changedAmount);
      updateDoc(doc(db, `${userName} - categories`, initialCategoryId), {
        planner: amount,
      });
    }
  }
  if (categoryComparison === "incomeToOutcome") {
    if (plannerOnforChanged === "false") {
      return;
    } else {
      const amount = +plannerAmountforChanged - +changedAmount;
      updateDoc(doc(db, `${userName} - categories`, changedCategoryId), {
        planner: amount,
      });
    }
  }
  if (categoryComparison === "outcomeToIncome") {
    if (plannerOnforInitial === "false") {
      return;
    } else {
      const amount = +plannerAmountforInitial + +initialAmount;
      updateDoc(doc(db, `${userName} - categories`, initialCategoryId), {
        planner: amount,
      });
    }
  }
  if (categoryComparison === "outcomeToOutcome") {
    if (plannerOnforInitial === "false" && plannerOnforChanged === "false") {
      return;
    }
    if (plannerOnforInitial === "false" && plannerOnforChanged === "true") {
      const amount = +plannerAmountforChanged - +changedAmount;
      updateDoc(doc(db, `${userName} - categories`, changedCategoryId), {
        planner: amount,
      });
    }
    if (plannerOnforInitial === "true" && plannerOnforChanged === "false") {
      const amount = +plannerAmountforInitial + +initialAmount;
      updateDoc(doc(db, `${userName} - categories`, initialCategoryId), {
        planner: amount,
      });
    }
    if (plannerOnforInitial === "true" && plannerOnforChanged === "true") {
      const amountForInitial = +plannerAmountforInitial + +initialAmount;
      updateDoc(doc(db, `${userName} - categories`, initialCategoryId), {
        planner: amountForInitial,
      });
      const amountForChanged = +plannerAmountforChanged - +changedAmount;
      updateDoc(doc(db, `${userName} - categories`, changedCategoryId), {
        planner: amountForChanged,
      });
    }
  }
};

const compareCategoriesForPlanner = (initialCategory, changedCategory) => {
  if (initialCategory === changedCategory && initialCategory === "Income") {
    return "incomeToIncome";
  }
  if (initialCategory === changedCategory && initialCategory !== "Income") {
    return "outcomeToSameOutcome";
  }
  if (
    initialCategory !== changedCategory &&
    initialCategory !== "Income" &&
    changedCategory !== "Income"
  ) {
    return "outcomeToOutcome";
  }
  if (initialCategory !== changedCategory && initialCategory === "Income") {
    return "incomeToOutcome";
  }
  if (initialCategory !== changedCategory && changedCategory === "Income") {
    return "outcomeToIncome";
  }
};

export const updateCurrency = (userName, currency) => {
  const c = doc(db, `${userName} - data`, "Currency");
  updateDoc(c, { currency: currency });
};

export const updateNickname = (userName, nickname) => {
  const c = doc(db, `${userName} - data`, "Nickname");
  updateDoc(c, { nickname: nickname });
};

export const updateNightmode = (userName, isOn) => {
  const c = doc(db, `${userName} - data`, "Nightmode");
  updateDoc(c, { isOn: isOn });
};

export const updateCategoryColors = (userName, isOn) => {
  const c = doc(db, `${userName} - data`, "CategoryColors");
  updateDoc(c, { isOn: isOn });
};

export const updatePicture = (userName, number) => {
  const c = doc(db, `${userName} - data`, "Picture");
  updateDoc(c, { number: number });
};

export const changePassword = (
  password,
  reset1,
  reset2,
  goBackHandler,
  setErrorMessage
) => {
  const auth = getAuth();
  const user = auth.currentUser;
  updatePassword(user, password)
    .then(() => {
      reset1("");
      reset2("");
      goBackHandler();
    })
    .catch((error) => {
      setErrorMessage("Something went wrong :(");
      console.log(error.message);
    });
};

export const changeEmail = (email, reset, goBackHandler, setErrorMessage) => {
  const auth = getAuth();
  updateEmail(auth.currentUser, email)
    .then(() => {
      reset("");
      goBackHandler();
    })
    .catch((error) => {
      setErrorMessage("Something went wrong :(");
      console.log(error.message);
    });
};

export const clearData = (userName, categories, transactions) => {
  categories.forEach((category) => {
    category.id !== "Income" &&
      deleteDoc(doc(db, `${userName} - categories`, category.id));
  });
  transactions.forEach((transaction) =>
    deleteDoc(doc(db, `${userName} - transactions`, transaction.id))
  );
  updateDoc(doc(db, `${userName} - data`, "Currency"), {
    currency: "PLN",
  });
  updateDoc(doc(db, `${userName} - data`, "Nightmode"), {
    isOn: "false",
  });
  updateDoc(doc(db, `${userName} - data`, "TotalBudget"), {
    amount: 0,
  });
  updateDoc(doc(db, `${userName} - data`, "Nickname"), {
    nickname: "User",
  });
  updateDoc(doc(db, `${userName} - data`, "Picture"), {
    number: 0,
  });
  updateDoc(doc(db, `${userName} - data`, "CategoryColors"), {
    isOn: "true",
  });
  updateDoc(doc(db, `${userName} - data`, "InitialChart"), {
    chart: "piechart",
  });
};

export const deleteUserFunc = (goBackHandler, setErrorMessage) => {
  const auth = getAuth();
  const user = auth.currentUser;
  deleteUser(user)
    .then(() => {
      goBackHandler();
    })
    .catch((error) => {
      setErrorMessage("Something went wrong :(");
      console.log(error.message);
    });
};

export const signOutFunc = () => {
  const auth = getAuth();
  signOut(auth).catch((error) => {
    console.log(error.message);
  });
  window.location.reload();
};

export const sendPasswordReset = (email, setForgotMessage) => {
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      setForgotMessage("Email have been sent");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const updateInitialChart = (userName, chart) => {
  const c = doc(db, `${userName} - data`, "InitialChart");
  updateDoc(c, { chart: chart });
};
