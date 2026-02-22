import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔥 YOUR FIREBASE CONFIG HERE

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

// ================= REGISTER =================

async function signupUser() {

  const btn = document.getElementById("signup-btn");
  btn.disabled = true;

  const username = document.getElementById("signup-username").value.trim();
  const email = document.getElementById("signup-email").value.trim().toLowerCase();
  const password = document.getElementById("signup-password").value;
  const confirm = document.getElementById("signup-confirm").value;

  if (!username || !email || !password || !confirm) {
    alert("Please fill all fields");
    btn.disabled = false;
    return;
  }

  if (password !== confirm) {
    alert("Passwords do not match");
    btn.disabled = false;
    return;
  }

  try {

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(userCredential.user, {
      displayName: username
    });

    await setDoc(doc(db, "users", userCredential.user.uid), {
      username: username,
      email: email,
      role: "user",
      createdAt: new Date()
    });

    alert("Registration successful!");
    window.location.href = "dashboard.html";

  } catch (error) {
    alert(error.message);
  }

  btn.disabled = false;
}

// ================= LOGIN =================

async function loginUser() {

  const btn = document.getElementById("login-btn");
  btn.disabled = true;

  const email = document.getElementById("login-email").value.trim().toLowerCase();
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    alert("Please fill all fields");
    btn.disabled = false;
    return;
  }

  try {

    await signInWithEmailAndPassword(auth, email, password);

    alert("Login successful!");
    window.location.href = "dashboard.html";

  } catch (error) {
    alert(error.message);
  }

  btn.disabled = false;
}

// ================= EVENT LISTENERS =================

document.getElementById("signup-btn")
  .addEventListener("click", signupUser);

document.getElementById("login-btn")
  .addEventListener("click", loginUser);
