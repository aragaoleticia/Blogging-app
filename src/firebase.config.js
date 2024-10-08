import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Buffer } from 'buffer';

const decodedFirebaseCredentials = Buffer.from(process.env.REACT_APP_FIREBASE_CREDENTIALS, "base64").toString("utf-8");
const firebaseConfig = JSON.parse(decodedFirebaseCredentials);

const app = initializeApp(firebaseConfig);




export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


