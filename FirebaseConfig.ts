// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGWa4VQaHV4wCsYvnEhyMYL8zpw8ddolY",
  authDomain: "etabs-35525.firebaseapp.com",
  projectId: "etabs-35525",
  storageBucket: "etabs-35525.appspot.com",
  messagingSenderId: "851965997302",
  appId: "1:851965997302:web:607604a77067becc42bcd7"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);