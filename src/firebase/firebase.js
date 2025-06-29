import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDV4szjWrY0uz5Z2h6KMOxy5BWeAH6bYNg",
  authDomain: "apiassistant-33adb.firebaseapp.com",
  projectId: "apiassistant-33adb",
  storageBucket: "apiassistant-33adb.firebasestorage.app",
  messagingSenderId: "970598283727",
  appId: "1:970598283727:web:22c673109fab8fe9f83aba",
  measurementId: "G-JWCQ98DS32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };