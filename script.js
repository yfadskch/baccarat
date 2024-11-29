// 初始化表格大小
const ROWS = 8;
const COLS = 12;
let gameResults = []; // 存储结果

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
    // 记录结果
    gameResults.push(result);

    let colIndex = 0; // 列索引
    let rowIndex = 0; // 行索引

    for (let i = 0; i < gameResults.length; i++) {
        rowIndex = i % ROWS; // 当前行
        colIndex = Math.floor(i / ROWS); // 当前列

        const cell = document.getElementById(`cell-${rowIndex}-${colIndex}`);
        if (!cell) continue; // 防止越界

        // 设置单元格样式
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
    const outcomes = ["player", "banker", "tie"]; // 游戏结果
    const result = outcomes[Math.floor(Math.random() * outcomes.length)]; // 随机生成结果

    updateTable(result); // 更新表格
    alert(`您投注了: ${bet === "player" ? "玩家" : bet === "banker" ? "庄家" : "平局"}，结果是: ${result === "player" ? "玩家赢" : result === "banker" ? "庄家赢" : "平局"}`);
}

// 初始化游戏
initializeTable();
