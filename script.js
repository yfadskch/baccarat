let balance = 1000;
let currentBet = null;
let currentTarget = null;
let recordGrid = [];

function selectBet(amount) {
    currentBet = amount;
    document.getElementById('current-bet').textContent = `Current Bet Amount: ${amount}`;
}

function selectTarget(target) {
    currentTarget = target;
    document.getElementById('current-target').textContent = `Current Target: ${target}`;
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
    document.getElementById('balance').textContent = `Current Balance: ${balance}`;
}

function addRecord(result) {
    const recordGridElement = document.getElementById('record-grid');
    const recordElement = document.createElement('div');
    recordElement.className = 'record ' + (result === "Player" ? "player" : result === "Banker" ? "banker" : "tie");
    recordElement.textContent = result === "Player" ? "P" : result === "Banker" ? "B" : "T";
    recordGridElement.appendChild(recordElement);

    if (recordGridElement.children.length > 16) {
        recordGridElement.removeChild(recordGridElement.children[0]);
    }
}
