// Firebase Configuration (Replace with your Firebase config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

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
