import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase project settings from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyA7ZON51SvukBvEl5uFhCjSXqAhh4yW5yU",
    authDomain: "harvesthub-ed691.firebaseapp.com",
    projectId: "harvesthub-ed691",
    storageBucket: "harvesthub-ed691.firebasestorage.app",
    messagingSenderId: "742652506898",
    appId: "1:742652506898:web:cb6ee9df1b4ef643b8b9cb",
    measurementId: "G-5CCPFNC7K0"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore DB
export const db = getFirestore(app);

console.log("Firebase Config:", firebaseConfig);