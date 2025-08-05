import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyARgr3xiOEQ1Dznue9HTTEJR5RTLmTFQos",
  authDomain: "learning-firebase-39d50.firebaseapp.com",
  projectId: "learning-firebase-39d50",
  storageBucket: "learning-firebase-39d50.firebasestorage.app",
  messagingSenderId: "922354948167",
  appId: "1:922354948167:web:ea210e9f968e05a63eb962",
  measurementId: "G-9H2CRDES5X",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const signUp = document.getElementById("sign-up");
const logIn = document.getElementById("log-in");
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user);
    window.location.href = "index.html";
  } else {
  }
});
if (signUp) {
  signUp.addEventListener("click", (e) => {
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if (email == "" || password == "") {
      alert("Enter All values");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        window.location.href = "./index.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
      });
  });
}

if (logIn) {
  logIn.addEventListener("click", (e) => {
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    if (email == "" || password == "") {
      alert("Enter all values");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        window.location.href = "./index.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
      });
  });
}
