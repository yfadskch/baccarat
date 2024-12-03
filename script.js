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

// 生成卡牌 DOM
function createCard(value) {
    const card = document.createElement("div");
    card.className = "card";
    const cardInner = document.createElement("div");
    cardInner.className = "card-inner";
    const cardFront = document.createElement("div");
    cardFront.className = "card-front";
    cardFront.textContent = value; // 显示卡牌点数
    const cardBack = document.createElement("div");
    cardBack.className = "card-back";
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    return card;
}

// 显示卡牌
function displayCards(cardGroupId, cards) {
    const cardGroup = document.getElementById(cardGroupId);
    cardGroup.innerHTML = ""; // 清空原有卡牌
    cards.forEach(cardValue => {
        const card = createCard(cardValue);
        cardGroup.appendChild(card);

        // 模拟翻牌效果
        setTimeout(() => card.classList.add("is-flipped"), 1000);
    });
}

// 计算点数
function calculateScore(cards) {
    return cards.reduce((sum, card) => sum + card, 0) % 10; // 取个位数
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
    displayCards("player-cards", playerCards);
    displayCards("banker-cards", bankerCards);
    document.getElementById("game-result").innerText = result;

    // 记录游戏
    history.push({ playerCards, bankerCards, result });
    const li = document.createElement("li");
    li.textContent = `玩家卡牌: ${playerCards}，庄家卡牌: ${bankerCards}，结果: ${result}`;
    document.getElementById("history-list").appendChild(li);
});

// 筹码选择逻辑
document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
        document.querySelectorAll(".chip").forEach(c => c.classList.remove("selected"));
        chip.classList.add("selected");
    });
});
