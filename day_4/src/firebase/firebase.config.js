// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9Lue4X4KIeMRIWyob6ME0GaTA_Y1rRtY",
  authDomain: "first-react-auth-aa96e.firebaseapp.com",
  projectId: "first-react-auth-aa96e",
  storageBucket: "first-react-auth-aa96e.firebasestorage.app",
  messagingSenderId: "100261703530",
  appId: "1:100261703530:web:c5b9153b2ee4a05e5e7f13",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export { auth };
