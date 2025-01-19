// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, onValue,update } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOwksQINjePhmjwT6qoD5gNQenpIVuKC4",
  authDomain: "snap2action-b7f6b.firebaseapp.com",
  projectId: "snap2action-b7f6b",
  storageBucket: "snap2action-b7f6b.firebasestorage.app",
  messagingSenderId: "129057366804",  
  appId: "1:129057366804:web:3482ac950dc3af17021801",
  measurementId: "G-6R55DBVBKK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app)


export { app, auth, createUserWithEmailAndPassword, database, ref, onValue, update};

