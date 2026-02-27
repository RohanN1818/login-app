import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyBZeoHVMcxsE9mJHUbqoepFPmWzhihRPy8",
  authDomain: "rohan-styles.firebaseapp.com",
  projectId: "rohan-styles",
  storageBucket: "rohan-styles.firebasestorage.app",
  messagingSenderId: "610424653799",
  appId: "1:610424653799:web:3e97d73ef97c0f4db6df42"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

await setPersistence(auth, browserLocalPersistence);


// SUCCESS MESSAGE FUNCTION
function showSuccessMessage() {
  const successMessageDiv = document.getElementById('success-message');
  if (!successMessageDiv) return;

  successMessageDiv.style.display = 'block';
  successMessageDiv.offsetWidth;
  successMessageDiv.style.opacity = '1';

  setTimeout(() => {
    successMessageDiv.style.opacity = '0';
    setTimeout(() => {
      successMessageDiv.style.display = 'none';
    }, 500);
  }, 3000);
}


// =======================
// SIGNUP
// =======================
window.signupUser = async function () {

  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirm = document.getElementById("signup-confirm").value;

  if (password !== confirm) {
    alert("Passwords do not match");
    return;
  }

  try {

    console.log("Creating user...");

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("Auth created:", user.uid);

    await updateProfile(user, {
      displayName: username,
      photoURL: "https://i.pravatar.cc/150?u=" + email
    });

    console.log("Writing to Firestore...");

    await setDoc(doc(db, "users", user.uid), {
      username: username,
      email: email,
      role: "user",
      createdAt: serverTimestamp()
    });

    console.log("Firestore write SUCCESS");

    showSuccessMessage();

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 3500);

  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    alert(error.message);
  }
};


// =======================
// LOGIN
// =======================
window.loginUser = async function () {

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    await setPersistence(auth, browserLocalPersistence);
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    alert(error.message);
  }
};


// TOGGLE
window.toggleForm = function(type) {
  document.getElementById("login-section").style.display =
    type === "signup" ? "none" : "block";

  document.getElementById("signup-section").style.display =
    type === "signup" ? "block" : "none";
};

