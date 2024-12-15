let currentBalance = 1000;
let currentPoints = 0;
let currentBet = 0;
let currentTarget = "";

function setBet(amount) {
    currentBet = amount;
    document.getElementById("current-bet").innerText = amount;
}

function setTarget(target) {
    currentTarget = target;
    document.getElementById("current-target").innerText = target;
}

function startGame() {
    if (!currentBet || !currentTarget) {
        alert("Please select a bet amount and target.");
        return;
    }

    const playerCards = [getRandomCard(), getRandomCard()];
    const bankerCards = [getRandomCard(), getRandomCard()];

    renderCards("player-cards", playerCards);
    renderCards("banker-cards", bankerCards);

    const result = determineWinner(playerCards, bankerCards);
    addGameRecord(result);

    if (result === currentTarget) {
        currentBalance += currentBet * 2;
        currentPoints += 100;
    } else {
        currentBalance -= currentBet;
    }

    updateDisplay();
}

function getRandomCard() {
    return Math.floor(Math.random() * 9) + 1;
}

function determineWinner(player, banker) {
    const playerTotal = player.reduce((a, b) => a + b, 0) % 10;
    const bankerTotal = banker.reduce((a, b) => a + b, 0) % 10;
    return playerTotal > bankerTotal ? "Player" : playerTotal < bankerTotal ? "Banker" : "Tie";
}

function renderCards(elementId, cards) {
    const container = document.getElementById(elementId);
    container.innerHTML = "";
    cards.forEach((card) => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.textContent = card;
        container.appendChild(cardDiv);
    });
}

function addGameRecord(result) {
    const record = document.createElement("div");
    record.className = `record ${result.toLowerCase()}`;
    record.textContent = result === "Player" ? "P" : result === "Banker" ? "B" : "T";

    const recordsContainer = document.getElementById("game-records");
    if (recordsContainer.children.length >= 16) {
        recordsContainer.removeChild(recordsContainer.firstChild);
    }
    recordsContainer.appendChild(record);
}

function updateDisplay() {
    document.getElementById("current-balance").innerText = currentBalance;
    document.getElementById("current-points").innerText = currentPoints;
}

function openRewardPopup() {
    alert("Redeem Rewards feature coming soon!");
}

updateDisplay();
