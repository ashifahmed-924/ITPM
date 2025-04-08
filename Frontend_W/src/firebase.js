// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuaeE6PKiByNKAd63v52IPw9C2Lyd0e-c",
  authDomain: "shoppingeye-lk.firebaseapp.com",
  projectId: "shoppingeye-lk",
  storageBucket: "shoppingeye-lk.appspot.com",
  messagingSenderId: "735035772659",
  appId: "1:735035772659:web:ecdc63ea70ca48e436b186",
  measurementId: "G-JCBR7D13DX"
};

// Initialize Firebase
const firebaseDB = initializeApp(firebaseConfig);

export default firebaseDB