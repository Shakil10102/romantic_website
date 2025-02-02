// Import required functions from Firebase SDK v9+ (modular)
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Firebase Configuration
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
const db = getFirestore(app);

// Save User's Name
document.getElementById("saveName").addEventListener("click", function () {
  let userName = document.getElementById("nameInput").value.trim();

  if (userName !== "") {
    // Save the name to localStorage and display the saved name
    localStorage.setItem("savedName", userName);
    document.getElementById("savedName").innerHTML = "Saved Name: " + userName;
    alert("Your name has been saved! ✅");
  } else {
    alert("Please enter your name! ⚠️");
  }
});

// Function to Save Yes/No Response to Firestore
async function saveResponse(response) {
  let userName = localStorage.getItem("savedName") || "Anonymous"; // Get the saved name from localStorage

  try {
    // Save the response in Firestore
    await addDoc(collection(db, "responses"), {
      name: userName,
      answer: response,
      timestamp: serverTimestamp() // Save the current timestamp
    });
    console.log("Response Saved!");
  } catch (error) {
    console.error("Error saving response: ", error);
  }
}

// Handle Yes Click (Display Love and Save Response)
document.getElementById("yes").addEventListener("click", function () {
  // Show "Love you too" message
  document.getElementById("response").innerHTML = "Love you too ❤️";
  // Save the response to Firestore
  saveResponse("Yes 💖");
});

// Handle No Click (Display Try Again and Save Response)
document.getElementById("no").addEventListener("click", function () {
  // Show "Think again" message
  document.getElementById("response").innerHTML = "Think again... 💔";
  // Save the response to Firestore
  saveResponse("No 💔");
});
