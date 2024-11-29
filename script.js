const currencyElement = document.getElementById("currency");
const pointsElement = document.getElementById("points");
const rewardSelect = document.getElementById("reward-select");
const exchangeRewardButton = document.getElementById("exchange-reward");
const betAmount = document.getElementById("bet-amount");
const playerWinButton = document.getElementById("player-win");
const bankerWinButton = document.getElementById("banker-win");
const tieButton = document.getElementById("tie");
const playerCardsDisplay = document.getElementById("player-cards");
const bankerCardsDisplay = document.getElementById("banker-cards");
const historyTable = document.getElementById("history-table");

let currency = 1000;
let points = 0;

function initializeHistoryTable() {
  historyTable.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    const row = document.createElement("div");
    row.classList.add("history-row");
    for (let j = 0; j < 12; j++) {
      const cell = document.createElement("div");
      cell.classList.add("history-cell");
      row.appendChild(cell);
    }
    historyTable.appendChild(row);
  }
}

function addToHistory(resultClass) {
  const rows = document.querySelectorAll(".history-row");
  for (let row of rows) {
    const emptyCell = row.querySelector(".history-cell:not(.filled)");
    if (emptyCell) {
      emptyCell.classList.add(resultClass, "filled");
      return;
    }
  }
}

function playRound(betType) {
  const playerCards = [getRandomCard(), getRandomCard()];
  const bankerCards = [getRandomCard(), getRandomCard()];

  playerCardsDisplay.textContent = `Player Cards: ${playerCards.join(", ")}`;
  bankerCardsDisplay.textContent = `Banker Cards: ${bankerCards.join(", ")}`;

  const result = Math.random();
  let resultClass;

  if (result < 0.45) {
    currency += betType === "player" ? parseInt(betAmount.value) : -parseInt(betAmount.value);
    resultClass = "player";
    addToHistory(resultClass);
  } else if (result < 0.9) {
    currency += betType === "banker" ? parseInt(betAmount.value) : -parseInt(betAmount.value);
    resultClass = "banker";
    addToHistory(resultClass);
  } else {
    currency += betType === "tie" ? parseInt(betAmount.value) * 8 : -parseInt(betAmount.value);
    resultClass = "tie";
    addToHistory(resultClass);
  }

  updateCurrencyAndPoints();
}

function getRandomCard() {
  const suits = ["♠", "♥", "♦", "♣"];
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  return `${values[Math.floor(Math.random() * values.length)]}${suits[Math.floor(Math.random() * suits.length)]}`;
}

function updateCurrencyAndPoints() {
  currencyElement.textContent = currency;
  pointsElement.textContent = points;
}

function exchangeReward() {
  const selectedReward = rewardSelect.value;
  if (selectedReward === "200-currency" && points >= 400) {
    points -= 400;
    currency += 200;
  } else if (selectedReward === "welcome-bonus" && points >= 500) {
    points -= 500;
    currency += Math.floor(currency * 0.6);
  } else if (selectedReward === "free-claim" && points >= 1000) {
    points -= 1000;
    currency += 100;
  } else {
    alert("Not enough points for this reward!");
  }
  updateCurrencyAndPoints();
}

exchangeRewardButton.addEventListener("click", exchangeReward);
playerWinButton.addEventListener("click", () => playRound("player"));
bankerWinButton.addEventListener("click", () => playRound("banker"));
tieButton.addEventListener("click", () => playRound("tie"));

initializeHistoryTable();
updateCurrencyAndPoints();
