import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyBZeoHVMcxsE9mJHUbqoepFPmWzhihRPy8",
authDomain: "rohan-styles.firebaseapp.com",
projectId: "rohan-styles",
storageBucket: "rohan-styles.firebasestorage.app".
messagingSender ld: "610424653799",
appId: "1:610424653799:web:3e97d73ef97c0f4db6df42"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  if(user){
    document.getElementById("user-email").innerText = user.email;
    document.getElementById("user-name").innerText = user.displayName;
    document.getElementById("profile-pic").src = user.photoURL;

    const docSnap = await getDoc(doc(db, "users", user.uid));
    if(docSnap.exists()){
      if(docSnap.data().role === "admin"){
        document.getElementById("admin-panel").style.display = "block";
      }
    }

  } else {
    window.location.href = "index.html";
  }
});

window.logout = async function(){
  await signOut(auth);
  window.location.href = "index.html";
};

// THEME TOGGLE
const toggleBtn = document.getElementById("theme-toggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme",
    document.body.classList.contains("dark-mode") ? "dark" : "light"
  );
});

if(localStorage.getItem("theme") === "dark"){
  document.body.classList.add("dark-mode");
}
