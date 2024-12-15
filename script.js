let currentBalance = 1000;
let currentPoints = 0;
let currentBet = null;
let currentTarget = null;

function setBet(amount) {
    currentBet = amount;
    document.getElementById('current-bet').textContent = amount;
}

function setTarget(target) {
    currentTarget = target;
    document.getElementById('current-target').textContent = target;
}

function startGame() {
    if (!currentBet || !currentTarget) {
        alert('Please select a bet amount and target!');
        return;
    }

    const playerCards = [randomCard(), randomCard()];
    const bankerCards = [randomCard(), randomCard()];
    displayCards('player-cards', playerCards);
    displayCards('banker-cards', bankerCards);

    const playerTotal = sumCards(playerCards);
    const bankerTotal = sumCards(bankerCards);

    let result = playerTotal > bankerTotal ? 'Player' : bankerTotal > playerTotal ? 'Banker' : 'Tie';
    addGameRecord(result);

    if (result === currentTarget) {
        currentBalance += currentBet;
        currentPoints += 100;
    } else {
        currentBalance -= currentBet;
    }

    updateDisplay();
}

function randomCard() {
    return Math.floor(Math.random() * 9) + 1;
}

function sumCards(cards) {
    return cards.reduce((a, b) => a + b, 0) % 10;
}

function displayCards(elementId, cards) {
    const container = document.getElementById(elementId);
    container.textContent = cards.join(' ');
}

function addGameRecord(result) {
    const recordDiv = document.createElement('div');
    recordDiv.classList.add('record', result.toLowerCase());
    recordDiv.textContent = result === 'Player' ? 'P' : result === 'Banker' ? 'B' : 'T';

    const recordsContainer = document.getElementById('game-records');
    if (recordsContainer.children.length >= 16) {
        recordsContainer.removeChild(recordsContainer.firstChild);
    }
    recordsContainer.appendChild(recordDiv);
}

function openRewardPopup() {
    let reward = prompt('Choose a reward:\n1. 200 Points: +200 Credit\n2. 1000 Points: Welcome Bonus\n3. 3000 Points: Free 8.88');

    if (reward === '1' && currentPoints >= 200) {
        currentBalance += 200;
        currentPoints -= 200;
        alert('You redeemed 200 Points for +200 Credit!');
    } else if (reward === '2' && currentPoints >= 1000) {
        alert('You redeemed 1000 Points for Welcome Bonus!');
    } else if (reward === '3' && currentPoints >= 3000) {
        alert('You redeemed 3000 Points for Free 8.88!');
    } else {
        alert('Not enough points to redeem this reward!');
    }
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('current-balance').textContent = currentBalance;
    document.getElementById('current-points').textContent = currentPoints;
}
