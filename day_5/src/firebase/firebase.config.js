// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8clNwlOrGGLQI_Xl_Hc4VwBJeHKuIxak",
  authDomain: "react-news-auth-fc114.firebaseapp.com",
  projectId: "react-news-auth-fc114",
  storageBucket: "react-news-auth-fc114.firebasestorage.app",
  messagingSenderId: "135138566280",
  appId: "1:135138566280:web:959350c7e8a64ce569bf3d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export { auth };
