let balance = 1000;
let currentBet = 0;
let currentTarget = '';

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
        alert('Please select a bet amount and target!');
        return;
    }

    const playerCards = [getRandomCard(), getRandomCard()];
    const bankerCards = [getRandomCard(), getRandomCard()];

    renderCards('player-cards', playerCards);
    renderCards('banker-cards', bankerCards);

    const playerScore = calculateScore(playerCards);
    const bankerScore = calculateScore(bankerCards);

    let result = '';
    if (playerScore > bankerScore) result = 'Player';
    else if (playerScore < bankerScore) result = 'Banker';
    else result = 'Tie';

    addRecord(result);
    updateBalance(result);
}

function getRandomCard() {
    return Math.floor(Math.random() * 9) + 1;
}

function calculateScore(cards) {
    return cards.reduce((sum, card) => sum + card, 0) % 10;
}

function renderCards(elementId, cards) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card flip';
        cardElement.innerHTML = `
            <div class="front">${card}</div>
            <div class="back"></div>
        `;
        container.appendChild(cardElement);
        setTimeout(() => cardElement.classList.add('flip'), 100);
    });
}

function addRecord(result) {
    const recordGrid = document.getElementById('record-grid');
    const record = document.createElement('div');
    record.className = `record ${result.toLowerCase()}`;
    record.textContent = result[0];
    recordGrid.prepend(record);

    if (recordGrid.children.length > 16) {
        recordGrid.removeChild(recordGrid.lastChild);
    }
}

function updateBalance(result) {
    if (result === currentTarget) balance += currentBet;
    else balance -= currentBet;
    document.getElementById('balance').textContent = balance;
}
