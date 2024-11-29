// 初始化表格大小
const ROWS = 8;
const COLS = 12;
let gameResults = []; // 存储结果
let virtualCoins = 300; // 虚拟货币
let score = 650; // 积分

// 初始化表格
function initializeTable() {
    const table = document.getElementById("game-table");
    for (let row = 0; row < ROWS; row++) {
        const tr = document.createElement("tr");
        for (let col = 0; col < COLS; col++) {
            const td = document.createElement("td");
            td.id = `cell-${row}-${col}`;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

// 更新表格
function updateTable(result) {
    gameResults.push(result);

    let colIndex = 0; // 列索引
    let rowIndex = 0; // 行索引

    for (let i = 0; i < gameResults.length; i++) {
        rowIndex = i % ROWS; // 当前行
        colIndex = Math.floor(i / ROWS); // 当前列

        const cell = document.getElementById(`cell-${rowIndex}-${colIndex}`);
        if (!cell) continue; // 防止越界

        if (gameResults[i] === "player") {
            cell.className = "player-cell";
            cell.textContent = "蓝";
        } else if (gameResults[i] === "banker") {
            cell.className = "banker-cell";
            cell.textContent = "红";
        } else if (gameResults[i] === "tie") {
            cell.className = "tie-cell";
            cell.textContent = "绿";
        }
    }
}

// 模拟游戏逻辑
function playGame(bet) {
    if (virtualCoins <= 0) {
        alert("游戏结束！请兑换奖励或充值虚拟货币。");
        return;
    }

    const outcomes = ["player", "banker", "tie"];
    const result = outcomes[Math.floor(Math.random() * outcomes.length)];
    const playerCards = drawCards();
    const bankerCards = drawCards();

    updateTable(result);

    if (result === bet) {
        virtualCoins += 100;
        score += 10;
        alert(`恭喜！你赢了，增加 100 虚拟货币和 10 积分！`);
    } else {
        virtualCoins -= 100;
        alert(`很遗憾，你输了，减少 100 虚拟货币。`);
    }

    updateStats();
    updateLastRound(playerCards, bankerCards, result);
}

// 更新游戏状态
function updateStats() {
    document.getElementById("virtual-coins").textContent = virtualCoins;
    document.getElementById("score").textContent = score;
}

// 显示上一局卡牌和结果
function updateLastRound(playerCards, bankerCards, result) {
    const lastRoundDiv = document.getElementById("last-round");
    lastRoundDiv.innerHTML = `
        <h3>上一局记录:</h3>
        <p>玩家卡牌: ${playerCards.join(", ")}</p>
        <p>庄家卡牌: ${bankerCards.join(", ")}</p>
        <p>结果: ${result === "player" ? "玩家赢" : result === "banker" ? "庄家赢" : "平局"}</p>
    `;
}

// 抽取卡牌
function drawCards() {
    const suits = ["♠", "♥", "♦", "♣"];
    const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    return [
        `${ranks[Math.floor(Math.random() * ranks.length)]}${suits[Math.floor(Math.random() * suits.length)]}`,
        `${ranks[Math.floor(Math.random() * ranks.length)]}${suits[Math.floor(Math.random() * suits.length)]}`,
    ];
}

// 兑换奖励
function exchangeRewards() {
    if (score >= 100) {
        score -= 100;
        virtualCoins += 300;
        alert("成功兑换奖励！增加 300 虚拟货币，扣除 100 积分。");
        updateStats();
    } else {
        alert("积分不足，无法兑换奖励。");
    }
}

// 初始化
initializeTable();
updateStats();
