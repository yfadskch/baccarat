let balance = 1000;
let points = 0;
let currentBet = null;
let currentTarget = null;

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
    recordElement.className = 'record';
    recordElement.textContent = result[0];
    recordGridElement.appendChild(recordElement);
}

function openRewardPopup() {
    const reward = prompt(
        'Choose a reward:\n1. 200 Points: +200 Credit\n2. 1000 Points: Welcome Bonus\n3. 3000 Points: Free 8.88'
    );
    if (reward === '1' && points >= 200) {
        balance += 200;
        points -= 200;
        alert('You have redeemed +200 Credit!');
    } else if (reward === '2' && points >= 1000) {
        points -= 1000;
        alert('You have redeemed Welcome Bonus');
    } else if (reward === '3' && points >= 3000) {
        points -= 3000;
        alert('You have redeemed Free 8.88!');
    } else {
        alert('Not enough points to redeem!');
    }
    document.getElementById('balance').textContent = balance;
    document.getElementById('points').textContent = points;
}
