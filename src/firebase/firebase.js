import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkKwIzm7tfIhCmfoCrVzAV-IdmnneMt8I",
  authDomain: "creat-a-task-5f39b.firebaseapp.com",
  projectId: "creat-a-task-5f39b",
  storageBucket: "creat-a-task-5f39b.appspot.com",
  messagingSenderId: "144480700912",
  appId: "1:144480700912:web:dab2f7219aabd754d57535",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
