const ROWS = 8;
const COLS = 12;
let virtualCoins = 300;
let points = 650;

// 初始化表格
function initializeTable() {
    const historyBody = document.getElementById("historyBody");
    historyBody.innerHTML = "";
    for (let i = 0; i < ROWS; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < COLS; j++) {
            const cell = document.createElement("td");
            row.appendChild(cell);
        }
        historyBody.appendChild(row);
    }
}

// 更新表格
function updateTable(result) {
    const cells = document.querySelectorAll("#historyTable td");
    const nextCell = Array.from(cells).find(cell => !cell.classList.contains("blue") && !cell.classList.contains("red") && !cell.classList.contains("green"));
    if (nextCell) {
        if (result === "player") {
            nextCell.classList.add("blue");
            nextCell.textContent = "蓝";
        } else if (result === "banker") {
            nextCell.classList.add("red");
            nextCell.textContent = "红";
        } else if (result === "tie") {
            nextCell.classList.add("green");
            nextCell.textContent = "绿";
        }
    }
}

// 模拟发牌
function dealCards() {
    const suits = ["♠", "♥", "♦", "♣"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    const getCard = () => `${values[Math.floor(Math.random() * values.length)]}${suits[Math.floor(Math.random() * suits.length)]}`;
    const playerCards = [getCard(), getCard()];
    const bankerCards = [getCard(), getCard()];

    document.getElementById("cards").innerHTML = `
        玩家卡牌: ${playerCards.join(", ")}<br>
        庄家卡牌: ${bankerCards.join(", ")}
    `;

    // 随机决定胜负
    const outcomes = ["player", "banker", "tie"];
    return outcomes[Math.floor(Math.random() * outcomes.length)];
}

// 更新虚拟货币和积分
function updateStats(result) {
    if (result === "player") {
        virtualCoins += 100;
        points += 10;
        document.getElementById("gameResult").textContent = "恭喜！你赢了，增加 100 虚拟货币和 10 积分！";
    } else if (result === "banker") {
        virtualCoins -= 100;
        document.getElementById("gameResult").textContent = "很遗憾，你输了，减少 100 虚拟货币。";
    } else if (result === "tie") {
        document.getElementById("gameResult").textContent = "平局，没有输赢。";
    }

    document.getElementById("virtualCoins").textContent = virtualCoins;
    document.getElementById("points").textContent = points;

    if (virtualCoins <= 0) {
        alert("虚拟货币已用完，游戏结束！");
    }
}

// 绑定按钮事件
document.getElementById("playerWin").addEventListener("click", () => {
    const result = dealCards();
    updateTable(result);
    updateStats(result);
});

document.getElementById("bankerWin").addEventListener("click", () => {
    const result = dealCards();
    updateTable(result);
    updateStats(result);
});

document.getElementById("tie").addEventListener("click", () => {
    const result = dealCards();
    updateTable(result);
    updateStats(result);
});

document.getElementById("redeemButton").addEventListener("click", () => {
    alert(`积分兑换功能尚未实现！`);
});

// 初始化表格
initializeTable();
