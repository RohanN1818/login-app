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

// SIGNUP

window.signupUser = async function (event) {
  // 1. Prevent double submission if attached to a form
  if (event) event.preventDefault(); 

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

    // 2. Display the success message!
    alert("Registered successfully!"); 
    
    // 3. Redirect to dashboard
    window.location.href = "dashboard.html";

  } catch (error) {
    // 4. Handle the error cleanly
    if (error.code === 'auth/email-already-in-use') {
       alert("This email is already registered. Please login instead.");
    } else {
       alert(error.message);
    }
  }
};

// LOGIN
window.signupUser = async function (event) {
  // Prevent double submission if attached to a form
  if (event) event.preventDefault(); 

  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirm = document.getElementById("signup-confirm").value;

  if (password !== confirm) {
    alert("Passwords do not match");
    return;
  }

  // Grab the button that was clicked to prevent double-clicks
  let registerBtn = null;
  if (event && event.target) {
     registerBtn = event.target;
     registerBtn.disabled = true; // Disable the button
     registerBtn.innerText = "Registering..."; // Give instant visual feedback
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

    // Display the exact success message on screen!
    alert("Account has been registered successfully!"); 
    
    // Redirect to dashboard
    window.location.href = "dashboard.html";

  } catch (error) {
    // If there is an error, re-enable the button so you can try again
    if (registerBtn) {
        registerBtn.disabled = false;
        registerBtn.innerText = "Register"; 
    }

    // Handle the error cleanly
    if (error.code === 'auth/email-already-in-use') {
       alert("This email is already registered. Please login instead.");
    } else {
       alert(error.message);
    }
  }
};

// TOGGLE
window.toggleForm = function(type) {
  document.getElementById("login-section").style.display =
    type === "signup" ? "none" : "block";

  document.getElementById("signup-section").style.display =
    type === "signup" ? "block" : "none";
};


