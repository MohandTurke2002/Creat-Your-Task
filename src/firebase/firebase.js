import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8JGOUIJNga_KoTPbS-scttAmFBaqeEvo",
  authDomain: "test-6393e.firebaseapp.com",
  projectId: "test-6393e",
  storageBucket: "test-6393e.appspot.com",
  messagingSenderId: "541660758660",
  appId: "1:541660758660:web:4373a63b20d9c784e378d1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
