const ROWS = 8;
const COLS = 12;

let virtualMoney = 1000;
let points = 0;
let historyData = [];
let currentBet = 100;

document.getElementById("bet-amount").addEventListener("change", (e) => {
  currentBet = parseInt(e.target.value);
});

document.getElementById("player-win").addEventListener("click", () => placeBet("player"));
document.getElementById("banker-win").addEventListener("click", () => placeBet("banker"));
document.getElementById("tie").addEventListener("click", () => placeBet("tie"));

function placeBet(type) {
  if (virtualMoney < currentBet) {
    alert("虚拟货币不足，请兑换奖励或重新开始游戏！");
    return;
  }

  const result = simulateGame();
  const winType = result.winner;
  const playerCards = result.playerCards.join(", ");
  const bankerCards = result.bankerCards.join(", ");

  document.getElementById("card-display").innerHTML = `
    玩家卡牌: ${playerCards}<br>
    庄家卡牌: ${bankerCards}
  `;

  if (winType === type) {
    virtualMoney += currentBet;
    points += currentBet / 10;
    alert(`恭喜！你赢了，增加 ${currentBet} 虚拟货币和 ${currentBet / 10} 积分！`);
  } else {
    virtualMoney -= currentBet;
    alert(`很遗憾，你输了，减少 ${currentBet} 虚拟货币。`);
  }

  document.getElementById("virtual-money").textContent = virtualMoney;
  document.getElementById("points").textContent = points;

  addToHistory(winType);
  if (historyData.length === ROWS * COLS) clearHistory();
}

function simulateGame() {
  const playerCards = generateRandomCards();
  const bankerCards = generateRandomCards();
  const playerScore = calculateScore(playerCards);
  const bankerScore = calculateScore(bankerCards);

  let winner = "tie";
  if (playerScore > bankerScore) {
    winner = "player";
  } else if (playerScore < bankerScore) {
    winner = "banker";
  }

  return { winner, playerCards, bankerCards };
}

function generateRandomCards() {
  const suits = ["♥", "♦", "♣", "♠"];
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const card1 = `${values[Math.floor(Math.random() * values.length)]}${suits[Math.floor(Math.random() * suits.length)]}`;
  const card2 = `${values[Math.floor(Math.random() * values.length)]}${suits[Math.floor(Math.random() * suits.length)]}`;
  return [card1, card2];
}

function calculateScore(cards) {
  let score = 0;
  cards.forEach((card) => {
    const value = card.slice(0, -1);
    if (["J", "Q", "K"].includes(value)) {
      score += 10;
    } else if (value === "A") {
      score += 1;
    } else {
      score += parseInt(value);
    }
  });
  return score % 10;
}

function addToHistory(winType) {
  if (winType === "player") {
    historyData.push("blue");
  } else if (winType === "banker") {
    historyData.push("red");
  } else {
    historyData.push("green");
  }
  renderHistoryTable();
}

function renderHistoryTable() {
  const table = document.getElementById("history-table");
  table.innerHTML = "";
  let index = 0;

  for (let i = 0; i < ROWS; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < COLS; j++) {
      const cell = document.createElement("td");
      if (index < historyData.length) {
        cell.className = historyData[index];
      } else {
        cell.className = "empty";
      }
      row.appendChild(cell);
      index++;
    }
    table.appendChild(row);
  }
}

function clearHistory() {
  historyData = [];
  renderHistoryTable();
}

renderHistoryTable();
