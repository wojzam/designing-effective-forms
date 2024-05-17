import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");
const firstNameInput = document.querySelector("#firstName");
const lastNameInput = document.querySelector("#lastName");
const emailInput = document.querySelector("#exampleInputEmail1");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGRtWwz5jPjYxIn3LzhVRFsXtwSw6R3EA",
  authDomain: "tpf-pk-8d4c8.firebaseapp.com",
  projectId: "tpf-pk-8d4c8",
  storageBucket: "tpf-pk-8d4c8.appspot.com",
  messagingSenderId: "630070608266",
  appId: "1:630070608266:web:d9f97a8d282d00a1600873",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const userSignIn = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Wystąpił błąd:", errorCode, " - ", errorMessage);
    });
};

const userSignOut = async () => {
  signOut(auth)
    .then(() => {
      alert("You have been signed out!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Wystąpił błąd:", errorCode, " - ", errorMessage);
    });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    const [firstName, lastName] = user.displayName.split(" ");
    firstNameInput.value = firstName;
    lastNameInput.value = lastName;
    emailInput.value = user.email;

    signInButton.style.display = "none";
    signOutButton.style.display = "block";
  } else {
    firstNameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";

    signInButton.style.display = "block";
    signOutButton.style.display = "none";
  }
});

signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);
