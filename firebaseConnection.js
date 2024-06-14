// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "CHAVEEEEEEEE",
  authDomain: "meuchat-33e12.firebaseapp.com",
  projectId: "meuchat-33e12",
  storageBucket: "meuchat-33e12.appspot.com",
  messagingSenderId: "574747754391",
  appId: "1:574747754391:web:18a1ccbae40674778d0ed2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const bancoExterno=getFirestore(app);
export {bancoExterno};