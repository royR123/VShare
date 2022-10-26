// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "vshare-d1996.firebaseapp.com",
  projectId: "vshare-d1996", 
  storageBucket: "vshare-d1996.appspot.com",
  messagingSenderId: "803884128762" ,
  appId: "1:803884128762:web:d688bdbcf02104b854ec43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;