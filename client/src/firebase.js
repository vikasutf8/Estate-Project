// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-mern-2ec22.firebaseapp.com",
  projectId: "estate-mern-2ec22",
  storageBucket: "estate-mern-2ec22.appspot.com",
  messagingSenderId: "1014685154567",
  appId: "1:1014685154567:web:8abd34f56c50a85f90d9a2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);