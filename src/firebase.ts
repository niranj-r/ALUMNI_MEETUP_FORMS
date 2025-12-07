// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-8Y_tiKlLYbKcGsm8do0lhQdxYuq7k-w",
  authDomain: "alumni-meetup-a3b68.firebaseapp.com",
  projectId: "alumni-meetup-a3b68",
  storageBucket: "alumni-meetup-a3b68.firebasestorage.app",
  messagingSenderId: "1002927892198",
  appId: "1:1002927892198:web:0108cd4ed4df1ad8027d27"
};

const app = initializeApp(firebaseConfig);


