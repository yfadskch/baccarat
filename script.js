// Initialize variables
let currentBalance = 1000;
let currentPoints = 0;
let currentBetAmount = 0;
let currentTarget = "";

// Update display
function updateDisplay() {
    document.getElementById("balance").textContent = currentBalance;
    document.getElementById("points").textContent = currentPoints;
    document.getElementById("bet-amount").textContent = currentBetAmount || "Not Selected";
    document.getElementById("target").textContent = currentTarget || "Not Selected";
}

// Start the game
function startGame() {
    if (!currentBetAmount || !currentTarget) {
        alert("Please select a bet amount and target!");
        return;
    }
    if (currentBalance < currentBetAmount) {
        alert("Not enough balance!");
        return;
    }

    currentBalance -= currentBetAmount;
    const playerCards = [getRandomCard(), getRandomCard()];
    const bankerCards = [getRandomCard(), getRandomCard()];
    renderCards("player-cards", playerCards);
    renderCards("banker-cards", bankerCards);

    const playerTotal = (playerCards[0] + playerCards[1]) % 10;
    const bankerTotal = (bankerCards[0] + bankerCards[1]) % 10;

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

    addGameRecord(result);
    updateDisplay();
}

// Generate random card
function getRandomCard() {
    return Math.floor(Math.random() * 9) + 1;
}

// Render cards
function renderCards(elementId, cards) {
    const container = document.getElementById(elementId);
    container.innerHTML = "";
    cards.forEach((card) => {
        const div = document.createElement("div");
        div.className = "card";
        div.textContent = card;
        container.appendChild(div);
    });
}

// Add game record
function addGameRecord(result) {
    const record = document.createElement("div");
    record.className = `record ${result.toLowerCase()}`;
    record.textContent = result === "Player" ? "P" : result === "Banker" ? "B" : "T";
    const container = document.getElementById("game-records");
    if (container.children.length >= 16) {
        container.removeChild(container.firstChild);
    }
    container.appendChild(record);
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

// Redeem rewards
function openRewardPopup() {
    const reward = prompt("Choose a reward:\n1. 200 Points: +200 Credit\n2. 1000 Points: Welcome Bonus\n3. 3000 Points: Free 8.88");
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
        alert("Not enough points!");
    }
    updateDisplay();
}

// Initialize display
updateDisplay();
