import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";

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
