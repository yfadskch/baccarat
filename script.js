document.addEventListener('DOMContentLoaded', () => {
    let virtualCurrency = 1000; // 初始虚拟货币
    let playerPoints = 0; // 初始积分

    // 更新虚拟货币和积分的显示
    function updateGameInfo() {
        document.getElementById('virtual-currency').textContent = Math.max(virtualCurrency, 0); // 确保虚拟货币不为负数
        document.getElementById('player-points').textContent = Math.max(playerPoints, 0); // 确保积分不为负数
    }

    // 生成随机卡牌
    function drawCard() {
        const suits = ['♥', '♦', '♣', '♠'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const suit = suits[Math.floor(Math.random() * suits.length)];
        const value = values[Math.floor(Math.random() * values.length)];
        return `${value}${suit}`;
    }

    // 更新卡牌显示
    function updateCards(playerCards, bankerCards) {
        document.getElementById('player-cards').textContent = `玩家卡牌: ${playerCards.join(', ')}`;
        document.getElementById('banker-cards').textContent = `庄家卡牌: ${bankerCards.join(', ')}`;
    }

    // 游戏逻辑函数
    function playGame(betType) {
        const outcomes = ['player', 'banker', 'tie']; // 可能的结果
        const result = outcomes[Math.floor(Math.random() * outcomes.length)]; // 随机选择一个结果

        const betAmount = 100; // 每次投注金额
        let message = '';

        // 抽取卡牌
        const playerCards = [drawCard(), drawCard()];
        const bankerCards = [drawCard(), drawCard()];
        updateCards(playerCards, bankerCards);

        if (result === betType) {
            virtualCurrency += betAmount; // 赢了加钱
            playerPoints += 10; // 赢了加积分
            message = `恭喜！你赢了，增加 ${betAmount} 虚拟货币和 10 积分！`;
        } else {
            virtualCurrency -= betAmount; // 输了扣钱
            message = `很遗憾，你输了，减少 ${betAmount} 虚拟货币。`;
        }

        // 显示结果
        document.getElementById('result-message').textContent = `${message} 结果是${result === 'player' ? '玩家赢' : result === 'banker' ? '庄家赢' : '平局'}！`;

        updateGameInfo(); // 更新信息
    }

    // 绑定按钮点击事件
    document.getElementById('player-button').addEventListener('click', () => playGame('player'));
    document.getElementById('banker-button').addEventListener('click', () => playGame('banker'));
    document.getElementById('tie-button').addEventListener('click', () => playGame('tie'));

    // 兑换积分按钮功能
    document.getElementById('redeem-points').addEventListener('click', () => {
        if (playerPoints >= 100) {
            playerPoints -= 100; // 扣除积分
            virtualCurrency += 500; // 增加虚拟货币
            alert('兑换成功！消耗 100 积分，获得 500 虚拟货币。');
        } else {
            alert('积分不足，无法兑换奖励！');
        }
        updateGameInfo();
    });

    updateGameInfo(); // 初始化页面
});
