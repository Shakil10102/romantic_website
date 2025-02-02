// Firebase Configuration (Replace with your Firebase config)
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWAE4wwJ7I4nraZ34f8U7i4kGLjFHhX2I",
  authDomain: "love-c113f.firebaseapp.com",
  projectId: "love-c113f",
  storageBucket: "love-c113f.firebasestorage.app",
  messagingSenderId: "131230749247",
  appId: "1:131230749247:web:a0a3bdec8286a33f691e8a",
  measurementId: "G-9Y8NT7G9Z1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Save User's Name
document.getElementById("saveName").addEventListener("click", function () {
    let userName = document.getElementById("nameInput").value.trim();
    
    if (userName !== "") {
        localStorage.setItem("savedName", userName);
        document.getElementById("savedName").innerHTML = "Saved Name: " + userName;
        alert("Your name has been saved! ✅");
    } else {
        alert("Please enter your name! ⚠️");
    }
});

// Function to Save Yes/No Response to Firebase
function saveResponse(response) {
    let userName = localStorage.getItem("savedName") || "Anonymous";

    db.collection("responses").add({
        name: userName,
        answer: response,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log("Response Saved!");
    }).catch(error => {
        console.error("Error saving response: ", error);
    });
}

// Handle Yes Click - Display "Love you too ❤️"
document.getElementById("yes").addEventListener("click", function () {
    // Display "Love you too ❤️" message
    document.getElementById("response").innerHTML = "Love you too ❤️";

    // Save the "Yes" response to Firebase
    saveResponse("Yes 💖");

    // Display the saved name
    let userName = localStorage.getItem("savedName");
    if (userName) {
        document.getElementById("savedName").innerHTML = "Saved Name: " + userName;
    }
});

// Handle No Click - Display "Try again 💔"
document.getElementById("no").addEventListener("click", function () {
    // Display "Try again 💔" message
    document.getElementById("response").innerHTML = "Try again 💔";

    // Save the "No" response to Firebase
    saveResponse("No 💔");

    // Display the saved name
    let userName = localStorage.getItem("savedName");
    if (userName) {
        document.getElementById("savedName").innerHTML = "Saved Name: " + userName;
    }
});
