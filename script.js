const virtualCurrencyElement = document.getElementById("virtual-currency");
const scoreElement = document.getElementById("score");
const rewardSelection = document.getElementById("reward-selection");
const exchangeRewardButton = document.getElementById("exchange-reward");
const betAmountSelection = document.getElementById("bet-amount");
const playerWinButton = document.getElementById("player-win");
const bankerWinButton = document.getElementById("banker-win");
const tieWinButton = document.getElementById("tie-win");
const cardResultsElement = document.getElementById("card-results");
const historyTable = document.getElementById("history-table");

let virtualCurrency = 1000;
let score = 0;
let historyData = [];
const ROWS = 6; // Rows for the history table
const COLS = 12; // Columns for the history table

function initializeTable() {
    historyTable.innerHTML = ""; // Clear existing table
    for (let i = 0; i < ROWS; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < COLS; j++) {
            const cell = document.createElement("td");
            row.appendChild(cell);
        }
        historyTable.appendChild(row);
    }
}

function updateCurrencyAndScore() {
    virtualCurrencyElement.textContent = virtualCurrency;
    scoreElement.textContent = score;
}

function addHistoryRecord(result) {
    if (historyData.length >= ROWS * COLS) {
        historyData.shift(); // Remove the oldest record if table is full
    }
    historyData.push(result);
    renderHistory();
}

function renderHistory() {
    initializeTable();
    historyData.forEach((result, index) => {
        const row = Math.floor(index / COLS);
        const col = index % COLS;
        const cell = historyTable.rows[row].cells[col];
        cell.classList.add(result);
    });
}

function getRandomCard() {
    const suits = ["♠", "♥", "♦", "♣"];
    const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    return `${rank}${suit}`;
}

function handleBet(betType) {
    const betAmount = parseInt(betAmountSelection.value);
    if (virtualCurrency < betAmount) {
        alert("Not enough virtual currency!");
        return;
    }

    virtualCurrency -= betAmount;

    const playerCards = [getRandomCard(), getRandomCard()];
    const bankerCards = [getRandomCard(), getRandomCard()];
    const winner = Math.random() < 0.5 ? "player" : "banker";

    let resultMessage;
    if (betType === winner) {
        resultMessage = `Congratulations! You won, gaining ${betAmount} virtual currency and 10 points!`;
        virtualCurrency += betAmount * 2;
        score += 10;
        addHistoryRecord(winner === "player" ? "blue" : "red");
    } else {
        resultMessage = `Sorry, you lost. You lost ${betAmount} virtual currency.`;
        addHistoryRecord("green");
    }

    cardResultsElement.innerHTML = `
        <p>Player Cards: ${playerCards.join(", ")}</p>
        <p>Banker Cards: ${bankerCards.join(", ")}</p>
        <p>${resultMessage}</p>
    `;

    updateCurrencyAndScore();
}

exchangeRewardButton.addEventListener("click", () => {
    const selectedReward = rewardSelection.value;
    if (selectedReward === "200" && score >= 400) {
        virtualCurrency += 200;
        score -= 400;
        alert("You have exchanged 200 virtual currency for 400 points!");
    } else if (selectedReward === "bonus" && score >= 500) {
        alert("You have claimed the 60% Welcome Bonus!");
    } else if (selectedReward === "free" && score >= 1000) {
        alert("You have claimed the Free Without Deposit reward!");
    } else {
        alert("Not enough points for the selected reward!");
    }
    updateCurrencyAndScore();
});

playerWinButton.addEventListener("click", () => handleBet("player"));
bankerWinButton.addEventListener("click", () => handleBet("banker"));
tieWinButton.addEventListener("click", () => handleBet("tie"));

initializeTable();
updateCurrencyAndScore();
