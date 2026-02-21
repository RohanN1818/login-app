import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Enable persistence again
setPersistence(auth, browserLocalPersistence);

// Protect page
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("user-email").innerText =
      "Logged in as: " + user.email;
  } else {
    window.location.href = "index.html";
  }
});

// Logout function
function logout() {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
}

window.logout = logout;
