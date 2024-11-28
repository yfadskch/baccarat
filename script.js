document.addEventListener('DOMContentLoaded', () => {
    // 初始虚拟货币和积分
    let virtualCurrency = 1000;
    let playerPoints = 0;

    // 更新 UI
    function updateGameInfo() {
        document.getElementById('virtual-currency').textContent = virtualCurrency;
        document.getElementById('player-points').textContent = playerPoints;
    }

    // 游戏逻辑，玩家投注并获胜时增加积分和虚拟货币
    function playGame(betType) {
        const outcomes = ['player', 'banker', 'tie'];
        const randomIndex = Math.floor(Math.random() * outcomes.length);
        const result = outcomes[randomIndex];

        const betAmount = 100; // 固定投注金额
        let message = '';

        if (result === betType) {
            virtualCurrency += betAmount;
            playerPoints += 10; // 每次获胜增加 10 积分
            message = `恭喜！你赢了，增加 ${betAmount} 虚拟货币和 10 积分！`;
        } else {
            virtualCurrency -= betAmount;
            message = `很遗憾，你输了，减少 ${betAmount} 虚拟货币。`;
        }

        document.getElementById('result-message').textContent = message;
        updateGameInfo();
    }

    // 兑换奖励逻辑
    function redeemExtraBet() {
        if (playerPoints >= 100) {
            playerPoints -= 100;
            alert('兑换成功！你获得了额外投注机会！');
        } else {
            alert('积分不足，无法兑换额外投注机会。');
        }
        updateGameInfo();
    }

    function redeemSpecialCard() {
        if (playerPoints >= 200) {
            playerPoints -= 200;
            alert('兑换成功！你获得了一张特殊卡牌！');
        } else {
            alert('积分不足，无法兑换特殊卡牌。');
        }
        updateGameInfo();
    }

    // 绑定兑换按钮事件
    const redeemPointsButton = document.getElementById('redeem-points');
    const closeModalButton = document.getElementById('close-modal');
    const redeemExtraBetButton = document.getElementById('redeem-extra-bet');
    const redeemSpecialCardButton = document.getElementById('redeem-special-card');

    if (redeemPointsButton) {
        redeemPointsButton.addEventListener('click', () => {
            document.getElementById('reward-modal').style.display = 'block';
        });
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            document.getElementById('reward-modal').style.display = 'none';
        });
    }

    if (redeemExtraBetButton) {
        redeemExtraBetButton.addEventListener('click', redeemExtraBet);
    }

    if (redeemSpecialCardButton) {
        redeemSpecialCardButton.addEventListener('click', redeemSpecialCard);
    }

    // 初始化游戏信息
    updateGameInfo();
});
