// src/firebaseConfig.ts



import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-0F7P0C0lkiEL3omGZE-TCUUqzI1OIBU",
  authDomain: "gauthuplianceai.firebaseapp.com",
  projectId: "gauthuplianceai",
  storageBucket: "gauthuplianceai.firebasestorage.app",
  messagingSenderId: "225024245428",
  appId: "1:225024245428:web:7dca964e42da62ea3721e1",
  measurementId: "G-RMP1YMV4PQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    return null;
  }
};

export default auth;



