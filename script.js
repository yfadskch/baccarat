const ROWS = 8;
const COLS = 12;

let virtualMoney = 1000;
let score = 0;
let historyTable = [];
let currentCol = 0;

document.getElementById("virtual-money").innerText = virtualMoney;
document.getElementById("score").innerText = score;

function playGame(betType) {
  if (virtualMoney <= 0) {
    alert("游戏结束！请兑换奖励或重新开始！");
    return;
  }

  const betAmount = parseInt(document.getElementById("bet-amount").value);
  const result = ["player", "banker", "tie"][Math.floor(Math.random() * 3)];
  let resultMessage = "";

  if (betType === result) {
    resultMessage = `恭喜！你赢了，增加 ${betAmount} 虚拟货币和 ${betAmount / 10} 积分！`;
    virtualMoney += betAmount;
    score += betAmount / 10;
  } else {
    resultMessage = `很遗憾，你输了，减少 ${betAmount} 虚拟货币。结果是${result === "player" ? "玩家赢" : result === "banker" ? "庄家赢" : "平局"}！`;
    virtualMoney -= betAmount;
  }

  document.getElementById("virtual-money").innerText = virtualMoney;
  document.getElementById("score").innerText = score;
  document.getElementById("cards").innerText = resultMessage;

  updateHistory(result);
}

function updateHistory(result) {
  if (historyTable.length >= ROWS) {
    historyTable.shift();
  }

  if (!historyTable[currentCol]) {
    historyTable[currentCol] = [];
  }

  if (historyTable[currentCol].length >= COLS) {
    currentCol++;
    if (currentCol >= ROWS) currentCol = 0;
    historyTable[currentCol] = [];
  }

  historyTable[currentCol].push(result);

  renderHistory();
}

function renderHistory() {
  const table = document.getElementById("history-table");
  table.innerHTML = "";

  for (let row = 0; row < ROWS; row++) {
    const tr = document.createElement("tr");
    for (let col = 0; col < COLS; col++) {
      const td = document.createElement("td");
      if (historyTable[row] && historyTable[row][col]) {
        const result = historyTable[row][col];
        if (result === "player") td.className = "blue";
        if (result === "banker") td.className = "red";
        if (result === "tie") td.className = "green";
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}
