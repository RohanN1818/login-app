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
  setDoc
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

setPersistence(auth, browserLocalPersistence);

// --- START: New function for displaying success messages ---
function showSuccessMessage() {
    const successMessageDiv = document.getElementById('success-message');
    if (successMessageDiv) {
        successMessageDiv.style.display = 'block'; // Make it visible
        // Trigger reflow to ensure transition works if display was just changed
        successMessageDiv.offsetWidth;
        successMessageDiv.style.opacity = '1';    // Fade in

        setTimeout(() => {
            successMessageDiv.style.opacity = '0'; // Fade out
            // After the fade-out transition completes, set display to none
            setTimeout(() => {
                successMessageDiv.style.display = 'none'; // Completely hide
            }, 500); // This duration (500ms) should match your CSS transition-duration
        }, 3000); // Display for 3 seconds before starting to fade out
    }
}
// --- END: New function for displaying success messages ---


// SIGNUP
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
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(userCredential.user, {
      displayName: username,
      photoURL: "https://i.pravatar.cc/150?u=" + email
    });

    await setDoc(doc(db, "users", userCredential.user.uid), {
      username: username,
      email: email,
      role: "user",
      createdAt: new Date()
    });

    // --- START: Integration of success message ---
    showSuccessMessage(); // Display the success message
    // Delay redirection to allow the message to be seen
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 3500); // 3000ms display + 500ms fade-out = 3.5 seconds before redirect
    // --- END: Integration of success message ---

  } catch (error) {
    alert(error.message); // Keep existing error handling
  }
};

// LOGIN
window.loginUser = async function () {

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {

    // 👇 WAIT for persistence to set first
    await setPersistence(auth, browserLocalPersistence);

    await signInWithEmailAndPassword(auth, email, password);

    window.location.href = "dashboard.html";

  } catch (error) {
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
