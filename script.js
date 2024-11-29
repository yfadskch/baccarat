const currencyDisplay = document.getElementById("currency");
const scoreDisplay = document.getElementById("score");
const playerCardsDisplay = document.getElementById("player-cards");
const bankerCardsDisplay = document.getElementById("banker-cards");
const historyTable = document.getElementById("history-table");

let currency = 1000;
let score = 0;

// Initialize history table
function initializeHistoryTable() {
    historyTable.innerHTML = "";
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 12; j++) {
            const cell = document.createElement("div");
            historyTable.appendChild(cell);
        }
    }
}
initializeHistoryTable();

function updateCurrencyAndScore() {
    currencyDisplay.textContent = currency;
    scoreDisplay.textContent = score;
}

// Simulate card dealing
function getRandomCard() {
    const suits = ["♠", "♥", "♦", "♣"];
    const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    return `${value}${suit}`;
}

function playRound(betType) {
    const playerCards = [getRandomCard(), getRandomCard()];
    const bankerCards = [getRandomCard(), getRandomCard()];

    playerCardsDisplay.textContent = `玩家卡牌: ${playerCards.join(", ")}`;
    bankerCardsDisplay.textContent = `庄家卡牌: ${bankerCards.join(", ")}`;

    const result = Math.random(); // Simulate result
    let cell;

    if (result < 0.45) {
        currency += betType === "player" ? parseInt(betAmount.value) : -parseInt(betAmount.value);
        cell = document.createElement("div");
        cell.classList.add("player");
    } else if (result < 0.9) {
        currency += betType === "banker" ? parseInt(betAmount.value) : -parseInt(betAmount.value);
        cell = document.createElement("div");
        cell.classList.add("banker");
    } else {
        currency += betType === "tie" ? parseInt(betAmount.value) * 8 : -parseInt(betAmount.value);
        cell = document.createElement("div");
        cell.classList.add("tie");
    }

    // Append to history table
    historyTable.appendChild(cell);

    updateCurrencyAndScore();
}

// Event listeners
document.getElementById("player-win").addEventListener("click", () => playRound("player"));
document.getElementById("banker-win").addEventListener("click", () => playRound("banker"));
document.getElementById("tie").addEventListener("click", () => playRound("tie"));

document.getElementById("claim-reward").addEventListener("click", () => {
    const rewardValue = document.getElementById("reward-select").value;
    if (rewardValue === "200" && score >= 400) {
        currency += 200;
        score -= 400;
    } else if (rewardValue === "welcome-bonus" && score >= 500) {
        currency += currency * 0.6;
        score -= 500;
    } else if (rewardValue === "free-tanpa" && score >= 1000) {
        currency += 1000;
        score -= 1000;
    } else {
        alert("积分不足，无法兑换奖励！");
    }
    updateCurrencyAndScore();
});
