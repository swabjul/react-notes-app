import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4jUkZgcy4ja4BbOarWWs9l7dhdSFpOnw",
  authDomain: "react-notes-91c52.firebaseapp.com",
  projectId: "react-notes-91c52",
  storageBucket: "react-notes-91c52.appspot.com",
  messagingSenderId: "685299937535",
  appId: "1:685299937535:web:7ac3037ad27f4ffcd7dcca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")
