import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC_tq33pcCxcmtcGLbiONW_RDLI4avYwAk",
  authDomain: "ecom-7fb29.firebaseapp.com",
  projectId: "ecom-7fb29",
  storageBucket: "ecom-7fb29.appspot.com",
  messagingSenderId: "905024827928",
  appId: "1:905024827928:web:97a64c52b33b98ae24896d",
  measurementId: "G-5TM8DHVHVP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
