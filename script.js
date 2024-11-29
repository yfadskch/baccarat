let currency = 1000;
let points = 0;

// DOM Elements
const currencyDisplay = document.getElementById('currency');
const pointsDisplay = document.getElementById('points');
const playerCardsDisplay = document.getElementById('playerCards');
const bankerCardsDisplay = document.getElementById('bankerCards');
const resultMessage = document.getElementById('resultMessage');

const lastBetTypeDisplay = document.getElementById('lastBetType');
const lastPlayerCardsDisplay = document.getElementById('lastPlayerCards');
const lastBankerCardsDisplay = document.getElementById('lastBankerCards');
const lastResultDisplay = document.getElementById('lastResult');

// Utility functions
function getRandomCard() {
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    return ranks[Math.floor(Math.random() * ranks.length)] + suits[Math.floor(Math.random() * suits.length)];
}

function calculatePoints(cards) {
    let points = 0;
    cards.forEach(card => {
        let value = card.slice(0, -1); // Get the number or face of the card
        if (['J', 'Q', 'K'].includes(value)) value = 0; // Face cards are 0
        else if (value === 'A') value = 1; // Ace is 1
        points += parseInt(value) || 0; // Add card value
    });
    return points % 10; // Only last digit counts
}

function updateCurrencyAndPoints(amount) {
    currency += amount;
    points += amount > 0 ? amount / 10 : 0;
    currencyDisplay.textContent = currency;
    pointsDisplay.textContent = points;
}

// Game logic
function playGame(betType) {
    if (currency <= 0) {
        resultMessage.textContent = "虚拟货币不足，游戏结束！";
        return;
    }

    // Save last game results
    lastBetTypeDisplay.textContent = betType;
    lastPlayerCardsDisplay.textContent = playerCardsDisplay.textContent;
    lastBankerCardsDisplay.textContent = bankerCardsDisplay.textContent;
    lastResultDisplay.textContent = resultMessage.textContent;

    // Generate cards
    const playerCards = [getRandomCard(), getRandomCard()];
    const bankerCards = [getRandomCard(), getRandomCard()];

    // Calculate points
    const playerPoints = calculatePoints(playerCards);
    const bankerPoints = calculatePoints(bankerCards);

    // Display cards
    playerCardsDisplay.textContent = playerCards.join(', ');
    bankerCardsDisplay.textContent = bankerCards.join(', ');

    // Determine the winner
    let result;
    if (playerPoints > bankerPoints) result = '玩家赢';
    else if (playerPoints < bankerPoints) result = '庄家赢';
    else result = '平局';

    // Update result message and currency
    if ((betType === '玩家赢' && result === '玩家赢') ||
        (betType === '庄家赢' && result === '庄家赢') ||
        (betType === '平局' && result === '平局')) {
        resultMessage.textContent = `恭喜！你赢了，增加 100 虚拟货币和 10 积分！`;
        updateCurrencyAndPoints(100);
    } else {
        resultMessage.textContent = `很遗憾，你输了，减少 100 虚拟货币。`;
        updateCurrencyAndPoints(-100);
    }
}

// Event listeners
document.getElementById('playerBet').addEventListener('click', () => playGame('玩家赢'));
document.getElementById('bankerBet').addEventListener('click', () => playGame('庄家赢'));
document.getElementById('tieBet').addEventListener('click', () => playGame('平局'));
document.getElementById('redeem').addEventListener('click', () => {
    if (points >= 100) {
        points -= 100;
        pointsDisplay.textContent = points;
        alert('兑换成功！您获得了额外奖励！');
    } else {
        alert('积分不足，无法兑换！');
    }
});
