// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnMezUqgc0b9RAlGVs5keuio0TEfcjxis",
  authDomain: "where-s-waldo-71437.firebaseapp.com",
  projectId: "where-s-waldo-71437",
  storageBucket: "where-s-waldo-71437.appspot.com",
  messagingSenderId: "447787709254",
  appId: "1:447787709254:web:141b1b9908afcfa8616b47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export default app;
export { db, storage };