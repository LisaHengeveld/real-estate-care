import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG_mlRvdwHajZZKw8flbm56qWzEa3xyNw",
  authDomain: "real-estate-care-fbceb.firebaseapp.com",
  projectId: "real-estate-care-fbceb",
  storageBucket: "real-estate-care-fbceb.appspot.com",
  messagingSenderId: "90359997112",
  appId: "1:90359997112:web:d22f0ba34f9d6c938d0a4d"
}; 

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);

export {
  db
}