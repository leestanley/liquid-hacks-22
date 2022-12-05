import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDc64y3Zl0rI0bRmY6WyQzRuj01kc5h84w",
  authDomain: "liquidhacks-7947b.firebaseapp.com",
  projectId: "liquidhacks-7947b",
  storageBucket: "liquidhacks-7947b.appspot.com",
  messagingSenderId: "3602992352",
  appId: "1:3602992352:web:c72c5d1d94bf80c52c9485",
  measurementId: "G-FEDTRQH3GH"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);