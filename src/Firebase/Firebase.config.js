// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMRLpgoCq-1tlarpLq0MB99Gma0gB1N88",
  authDomain: "e-bikolpo.firebaseapp.com",
  projectId: "e-bikolpo",
  storageBucket: "e-bikolpo.firebasestorage.app",
  messagingSenderId: "527704471066",
  appId: "1:527704471066:web:60abf1875aa34d91fd03a3",
  measurementId: "G-1WK7XGVFK6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export default app;