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

export const fetchCategories = (userName) => {
  const c = collection(db, `${userName} - categories`);
  const q = query(c, orderBy("createdAt"));
  return getDocs(q).then((response) => {
    const returnArray = [];
    response.forEach((doc) => {
      returnArray.push({ ...doc.data(), id: doc.id });
    });
    return returnArray;
  });
};

export const fetchTransactions = (userName) => {
  const c = collection(db, `${userName} - transactions`);
  return getDocs(c).then((response) => {
    const returnArray = [];
    response.forEach((doc) => {
      returnArray.push({ ...doc.data(), id: doc.id });
    });
    return returnArray;
  });
};

export const fetchUserInfo = (userName) => {
  const c = collection(db, `${userName} - data`);
  return getDocs(c).then((response) => {
    const returnArray = [];
    response.forEach((doc) => {
      returnArray.push({ ...doc.data(), id: doc.id });
    });
    return returnArray;
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
  initialAmount
) => {
  const c = doc(db, `${userName} - data`, "TotalBudget");
  const amount = +changedAmount - +initialAmount;
  updateDoc(c, { amount: currentBudget + amount });
};
