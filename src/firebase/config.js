import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3kJ5v86NdCQ1GdHv34Gt9VE1vU7TFdcQ",
  authDomain: "chat-for-fun-app.firebaseapp.com",
  projectId: "chat-for-fun-app",
  storageBucket: "chat-for-fun-app.appspot.com",
  messagingSenderId: "484890851720",
  appId: "1:484890851720:web:8b1c22e38c228279b6223d",
  measurementId: "G-BYLHFN1WB5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db =  getFirestore(app);

connectAuthEmulator(auth,"http://localhost:9099");
if(window.location.hostname === 'localhost') {
  connectFirestoreEmulator(db, 'localhost', 8080);
}


export {db, auth};