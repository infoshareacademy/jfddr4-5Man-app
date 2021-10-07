import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  query,
  collection,
  orderBy,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuW15Qk3tMLE-2sAEFXay41S1puJ-i_Pk",
  authDomain: "man-app-112a4.firebaseapp.com",
  projectId: "man-app-112a4",
  storageBucket: "man-app-112a4.appspot.com",
  messagingSenderId: "889539831155",
  appId: "1:889539831155:web:4372767c42ea3c4672d106",
};
const app = initializeApp(firebaseConfig);
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
  const categoryComparison = compareCategories(
    changedCategory,
    initialCategory
  );
  const amount = computeAmount(
    categoryComparison,
    +changedAmount,
    +initialAmount,
    initialCategory
  );

  updateDoc(c, { amount: currentBudget + amount });
};

const compareCategories = (changedCategory, initialCategory) => {
  if (initialCategory === changedCategory) {
    return "noChange";
  }
  if (initialCategory === "Income" && changedCategory !== "Income") {
    return "IncomeToOutcome";
  }
  if (initialCategory !== "Income" && changedCategory === "Income") {
    return "OutcomeToIncome";
  }
};

const computeAmount = (
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
};

export const deleteTransaction = (userName, id) => {
  const c = doc(db, `${userName} - transactions`, id);
  deleteDoc(c);
};

export const updateCategory = (userName, color, name, id) => {
  const c = doc(db, `${userName} - categories`, id);
  updateDoc(c, { color: color, name: name });
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

export const addCategory = (userName, name, color) => {
  addDoc(collection(db, `${userName} - categories`), {
    name: name,
    color: color,
    planner: 0,
    createdAt: +new Date(),
  });
};
