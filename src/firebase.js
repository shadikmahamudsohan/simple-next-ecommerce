import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: `${process.env.API_KEY}`,
    authDomain: "programming-guide-bb92d.firebaseapp.com",
    projectId: "programming-guide-bb92d",
    storageBucket: "programming-guide-bb92d.appspot.com",
    messagingSenderId: "352152017156",
    appId: "1:352152017156:web:5b9eb8258259379ed55851",
    measurementId: "G-2RZ5HC3V9Z"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
const auth = getAuth(app);
export default auth;
