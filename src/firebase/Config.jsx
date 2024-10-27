import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCyWLO7yPHm-KT6f3qBcbB_CpGpWtUZ8Zk",
  authDomain: "shoeshop-website.firebaseapp.com",
  projectId: "shoeshop-website",
  storageBucket: "shoeshop-website.appspot.com",
  messagingSenderId: "853794878819",
  appId: "1:853794878819:web:d826b0e086123f0815cf56",
  measurementId: "G-Q4K7TE7W7M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = new getFirestore(app)
export const storage = getStorage(app)