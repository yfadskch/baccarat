// Initialize game variables
let currentBalance = 1000;
let currentPoints = 0;
let currentBetAmount = 0;
let currentTarget = "";
let gameRecords = [];

// Update display function
function updateDisplay() {
    document.getElementById("balance").textContent = currentBalance;
    document.getElementById("points").textContent = currentPoints;
    document.getElementById("bet-amount").textContent = currentBetAmount || "Not Selected";
    document.getElementById("target").textContent = currentTarget || "Not Selected";
}

// Function to start the game
function startGame() {
    if (currentBetAmount === 0 || !currentTarget) {
        alert("Please select a bet amount and a target to start the game.");
        return;
    }

    if (currentBalance < currentBetAmount) {
        alert("Not enough balance to place the bet. Please redeem rewards or add balance.");
        return;
    }

    // Deduct the bet amount
    currentBalance -= currentBetAmount;

    // Simulate the game
    const playerCards = [getRandomCard(), getRandomCard()];
    const bankerCards = [getRandomCard(), getRandomCard()];
    const playerTotal = getCardTotal(playerCards);
    const bankerTotal = getCardTotal(bankerCards);

    renderCards("player-cards", playerCards);
    renderCards("banker-cards", bankerCards);

    // Determine the winner
    let result = "";
    if (playerTotal > bankerTotal) {
        result = "Player";
        if (currentTarget === "Player") {
            currentBalance += currentBetAmount * 2;
            currentPoints += currentBetAmount;
        }
    } else if (bankerTotal > playerTotal) {
        result = "Banker";
        if (currentTarget === "Banker") {
            currentBalance += currentBetAmount * 2;
            currentPoints += currentBetAmount;
        }
    } else {
        result = "Tie";
        if (currentTarget === "Tie") {
            currentBalance += currentBetAmount * 8;
            currentPoints += currentBetAmount;
        }
    }

    // Add game record
    addGameRecord(result);

    // Update display
    updateDisplay();
}

// Generate a random card between 1 and 9
function getRandomCard() {
    return Math.floor(Math.random() * 9) + 1;
}

// Calculate the total of two cards
function getCardTotal(cards) {
    return (cards[0] + cards[1]) % 10;
}

// Render cards on the screen
function renderCards(elementId, cards) {
    const container = document.getElementById(elementId);
    container.innerHTML = "";
    cards.forEach((card) => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.textContent = card;
        container.appendChild(cardDiv);
    });
}

// Add game record to the display
function addGameRecord(result) {
    const recordDiv = document.createElement("div");
    recordDiv.classList.add("record", result.toLowerCase());
    recordDiv.textContent = result === "Player" ? "P" : result === "Banker" ? "B" : "T";
    const recordsContainer = document.getElementById("game-records");
    if (recordsContainer.children.length >= 16) {
        recordsContainer.removeChild(recordsContainer.firstChild);
    }
    recordsContainer.appendChild(recordDiv);
}

// Open the reward popup
function openRewardPopup() {
    let reward = prompt(
        "Choose a reward:\n" +
        "1. 200 Points: +200 Credit\n" +
        "2. 1000 Points: Welcome Bonus\n" +
        "3. 3000 Points: Free 8.88"
    );

    if (reward === "1" && currentPoints >= 200) {
        currentBalance += 200;
        currentPoints -= 200;
        alert("You redeemed 200 Points for +200 Credit!");
    } else if (reward === "2" && currentPoints >= 1000) {
        currentPoints -= 1000;
        alert("You redeemed 1000 Points for Welcome Bonus!");
    } else if (reward === "3" && currentPoints >= 3000) {
        currentPoints -= 3000;
        alert("You redeemed 3000 Points for Free 8.88!");
    } else {
        alert("Not enough points to redeem this reward!");
    }

    updateDisplay();
}

// Set bet amount
function setBetAmount(amount) {
    currentBetAmount = amount;
    updateDisplay();
}

// Set target
function setTarget(target) {
    currentTarget = target;
    updateDisplay();
}

// Initial render
updateDisplay();
