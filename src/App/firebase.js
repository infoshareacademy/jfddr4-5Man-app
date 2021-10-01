import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { query, collection, orderBy, getDocs } from "firebase/firestore";

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
  const array = [];
  const querySnapshot = getDocs(q).then((response) => {
    response.forEach((doc) => {
      array.push(doc.data());
    });
  });
  return array;
};
