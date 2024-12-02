let score = 100;

function registerUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        localStorage.setItem("user", JSON.stringify({ username, password }));
        alert("Registration successful!");
    } else {
        alert("Please fill in all fields!");
    }
}

function loginUser() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
        alert("Login successful!");
        document.getElementById("auth").classList.add("hidden");
        document.getElementById("game").classList.remove("hidden");
        document.getElementById("rewards").classList.remove("hidden");
    } else {
        alert("Invalid credentials!");
    }
}

function playGame() {
    const player = Math.floor(Math.random() * 9) + 1;
    const banker = Math.floor(Math.random() * 9) + 1;
    let result;

    if (player > banker) {
        result = "You win!";
        score += 10;
    } else if (player < banker) {
        result = "You lose!";
        score -= 10;
    } else {
        result = "It's a tie!";
    }

    document.getElementById("result").innerText = `Player: ${player}, Banker: ${banker}. ${result}`;
    document.getElementById("score").innerText = `Score: ${score}`;
    document.getElementById("current-score").innerText = `Score: ${score}`;
    localStorage.setItem("score", score);
}

function redeemReward(pointsRequired) {
    let currentScore = score;

    if (currentScore >= pointsRequired) {
        currentScore -= pointsRequired;
        score = currentScore;
        alert("Reward redeemed!");
    } else {
        alert("Not enough points!");
    }

    document.getElementById("current-score").innerText = `Score: ${currentScore}`;
    document.getElementById("score").innerText = `Score: ${currentScore}`;
    localStorage.setItem("score", currentScore);
}
