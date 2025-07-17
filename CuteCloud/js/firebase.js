// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyC3C-GOTU2zWXb-Qtqdzw6azttEvic_ppw",
  authDomain: "cutecloud-63a8c.firebaseapp.com",
  projectId: "cutecloud-63a8c",
  storageBucket: "cutecloud-63a8c.appspot.com",
  messagingSenderId: "713219781086",
  appId: "1:713219781086:web:4b1db08b992a9f3daa6d4f",
  measurementId: "G-MVZTL3WBHT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
