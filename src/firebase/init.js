// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJh38iTFVAvxlrW3bZ7QKNQs0Z_kUB88U",
  authDomain: "code-fables.firebaseapp.com",
  projectId: "code-fables",
  storageBucket: "code-fables.appspot.com",
  messagingSenderId: "666259351116",
  appId: "1:666259351116:web:fbf2afc92b050f684936e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export default db;