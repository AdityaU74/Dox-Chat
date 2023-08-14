import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCocVjd2oW6AY9Ph5dVtAntKVjr_4nviB8",
  authDomain: "adi-sproject-7bffd.firebaseapp.com",
  projectId: "adi-sproject-7bffd",
  storageBucket: "adi-sproject-7bffd.appspot.com",
  messagingSenderId: "22717776741",
  appId: "1:22717776741:web:1c6721d3aa6f1e78b1d78c",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
