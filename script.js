let balance = 1000;
let points = 0;
let currentBet = null;
let currentTarget = null;
let recordGrid = [];

function selectBet(amount) {
    currentBet = amount;
    document.getElementById('current-bet').textContent = amount;
}

function selectTarget(target) {
    currentTarget = target;
    document.getElementById('current-target').textContent = target;
}

function startGame() {
    if (!currentBet || !currentTarget) {
        alert("Please select both a bet amount and a target!");
        return;
    }

    const playerCards = [getRandomCard(), getRandomCard()];
    const bankerCards = [getRandomCard(), getRandomCard()];

    updateCards('player-cards', playerCards);
    updateCards('banker-cards', bankerCards);

    const playerScore = calculateScore(playerCards);
    const bankerScore = calculateScore(bankerCards);

    let result = "";
    if (playerScore > bankerScore) {
        result = "Player";
    } else if (bankerScore > playerScore) {
        result = "Banker";
    } else {
        result = "Tie";
    }

    updateBalance(result);
    updatePoints();
    addRecord(result);
}

function getRandomCard() {
    return Math.floor(Math.random() * 9) + 1;
}

function calculateScore(cards) {
    return cards.reduce((sum, card) => sum + card, 0) % 10;
}

function updateCards(elementId, cards) {
    const cardContainer = document.getElementById(elementId);
    cardContainer.innerHTML = "";
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.textContent = card;
        cardContainer.appendChild(cardElement);
    });
}

function updateBalance(result) {
    if (result === currentTarget) {
        balance += currentBet;
    } else {
        balance -= currentBet;
    }
    document.getElementById('balance').textContent = balance;
}

function updatePoints() {
    points += currentBet / 2;
    document.getElementById('points').textContent = points;
}

function addRecord(result) {
    const recordGridElement = document.getElementById('record-grid');
    const recordElement = document.createElement('div');
    recordElement.className = 'record ' + (result === "Player" ? "player" : result === "Banker" ? "banker" : "tie");
    recordElement.textContent = result === "Player" ? "P" : result === "Banker" ? "B" : "T";
    recordGrid.push(recordElement);
    if (recordGrid.length > 16) {
        recordGrid.shift();
    }
    recordGridElement.innerHTML = "";
    recordGrid.forEach(record => recordGridElement.appendChild(record));
}

function redeemRewards() {
    if (points >= 2000) {
        alert("Congratulations! You have successfully redeemed. Save And Send Us.");
        points -= 2000;
    } else {
        alert("Not enough points to redeem rewards!");
    }
    document.getElementById('points').textContent = points;
}

function freeCredit() {
    window.location.href = "https://klking88.com";
}

function showPopup(message) {
    const popup = document.getElementById('success-popup');
    popup.textContent = message;
    popup.style.display = "block";
    setTimeout(() => popup.style.display = "none", 3000);
}
