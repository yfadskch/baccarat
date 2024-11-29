let virtualCurrency = 1000;
let points = 0;
const ROWS = 4;
const COLS = 12;
let history = [];

document.getElementById("virtual-currency").textContent = virtualCurrency;
document.getElementById("points").textContent = points;

// 初始化历史记录表格
function initializeTable() {
    const historyRecord = document.getElementById("history-record");
    historyRecord.innerHTML = "";
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            const cell = document.createElement("div");
            historyRecord.appendChild(cell);
        }
    }
}
initializeTable();

// 更新表格
function updateHistory(result) {
    history.push(result);
    if (history.length > ROWS * COLS) {
        history.shift(); // 移除最早的记录
    }
    const cells = document.querySelectorAll("#history-record div");
    cells.forEach((cell, index) => {
        cell.className = ""; // 清除旧样式
        if (index < history.length) {
            cell.classList.add(history[index]);
        }
    });
}

// 投注逻辑
function placeBet(type) {
    const betAmount = parseInt(document.getElementById("bet-amount").value);
    if (virtualCurrency < betAmount) {
        alert("虚拟货币不足！");
        return;
    }

    virtualCurrency -= betAmount;
    document.getElementById("virtual-currency").textContent = virtualCurrency;

    // 模拟结果
    const outcomes = ["player", "banker", "tie"];
    const result = outcomes[Math.floor(Math.random() * outcomes.length)];
    let message = "";

    if (type === result) {
        points += betAmount / 10;
        virtualCurrency += betAmount * 2;
        message = `恭喜！你赢了，增加 ${betAmount} 虚拟货币和 ${betAmount / 10} 积分！`;
    } else {
        message = `很遗憾，你输了，减少 ${betAmount} 虚拟货币。`;
    }

    document.getElementById("points").textContent = points;
    document.getElementById("card-display").textContent = message;

    // 更新表格
    if (result === "player") updateHistory("blue");
    else if (result === "banker") updateHistory("red");
    else updateHistory("green");
}

// 添加投注按钮事件
document.getElementById("player-bet").addEventListener("click", () => placeBet("player"));
document.getElementById("banker-bet").addEventListener("click", () => placeBet("banker"));
document.getElementById("tie-bet").addEventListener("click", () => placeBet("tie"));

// 兑换奖励逻辑
document.getElementById("redeem-reward").addEventListener("click", () => {
    const selectedReward = parseInt(document.getElementById("reward-options").value);
    if (points < selectedReward) {
        alert("积分不足！");
        return;
    }
    points -= selectedReward;
    document.getElementById("points").textContent = points;

    if (selectedReward === 100) {
        virtualCurrency += 200;
        alert("成功兑换200虚拟货币！");
    } else if (selectedReward === 500) {
        alert("成功兑换特殊卡牌！");
    } else if (selectedReward === 1000) {
        alert("成功兑换免费投注机会！");
    }
    document.getElementById("virtual-currency").textContent = virtualCurrency;
});
