let balance = 1000;
let history = [];

// 更新余额
function updateBalance(amount) {
    document.getElementById("balance").innerText = balance;
}

// 随机抽牌
function drawCard() {
    return Math.floor(Math.random() * 9) + 1; // 卡牌点数为 1-9
}

// 计算点数
function calculateScore(cards) {
    return cards.reduce((sum, card) => sum + card, 0) % 10; // 取个位数
}

// 显示结果
function displayResult(playerCards, bankerCards, result) {
    document.getElementById("player-cards").innerText = `玩家卡牌: ${playerCards}，点数: ${calculateScore(playerCards)}`;
    document.getElementById("banker-cards").innerText = `庄家卡牌: ${bankerCards}，点数: ${calculateScore(bankerCards)}`;
    document.getElementById("game-result").innerText = `结果: ${result}`;
}

// 记录历史
function addHistory(playerCards, bankerCards, result) {
    const record = `玩家卡牌: ${playerCards} (点数: ${calculateScore(playerCards)})，庄家卡牌: ${bankerCards} (点数: ${calculateScore(bankerCards)})，结果: ${result}`;
    history.push(record);
    const li = document.createElement("li");
    li.textContent = record;
    document.getElementById("history-list").appendChild(li);
}

// 游戏逻辑
document.getElementById("start-game").addEventListener("click", () => {
    const bet = parseInt(document.querySelector(".chip.selected")?.getAttribute("data-value"));
    const option = document.getElementById("bet-option").value;

    if (!bet || balance < bet) {
        alert("请先选择下注金额，或余额不足！");
        return;
    }

    const playerCards = [drawCard(), drawCard()];
    const bankerCards = [drawCard(), drawCard()];
    const playerScore = calculateScore(playerCards);
    const bankerScore = calculateScore(bankerCards);

    let result;
    if (playerScore > bankerScore) {
        result = "玩家胜利！";
        if (option === "player") balance += bet;
        else balance -= bet;
    } else if (playerScore < bankerScore) {
        result = "庄家胜利！";
        if (option === "banker") balance += bet;
        else balance -= bet;
    } else {
        result = "平局！";
        if (option === "tie") balance += bet * 8;
        else balance -= bet;
    }

    updateBalance();
    displayResult(playerCards, bankerCards, result);
    addHistory(playerCards, bankerCards, result);
});

// 筹码选择逻辑
document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
        document.querySelectorAll(".chip").forEach(c => c.classList.remove("selected"));
        chip.classList.add("selected");
    });
});
