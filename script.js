let balance = 1000;
let currentBet = 0;
let selectedTarget = null;

document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
        currentBet = parseInt(chip.dataset.amount);
        updateBetDisplay();
    });
});

document.querySelectorAll('.target').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active state from other buttons
        document.querySelectorAll('.target').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        selectedTarget = button.dataset.target;
    });
});

document.getElementById('start-game').addEventListener('click', () => {
    if (!currentBet || !selectedTarget) {
        alert('请选择下注金额和目标！');
        return;
    }

    // Simulate game logic
    const playerCards = [drawCard(), drawCard()];
    const bankerCards = [drawCard(), drawCard()];
    const playerScore = calculateScore(playerCards);
    const bankerScore = calculateScore(bankerCards);

    let result = '';
    if (playerScore > bankerScore) {
        result = '玩家胜利！';
        if (selectedTarget === 'player') {
            balance += currentBet;
        } else {
            balance -= currentBet;
        }
    } else if (playerScore < bankerScore) {
        result = '庄家胜利！';
        if (selectedTarget === 'banker') {
            balance += currentBet;
        } else {
            balance -= currentBet;
        }
    } else {
        result = '平局！';
        if (selectedTarget === 'tie') {
            balance += currentBet * 8;
        } else {
            balance -= currentBet;
        }
    }

    updateBalanceDisplay();
    displayCards(playerCards, bankerCards);
    displayResult(result);
    addHistory(playerCards, bankerCards, result);
});

function drawCard() {
    return Math.floor(Math.random() * 9) + 1;
}

function calculateScore(cards) {
    return cards.reduce((acc, card) => acc + card, 0) % 10;
}

function updateBalanceDisplay() {
    document.getElementById('balance').textContent = balance;
}

function updateBetDisplay() {
    console.log(`当前下注金额：${currentBet}`);
}

function displayCards(playerCards, bankerCards) {
    const cardsDisplay = document.getElementById('cards-display');
    cardsDisplay.innerHTML = `
        <div>玩家卡牌: ${playerCards.join(', ')} (点数: ${calculateScore(playerCards)})</div>
        <div>庄家卡牌: ${bankerCards.join(', ')} (点数: ${calculateScore(bankerCards)})</div>
    `;
}

function displayResult(result) {
    document.getElementById('result').textContent = `结果: ${result}`;
}

function addHistory(playerCards, bankerCards, result) {
    const historyList = document.getElementById('history-list');
    const listItem = document.createElement('li');
    listItem.textContent = `玩家卡牌: ${playerCards.join(', ')} (点数: ${calculateScore(playerCards)}), 庄家卡牌: ${bankerCards.join(', ')} (点数: ${calculateScore(bankerCards)}), 结果: ${result}`;
    historyList.appendChild(listItem);
}
