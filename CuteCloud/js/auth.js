// Firebase SDK imports (v10)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Firebase config (replace if you ever need to)
const firebaseConfig = {
  apiKey: "AIzaSyC3C-GOTU2zWXb-Qtqdzw6azttEvic_ppw",
  authDomain: "cutecloud-63a8c.firebaseapp.com",
  projectId: "cutecloud-63a8c",
  storageBucket: "cutecloud-63a8c.appspot.com",
  messagingSenderId: "713219781086",
  appId: "1:713219781086:web:4b1db08b992a9f3daa6d4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get DOM elements
const authForm = document.getElementById("authForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMsg = document.getElementById("errorMsg");
const submitBtn = document.getElementById("submitBtn");

let mode = "login";

// Allow mode sync from script.js
window.setMode = (newMode) => {
  mode = newMode;
};

// Submit handler
authForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  try {
    if (mode === "Login") {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Logged in successfully!");
      // TODO: Redirect to dashboard.html
    } else if (mode === "register") {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("✅ Registered! Now you can log in.");
      mode = "login";
      window.updateForm(); // switch UI back to login
    } else if (mode === "forgot") {
      await sendPasswordResetEmail(auth, email);
      alert("📧 Reset link sent to your email.");
      mode = "login";
      window.updateForm();
    }
  } catch (err) {
    errorMsg.textContent = formatError(err.message);
  }
});

// Friendly error formatter
function formatError(msg) {
  if (msg.includes("user-not-found")) return "User not found.";
  if (msg.includes("wrong-password")) return "Wrong password.";
  if (msg.includes("email-already")) return "Email already in use.";
  if (msg.includes("missing-password")) return "Enter a password.";
  return msg;
}
