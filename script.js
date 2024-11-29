const virtualCurrencyElement = document.getElementById('virtual-currency');
const scoreElement = document.getElementById('score');
const rewardSelection = document.getElementById('reward-selection');
const exchangeRewardButton = document.getElementById('exchange-reward');
const playerBetButton = document.getElementById('player-bet');
const bankerBetButton = document.getElementById('banker-bet');
const tieBetButton = document.getElementById('tie-bet');
const playerCardsElement = document.getElementById('player-cards');
const bankerCardsElement = document.getElementById('banker-cards');
const resultElement = document.getElementById('result');
const historyTable = document.getElementById('history-table');

let virtualCurrency = 1000;
let score = 0;
let history = [];

function updateDisplay() {
    virtualCurrencyElement.textContent = virtualCurrency;
    scoreElement.textContent = score;
    updateHistoryTable();
}

function addToHistory(winner) {
    if (history.length >= 12 * 8) {
        history = [];
    }
    history.push(winner);
    updateHistoryTable();
}

function updateHistoryTable() {
    historyTable.innerHTML = '';
    history.forEach(winner => {
        const cell = document.createElement('div');
        cell.classList.add(winner);
        historyTable.appendChild(cell);
    });
}

function generateCards() {
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const randomCard = () => `${ranks[Math.floor(Math.random() * ranks.length)]}${suits[Math.floor(Math.random() * suits.length)]}`;
    return [randomCard(), randomCard()];
}

function playGame(betType) {
    const playerCards = generateCards();
    const bankerCards = generateCards();
    const playerScore = Math.floor(Math.random() * 10);
    const bankerScore = Math.floor(Math.random() * 10);

    playerCardsElement.textContent = `Player Cards: ${playerCards.join(', ')}`;
    bankerCardsElement.textContent = `Banker Cards: ${bankerCards.join(', ')}`;

    let winner;
    if (playerScore > bankerScore) {
        winner = 'player';
    } else if (playerScore < bankerScore) {
        winner = 'banker';
    } else {
        winner = 'tie';
    }

    addToHistory(winner);

    if (betType === winner) {
        resultElement.textContent = `Congratulations! You won.`;
        virtualCurrency += 100;
        score += 10;
    } else {
        resultElement.textContent = `You lost.`;
        virtualCurrency -= 100;
    }
    updateDisplay();
}

playerBetButton.addEventListener('click', () => playGame('player'));
bankerBetButton.addEventListener('click', () => playGame('banker'));
tieBetButton.addEventListener('click', () => playGame('tie'));

exchangeRewardButton.addEventListener('click', () => {
    const selectedReward = rewardSelection.value;
    if (selectedReward === '200' && score >= 400) {
        virtualCurrency += 200;
        score -= 400;
    } else if (selectedReward === 'bonus' && score >= 500) {
        virtualCurrency += Math.floor(virtualCurrency * 0.6);
        score -= 500;
    } else if (selectedReward === 'free' && score >= 1000) {
        virtualCurrency += 1000;
        score -= 1000;
    }
    updateDisplay();
});

updateDisplay();
