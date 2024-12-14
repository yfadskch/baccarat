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

    let result = '';
    if (playerScore > bankerScore) {
        result = 'Player';
    } else if (bankerScore > playerScore) {
        result = 'Banker';
    } else {
        result = 'Tie';
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
    cardContainer.innerHTML = '';
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
        points += currentBet / 2;
    } else {
        balance -= currentBet;
        points += currentBet / 2;
    }
    document.getElementById('balance').textContent = balance;
    document.getElementById('points').textContent = points;
}

function addRecord(result) {
    const recordGrid = document.getElementById('record-grid');
    const recordElement = document.createElement('div');
    recordElement.className = 'record ' + result.toLowerCase();
    recordElement.textContent = result[0];
    recordGrid.appendChild(recordElement);
}

/* Modal functions */
function openRewardPopup() {
    document.getElementById('reward-modal').style.display = 'block';
}

function closeRewardPopup() {
    document.getElementById('reward-modal').style.display = 'none';
}

function redeemReward(pointsRequired) {
    if (points >= pointsRequired) {
        points -= pointsRequired;
        document.getElementById('points').textContent = points;
        alert("Reward redeemed successfully!");
    } else {
        alert("Not enough points to redeem this reward.");
    }
}
