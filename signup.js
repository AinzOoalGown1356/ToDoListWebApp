// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuXRVbRHtG6d_dC2WLh8lVFYcKeqxtnbM",
  authDomain: "dontforgettodo-3d80b.firebaseapp.com",
  projectId: "dontforgettodo-3d80b",
  storageBucket: "dontforgettodo-3d80b.appspot.com",
  messagingSenderId: "986333136170",
  appId: "1:986333136170:web:1610121cd0089c8bd40a53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the DB instance
const db = getDatabase();

// Get the Auth instance
const auth = getAuth(app);


//sign up button
const signup = document.getElementById('signupButton');
signup.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission

  // Inputs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;

  createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (firstname.trim() !== '' && lastname.trim() !== '') {
                set(ref(db, "UsersAuthList/" + user.uid), {
                    firstname: firstname,
                    lastname: lastname
                }).then(() => {
                    window.location.href = "index.html";
                }).catch((error) => {
                    console.error("Error writing document: ", error);
                    // Handle error
                });
            } else {
                // Handle case where firstname or lastname is empty
                console.error("Firstname or lastname is empty");
                // You may want to notify the user or take appropriate action
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("User information already in use, redirecting.");
            window.location.href = "signin.html";
            // Handle error
        });
});

