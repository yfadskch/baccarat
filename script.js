let score = 1000;
let currency = 1000;

function dealCard() {
    return Math.floor(Math.random() * 10) + 1; // 随机生成1-10的牌
}

function displayCards(cardsContainer, cards) {
    cardsContainer.innerHTML = '';
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.textContent = card;
        cardsContainer.appendChild(cardElement);
    });
}

function calculateScore(cards) {
    return cards.reduce((acc, card) => acc + card, 0) % 10; // 百家乐得分计算
}

function updateScoreBoard() {
    document.getElementById('score').textContent = score;
    document.getElementById('currency').textContent = currency;
}

function playGame(betType) {
    const betAmount = parseInt(document.getElementById('bet-amount').value);
    if (currency < betAmount) {
        alert('余额不足，请重新下注！');
        return;
    }

    currency -= betAmount;

    const playerCards = [dealCard(), dealCard()];
    const bankerCards = [dealCard(), dealCard()];
    const playerScore = calculateScore(playerCards);
    const bankerScore = calculateScore(bankerCards);

    const playerCardsContainer = document.getElementById('player-cards');
    const bankerCardsContainer = document.getElementById('banker-cards');

    displayCards(playerCardsContainer, playerCards);
    displayCards(bankerCardsContainer, bankerCards);

    let resultText = '';
    if (playerScore > bankerScore) {
        resultText = '玩家赢！';
        if (betType === 'player') {
            currency += betAmount * 2;
            score += 10;
        }
    } else if (playerScore < bankerScore) {
        resultText = '庄家赢！';
        if (betType === 'banker') {
            currency += betAmount * 1.95;
            score += 10;
        }
    } else {
        resultText = '平局！';
        if (betType === 'tie') {
            currency += betAmount * 8;
            score += 20;
        }
    }

    document.getElementById('result').textContent = resultText;
    updateScoreBoard();
}

document.getElementById('player-bet').addEventListener('click', () => playGame('player'));
document.getElementById('banker-bet').addEventListener('click', () => playGame('banker'));
document.getElementById('tie-bet').addEventListener('click', () => playGame('tie'));

updateScoreBoard();
