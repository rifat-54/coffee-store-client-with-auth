// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvcOApKFnA4fw75_00MjYf1mrlknOWBxM",
  authDomain: "coffee-store-6bbac.firebaseapp.com",
  projectId: "coffee-store-6bbac",
  storageBucket: "coffee-store-6bbac.firebasestorage.app",
  messagingSenderId: "878071490663",
  appId: "1:878071490663:web:85379599027a0300454cc2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
