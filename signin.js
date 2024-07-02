// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getDatabase, get, ref, child } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

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

// Get the DBREF ubstabce
const dbref = ref(db);


//sign up button
const signin = document.getElementById('signinbutton');
signin.addEventListener("click", function (event) {
    event.preventDefault()

// Inputs
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
      get(child(dbref, "UsersAuthList/" + userCredential.user.uid)).then((snapshot)=>{
        if (snapshot.exists){
          localStorage.setItem("user-info", JSON.stringify({
            firstname: snapshot.val().firstname,
            lastname: snapshot.val().lastname
          }))
          localStorage.setItem("user-creds", JSON.stringify(userCredential));
          window.location.href = "index.html";

        } else {
          alert("User information not found. Please check your credentials."); 
        }
      })
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("User information not found. Please check your credentials.")
  });
})