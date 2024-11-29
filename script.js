document.addEventListener("DOMContentLoaded", function () {
    const virtualCurrencyElement = document.getElementById("virtual-currency");
    const pointsElement = document.getElementById("points");
    const cardDisplayElement = document.getElementById("card-display");
    const historyRecordElement = document.getElementById("history-record");

    let virtualCurrency = 1000;
    let points = 0;
    const history = [];

    function updateUI() {
        virtualCurrencyElement.textContent = virtualCurrency;
        pointsElement.textContent = points;
        renderHistory();
    }

    function renderHistory() {
        historyRecordElement.innerHTML = "";
        history.forEach((item, index) => {
            const cell = document.createElement("div");
            cell.classList.add(item);
            historyRecordElement.appendChild(cell);
        });
    }

    function addHistory(result) {
        history.push(result);
        if (history.length > 96) {
            history.shift(); // Limit the history to fit the table
        }
    }

    document.getElementById("redeem-reward").addEventListener("click", function () {
        const rewardOption = document.getElementById("reward-options").value;
        if (rewardOption === "200" && points >= 100) {
            virtualCurrency += 200;
            points -= 100;
        } else if (rewardOption === "500" && points >= 500) {
            alert("兑换成功！获得特殊卡牌！");
            points -= 500;
        } else {
            alert("积分不足！");
        }
        updateUI();
    });

    function playGame(betType) {
        if (virtualCurrency <= 0) {
            alert("游戏结束，虚拟货币不足！");
            return;
        }

        const betAmount = parseInt(document.getElementById("bet-amount").value);
        if (virtualCurrency < betAmount) {
            alert("虚拟货币不足，无法下注！");
            return;
        }

        virtualCurrency -= betAmount;

        const outcomes = ["player", "banker", "tie"];
        const result = outcomes[Math.floor(Math.random() * outcomes.length)];

        let playerCards = `玩家卡牌: ${Math.ceil(Math.random() * 9)}♠, ${Math.ceil(Math.random() * 9)}♥`;
        let bankerCards = `庄家卡牌: ${Math.ceil(Math.random() * 9)}♣, ${Math.ceil(Math.random() * 9)}♦`;

        cardDisplayElement.innerHTML = `<p>${playerCards}</p><p>${bankerCards}</p>`;

        if (
            (betType === "player" && result === "player") ||
            (betType === "banker" && result === "banker") ||
            (betType === "tie" && result === "tie")
        ) {
            virtualCurrency += betAmount * 2;
            points += betAmount / 10;
            alert("恭喜，你赢了！");
        } else {
            alert("很遗憾，你输了！");
        }

        addHistory(result === "player" ? "blue" : result === "banker" ? "red" : "green");
        updateUI();
    }

    document.getElementById("player-win").addEventListener("click", function () {
        playGame("player");
    });

    document.getElementById("banker-win").addEventListener("click", function () {
        playGame("banker");
    });

    document.getElementById("tie-game").addEventListener("click", function () {
        playGame("tie");
    });

    updateUI();
});
