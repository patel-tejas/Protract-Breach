// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCYH4myEfx_dZN1yu3umIb2xNMCvHh8jb4",
    authDomain: "blog-37a17.firebaseapp.com",
    projectId: "blog-37a17",
    storageBucket: "blog-37a17.appspot.com",
    messagingSenderId: "406220413820",
    appId: "1:406220413820:web:595915f7a6016962f6a2f9",
    measurementId: "G-8Z4WW2GZ73"
  };
  
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);