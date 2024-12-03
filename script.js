let currentBalance = 1000;
let currentBet = 0;
let currentTarget = null;

function selectBet(bet) {
    currentBet = bet;
    alert(`下注金额已选择：${bet}`);
}

function selectTarget(target) {
    currentTarget = target;
    alert(`投注对象已选择：${target === 'player' ? '玩家' : target === 'banker' ? '庄家' : '和局'}`);
}

function startGame() {
    if (currentBet === 0 || !currentTarget) {
        alert("请选择下注金额和投注对象！");
        return;
    }

    const playerCards = [drawCard(), drawCard()];
    const bankerCards = [drawCard(), drawCard()];
    const playerScore = calculateScore(playerCards);
    const bankerScore = calculateScore(bankerCards);

    document.getElementById("player-cards").innerHTML = playerCards.map(card => `<img src="static/card-front.jpg" class="card" alt="Player Card">`).join("");
    document.getElementById("banker-cards").innerHTML = bankerCards.map(card => `<img src="static/card-front.jpg" class="card" alt="Banker Card">`).join("");

    let result;
    if (playerScore > bankerScore) {
        result = 'player';
    } else if (playerScore < bankerScore) {
        result = 'banker';
    } else {
        result = 'tie';
    }

    const resultMessage = result === currentTarget ? `你赢了！获得 ${currentBet}` : `你输了！失去 ${currentBet}`;
    currentBalance += result === currentTarget ? currentBet : -currentBet;
    updateDisplay(playerCards, bankerCards, playerScore, bankerScore, resultMessage);
}

function drawCard() {
    return Math.floor(Math.random() * 9) + 1;
}

function calculateScore(cards) {
    return cards.reduce((sum, card) => (sum + card) % 10, 0);
}

function updateDisplay(playerCards, bankerCards, playerScore, bankerScore, resultMessage) {
    document.getElementById("current-balance").textContent = currentBalance;
    document.getElementById("card-display").textContent = `玩家卡牌: ${playerCards.join(",")} (点数: ${playerScore}) 庄家卡牌: ${bankerCards.join(",")} (点数: ${bankerScore})`;
    document.getElementById("game-result").textContent = resultMessage;

    const history = document.getElementById("game-history");
    const record = document.createElement("li");
    record.textContent = `玩家卡牌: ${playerCards.join(",")} (点数: ${playerScore}) 庄家卡牌: ${bankerCards.join(",")} (点数: ${bankerScore})，结果: ${resultMessage}`;
    history.appendChild(record);
}
