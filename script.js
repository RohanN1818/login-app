// Firebase CDN Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBZeoHVMcxsE9mJHUbqoepFPmWzhihRPy8",
  authDomain: "rohan-styles.firebaseapp.com",
  projectId: "rohan-styles",
  storageBucket: "rohan-styles.appspot.com",
  messagingSenderId: "610424653799",
  appId: "1:610424653799:web:3e97d73ef97c0f4db6df42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign Up
function signupUser(event) {
  event.preventDefault();

  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirm = document.getElementById("signup-confirm").value;

  if (password !== confirm) {
    alert("Passwords do not match ❌");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("Signup Successful ✅"))
    .catch(error => alert(error.message));
}

// Login
function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
  .then(() => {
    window.location.href = "./dashboard.html";
  })
  .catch(error => alert(error.message));
}

// Toggle Forms
function toggleForm(type) {
  const login = document.getElementById("login-section");
  const signup = document.getElementById("signup-section");

  if (type === "signup") {
    login.style.display = "none";
    signup.style.display = "block";
  } else {
    login.style.display = "block";
    signup.style.display = "none";
  }
}

// Make functions global
window.signupUser = signupUser;
window.loginUser = loginUser;
window.toggleForm = toggleForm;


