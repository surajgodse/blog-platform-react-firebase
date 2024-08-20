import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyA1_eCQqnznB_9YgLABts1UyrRc9NzBKCk",
  authDomain: "login-auth-f1775.firebaseapp.com",
  databaseURL: "https://login-auth-f1775-default-rtdb.firebaseio.com",
  projectId: "login-auth-f1775",
  storageBucket: "login-auth-f1775.appspot.com",
  messagingSenderId: "320384479194",
  appId: "1:320384479194:web:0363650d3620acd5149ae3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export default app;



