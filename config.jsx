// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfsKYJaX9xzpK0pTjcFCNfVSRYNgEVhdo",
  authDomain: "sabornamao-1905b.firebaseapp.com",
  databaseURL: "https://sabornamao-1905b-default-rtdb.firebaseio.com",
  projectId: "sabornamao-1905b",
  storageBucket: "sabornamao-1905b.firebasestorage.app",
  messagingSenderId: "125087798420",
  appId: "1:125087798420:web:f42132899e352ee778d081",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);