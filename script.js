// 初始状态
let virtualCoins = 1000;
let score = 0;

// 更新界面
function updateStatus() {
    document.getElementById("virtual-coins").innerText = virtualCoins;
    document.getElementById("score").innerText = score;

    // 检查虚拟货币是否为0
    if (virtualCoins <= 0) {
        virtualCoins = 0; // 防止负数
        alert("游戏结束！您的虚拟货币已耗尽，请通过兑换积分重新获得虚拟货币！");
        disableBetButtons();
    }
}

// 禁用所有投注按钮
function disableBetButtons() {
    document.getElementById("player-bet").disabled = true;
    document.getElementById("banker-bet").disabled = true;
    document.getElementById("tie-bet").disabled = true;
}

// 启用所有投注按钮
function enableBetButtons() {
    document.getElementById("player-bet").disabled = false;
    document.getElementById("banker-bet").disabled = false;
    document.getElementById("tie-bet").disabled = false;
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
    if (virtualCoins <= 0) {
        alert("游戏结束！您没有足够的虚拟货币进行投注！");
        return;
    }

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
    }

    document.getElementById("result-message").innerText = resultMessage;
    updateStatus();
}

// 兑换奖励
document.getElementById("redeem-rewards").addEventListener("click", () => {
    if (score >= 50) {
        score -= 50;
        virtualCoins += 500;
        alert("兑换成功！你获得了 500 虚拟货币！");
        enableBetButtons();
        updateStatus();
    } else {
        alert("积分不足，无法兑换！");
    }
});

// 按钮事件
document.getElementById("player-bet").addEventListener("click", () => playGame("player"));
document.getElementById("banker-bet").addEventListener("click", () => playGame("banker"));
document.getElementById("tie-bet").addEventListener("click", () => playGame("tie"));

// 初始化状态
updateStatus();
