import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase project settings from Firebase Console
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore DB
export const db = getFirestore(app);