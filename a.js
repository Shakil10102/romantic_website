// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWAE4wwJ7I4nraZ34f8U7i4kGLjFHhX2I",
  authDomain: "love-c113f.firebaseapp.com",
  projectId: "love-c113f",
  storageBucket: "love-c113f.appspot.com",
  messagingSenderId: "131230749247",
  appId: "1:131230749247:web:a0a3bdec8286a33f691e8a",
  measurementId: "G-9Y8NT7G9Z1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const studentForm = document.getElementById("studentForm");
const message = document.getElementById("message");

// Save to Local Storage
const saveToLocalStorage = (studentId, studentName) => {
  const studentData = { studentId, studentName };
  localStorage.setItem(studentId, JSON.stringify(studentData));
};

// Save to Firestore
const saveToFirestore = async (studentId, studentName) => {
  try {
    await addDoc(collection(db, "students"), {
      studentId,
      studentName,
    });
    console.log("Data saved to Firestore");
  } catch (error) {
    console.error("Error saving to Firestore: ", error);
  }
};

// Handle Form Submission
studentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const studentId = document.getElementById("studentId").value;
  const studentName = document.getElementById("studentName").value;

  // Save to Local Storage
  saveToLocalStorage(studentId, studentName);

  // Save to Firestore
  await saveToFirestore(studentId, studentName);

  // Display Success Message
  message.textContent = "Registration Complete!";

  // Reset Form
  studentForm.reset();
});
