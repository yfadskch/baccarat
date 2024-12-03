let balance = 1000;
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

function addRecord(result) {
    const recordGridElement = document.getElementById('record-grid');
    const recordElement = document.createElement('div');
    recordElement.className = 'record ' + (result === "Player" ? "player" : result === "Banker" ? "banker" : "tie");
    recordElement.textContent = result === "Player" ? "P" : result === "Banker" ? "B" : "T";
    recordGridElement.appendChild(recordElement);
    if (recordGridElement.children.length > 16) {
        recordGridElement.removeChild(recordGridElement.firstChild);
    }
}

function redirectToFreeCredit() {
    window.location.href = "https://klking88.com";
}

function showRedeemOptions() {
    if (balance <= 0) {
        alert("Insufficient Balance! Cannot redeem rewards.");
        return;
    }
    document.getElementById('redeem-modal').style.display = "block";
}

function closeModal() {
    document.getElementById('redeem-modal').style.display = "none";
}

function redeemReward(points, reward) {
    if (balance < points) {
        alert("Not enough balance to redeem this reward.");
    } else {
        if (typeof reward === "number") {
            balance += reward;
        } else {
            alert(`You have earned: ${reward}`);
        }
        document.getElementById('balance').textContent = balance;
        alert("Congratulations! Reward successfully redeemed!");
        closeModal();
    }
}
