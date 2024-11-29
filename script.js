// 初始状态
let virtualCoins = 1000;
let score = 0;

// 更新界面
function updateStatus() {
    document.getElementById("virtual-coins").innerText = virtualCoins;
    document.getElementById("score").innerText = score;
}

// 生成随机卡牌
function getRandomCard() {
    const suits = ["♠", "♥", "♣", "♦"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomValue = values[Math.floor(Math.random() * values.length)];
    return `${randomValue}${randomSuit}`;
}

// 计算卡牌分数
function calculatePoints(cards) {
    let total = 0;
    cards.forEach(card => {
        const value = card.slice(0, -1); // 去掉花色
        if (["J", "Q", "K"].includes(value)) {
            total += 10;
        } else if (value === "A") {
            total += 1;
        } else {
            total += parseInt(value);
        }
    });
    return total % 10; // 百家乐规则，只保留个位数
}

// 玩游戏逻辑
function playGame(betType) {
    const playerCards = [getRandomCard(), getRandomCard()];
    const bankerCards = [getRandomCard(), getRandomCard()];
    const playerPoints = calculatePoints(playerCards);
    const bankerPoints = calculatePoints(bankerCards);

    // 显示卡牌
    document.getElementById("player-cards").innerText = `玩家卡牌: ${playerCards.join(", ")}`;
    document.getElementById("banker-cards").innerText = `庄家卡牌: ${bankerCards.join(", ")}`;

    // 判断结果
    let resultMessage = "";
    if (
        (betType === "player" && playerPoints > bankerPoints) ||
        (betType === "banker" && bankerPoints > playerPoints) ||
        (betType === "tie" && playerPoints === bankerPoints)
    ) {
        resultMessage = `恭喜！你赢了，增加 100 虚拟货币和 10 积分！`;
        virtualCoins += 100;
        score += 10;
    } else {
        resultMessage = `很遗憾，你输了，减少 100 虚拟货币。`;
        virtualCoins -= 100;
        if (virtualCoins < 0) virtualCoins = 0; // 防止负数出现
    }

    document.getElementById("result-message").innerText = resultMessage;
    updateStatus();
}

// 按钮事件
document.getElementById("player-bet").addEventListener("click", () => playGame("player"));
document.getElementById("banker-bet").addEventListener("click", () => playGame("banker"));
document.getElementById("tie-bet").addEventListener("click", () => playGame("tie"));

document.getElementById("redeem-rewards").addEventListener("click", () => {
    if (score >= 50) {
        score -= 50;
        virtualCoins += 500;
        alert("兑换成功！你获得了 500 虚拟货币！");
        updateStatus();
    } else {
        alert("积分不足，无法兑换！");
    }
});

// 初始化状态
updateStatus();
