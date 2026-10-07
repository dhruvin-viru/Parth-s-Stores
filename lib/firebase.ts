import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDrb-yCfKAICpReercJxU-NjLMRS4bo3o8",
  authDomain: "parth-s-store.firebaseapp.com",
  projectId: "parth-s-store",
  storageBucket: "parth-s-store.firebasestorage.app",
  messagingSenderId: "362253720454",
  appId: "1:362253720454:web:c1c4a3cca2ac0d8addaa07",
  measurementId: "G-3RH7Z1VSB4"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
