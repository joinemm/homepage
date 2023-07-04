// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBecvHQuHng51QCsB1s6rjWclXe2XGhGCk",
  authDomain: "homepage-5e0c8.firebaseapp.com",
  projectId: "homepage-5e0c8",
  storageBucket: "homepage-5e0c8.appspot.com",
  messagingSenderId: "165499780263",
  appId: "1:165499780263:web:d4a76404239568c8b8af82"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default app
