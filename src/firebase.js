// backend/firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDkOf_mHtubyKgcnZT_Qej8KuyUzw3BkRw",
  authDomain: "yourhr-e3348.firebaseapp.com",
  projectId: "yourhr-e3348",
  storageBucket: "yourhr-e3348.appspot.com",
  messagingSenderId: "25431668749",
  appId: "1:25431668749:web:5234056af0c669b9f47d44",
  measurementId: "G-8ZEH634RLD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export {storage}
