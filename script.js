let balance = 1000;
let currentBet = null;
let currentTarget = null;

function selectBet(amount) {
    currentBet = amount;
    document.getElementById('current-bet').textContent = currentBet;
}

function selectTarget(target) {
    currentTarget = target;
    document.getElementById('current-target').textContent = currentTarget;
}

function startGame() {
    if (!currentBet || !currentTarget) {
        alert('Please select a bet amount and a target.');
        return;
    }

    const playerCards = [getRandomCard(), getRandomCard()];
    const bankerCards = [getRandomCard(), getRandomCard()];

    updateCards('player-cards', playerCards);
    updateCards('banker-cards', bankerCards);

    const playerScore = calculateScore(playerCards);
    const bankerScore = calculateScore(bankerCards);

    const result = determineWinner(playerScore, bankerScore);
    updateBalance(result);
    addRecord(result);
}

function getRandomCard() {
    return Math.floor(Math.random() * 10) + 1;
}

function calculateScore(cards) {
    return cards.reduce((sum, card) => sum + card, 0) % 10;
}

function determineWinner(playerScore, bankerScore) {
    if (playerScore > bankerScore) return 'Player';
    if (playerScore < bankerScore) return 'Banker';
    return 'Tie';
}

function updateBalance(result) {
    if (result === currentTarget) {
        balance += currentBet;
    } else {
        balance -= currentBet;
    }
    document.getElementById('balance').textContent = balance;
}

function updateCards(elementId, cards) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.style.backgroundImage = 'url("static/card-back.jpg")';
        container.appendChild(cardElement);
    });
}

function addRecord(result) {
    const recordContainer = document.getElementById('game-records');
    const record = document.createElement('div');
    record.className = `record ${result.toLowerCase()}`;
    record.textContent = result[0].toUpperCase();
    recordContainer.appendChild(record);

    if (recordContainer.children.length > 16) {
        recordContainer.removeChild(recordContainer.firstChild);
    }
}
