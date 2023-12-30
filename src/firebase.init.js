// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMb--mJ2aJByVilafqcMIQ4adB6RRGEuU",
  authDomain: "create-a-website-like-tw-487a6.firebaseapp.com",
  projectId: "create-a-website-like-tw-487a6",
  storageBucket: "create-a-website-like-tw-487a6.appspot.com",
  messagingSenderId: "242328590427",
  appId: "1:242328590427:web:c87e9ba23214cc6689877e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// type the next code
const auth = getAuth(app);
export default auth;