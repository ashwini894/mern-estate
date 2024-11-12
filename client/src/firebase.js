// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-8fd6b.firebaseapp.com",
  projectId: "mern-estate-8fd6b",
  storageBucket: "mern-estate-8fd6b.firebasestorage.app",
  messagingSenderId: "13345110456",
  appId: "1:13345110456:web:533b38f40d4b5d6c0a774d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);