// Save the user's name to local storage
document.getElementById("saveName").addEventListener("click", function () {
    let userName = document.getElementById("nameInput").value.trim();
    
    if (userName !== "") {
        localStorage.setItem("savedName", userName);
        updateSavedName();
        alert("Your name has been saved! ✅");
    } else {
        alert("Please enter your name! ⚠️");
    }
});

// Update the saved name display
function updateSavedName() {
    let savedName = localStorage.getItem("savedName");
    if (savedName) {
        document.getElementById("savedName").innerHTML = "Saved Name: " + savedName;
    }
}

// Yes/No button clicks and saving responses
document.getElementById("yes").addEventListener("click", function () {
    document.getElementById("response").innerHTML = "Love you too ❤️";
    localStorage.setItem("lastClicked", "Yes 💖");
    updateClickLog();
});

document.getElementById("no").addEventListener("click", function () {
    alert("Think again... 💔");
    localStorage.setItem("lastClicked", "No 💔");
    updateClickLog();
});

// Function to display last clicked button
function updateClickLog() {
    let lastClicked = localStorage.getItem("lastClicked");
    if (lastClicked) {
        document.getElementById("click-log").innerHTML = "Last clicked: " + lastClicked;
    }
}

// Show saved data when the page loads
updateSavedName();
updateClickLog();
