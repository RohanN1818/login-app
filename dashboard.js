import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut }
from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

// SAME CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyBZeoHVMcxsE9m.JHUbqoepFPmWzhihRPy8",
  authDomain: "rohan-styles.firebaseapp.com",
  projectId: "rohan-styles",
  storageBucket: "rohan-styles.appspot.com",
  messagingSenderId: "610424653799",
  appId: "1:610424653799:web:3e97d73ef97c0f4db6df42"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Protect page
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("user-email").innerText =
      "Logged in as: " + user.email;
  } else {
    // Small delay to avoid false redirect
    setTimeout(() => {
      if (!auth.currentUser) {
        window.location.href = "./index.html";
      }
    }, 1000);
  }
});
  

// Logout
function logout() {
  signOut(auth).then(() => {
    window.location.href = "./index.html";
  });
}

window.logout = logout;
