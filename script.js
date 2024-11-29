let virtualCurrency = 1000;
let points = 0;
const ROWS = 8; // 表格行数
const COLS = 12; // 表格列数
let history = []; // 用于存储历史记录

document.getElementById("playerWin").addEventListener("click", () => playGame("playerWin"));
document.getElementById("bankerWin").addEventListener("click", () => playGame("bankerWin"));
document.getElementById("tie").addEventListener("click", () => playGame("tie"));

function getBetAmount() {
  return parseInt(document.getElementById("bet-amount").value);
}

function playGame(resultType) {
  const betAmount = getBetAmount();
  if (virtualCurrency < betAmount) {
    alert("虚拟货币不足，无法下注！");
    return;
  }

  virtualCurrency -= betAmount;
  const playerCards = drawCards();
  const bankerCards = drawCards();
  const winner = determineWinner(playerCards, bankerCards);

  if (resultType === winner) {
    virtualCurrency += betAmount * 2;
    points += betAmount / 10;
    history.push(winner === "playerWin" ? "蓝" : "红");
    alert(`恭喜！你赢了，增加 ${betAmount * 2} 虚拟货币！`);
  } else if (resultType === "tie" && winner === "tie") {
    virtualCurrency += betAmount;
    points += betAmount / 5;
    history.push("绿");
    alert(`平局，返还 ${betAmount} 虚拟货币！`);
  } else {
    history.push(winner === "playerWin" ? "蓝" : "红");
    alert(`很遗憾，你输了，减少 ${betAmount} 虚拟货币。`);
  }

  updateUI();
  updateTable();
}

function drawCards() {
  const suits = ["♠", "♥", "♦", "♣"];
  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  return [
    `${ranks[Math.floor(Math.random() * ranks.length)]}${suits[Math.floor(Math.random() * suits.length)]}`,
    `${ranks[Math.floor(Math.random() * ranks.length)]}${suits[Math.floor(Math.random() * suits.length)]}`
  ];
}

function determineWinner(playerCards, bankerCards) {
  const playerScore = calculateScore(playerCards);
  const bankerScore = calculateScore(bankerCards);
  if (playerScore > bankerScore) return "playerWin";
  if (bankerScore > playerScore) return "bankerWin";
  return "tie";
}

function calculateScore(cards) {
  return cards.reduce((sum, card) => {
    const value = card.slice(0, -1);
    return sum + (isNaN(value) ? (value === "A" ? 1 : 10) : parseInt(value));
  }, 0) % 10;
}

function updateUI() {
  document.getElementById("virtual-currency").textContent = `虚拟货币: ${virtualCurrency}`;
  document.getElementById("points").textContent = `积分: ${points}`;
}

function updateTable() {
  const table = document.getElementById("history-table");
  table.innerHTML = ""; // 清空表格内容
  let rowIndex = 0;

  history.forEach((item, index) => {
    if (index % ROWS === 0) {
      const row = table.insertRow(rowIndex++);
    }
    const cell = table.rows[rowIndex - 1].insertCell(index % ROWS);
    cell.textContent = item;
    cell.className = item === "蓝" ? "blue" : item === "红" ? "red" : "green";
  });

  // 如果表格满了，清空历史记录
  if (history.length >= ROWS * COLS) {
    history = [];
  }
}
