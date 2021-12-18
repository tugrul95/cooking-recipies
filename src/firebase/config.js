import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3wiKORiZCo17oRRXOBibXTf7riRt2WdQ",
  authDomain: "recipe-73047.firebaseapp.com",
  projectId: "recipe-73047",
  storageBucket: "recipe-73047.appspot.com",
  messagingSenderId: "315720089187",
  appId: "1:315720089187:web:0bf929dea80f17b3468256",
  measurementId: "G-40SV7S6QRH"
};

// Initialize firebase with config object
firebase.initializeApp(firebaseConfig);

// Initialize firestore
const projectFirestore = firebase.firestore();

export { projectFirestore };
