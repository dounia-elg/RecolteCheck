import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFw7cdw-EtG-4tXFeA-hhE0rNOQw8E8Ys",
  authDomain: "recoltecheck-ce127.firebaseapp.com",
  projectId: "recoltecheck-ce127",
  storageBucket: "recoltecheck-ce127.firebasestorage.app",
  messagingSenderId: "970325976480",
  appId: "1:970325976480:web:00400ba5865e6a5f2e70c5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);