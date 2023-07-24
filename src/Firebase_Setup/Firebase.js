// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, onMessage } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyCuZnB58QkBZUyaJegv4x2TRhNAcbZhw5M",
  authDomain: "chatzz-5f912.firebaseapp.com",
  projectId: "chatzz-5f912",
  storageBucket: "chatzz-5f912.appspot.com",
  messagingSenderId: "787521622242",
  appId: "1:787521622242:web:6a0cbbccc804bc3aad4ebb",
  measurementId: "G-MMGTJ245GB",
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
