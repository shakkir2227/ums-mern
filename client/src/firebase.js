// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "ums-mern.firebaseapp.com",
    projectId: "ums-mern",
    storageBucket: "ums-mern.appspot.com",
    messagingSenderId: "685162840025",
    appId: "1:685162840025:web:dced6e4f4b24451fbda3c8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);