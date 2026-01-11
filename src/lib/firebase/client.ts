import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, User, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKF3161brDrgwHLdvxfHWK2ABYgH55cZY",
  authDomain: "trainermilestone-13125.firebaseapp.com",
  projectId: "trainermilestone-13125",
  storageBucket: "trainermilestone-13125.firebasestorage.app",
  messagingSenderId: "699539029372",
  appId: "1:699539029372:web:cc4e894890630c997e78f9",
  measurementId: "G-JKXF1SRTWC"
};

// Initialize Firebase (prevent duplicate initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, onAuthStateChanged, googleProvider };
export type { User };
