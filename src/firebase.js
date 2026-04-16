// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVItFOGHsGjs583mbaYSj2GkHsK9vO4O0",
  authDomain: "expense-tracker-85d97.firebaseapp.com",
  projectId: "expense-tracker-85d97",
  storageBucket: "expense-tracker-85d97.firebasestorage.app",
  messagingSenderId: "827695156834",
  appId: "1:827695156834:web:6c0d140cc313751c560b3b",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // This is your Firestore instance
export const auth = getAuth(app);
