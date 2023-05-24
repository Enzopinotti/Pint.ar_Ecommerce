
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDF-zQo5UFXwnEJWX_bikqkFGoCWXo8Ecc",
  authDomain: "pint-ar.firebaseapp.com",
  projectId: "pint-ar",
  storageBucket: "pint-ar.appspot.com",
  messagingSenderId: "286489464181",
  appId: "1:286489464181:web:965e09d18f6bc2dffcd73c"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app)