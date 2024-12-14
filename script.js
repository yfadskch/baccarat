let balance = 1000;
let points = 0;
let betAmount = null;
let target = null;
let records = [];

function selectBet(amount) {
    betAmount = amount;
    document.getElementById("bet-amount").innerText = betAmount;
}

function selectTarget(selectedTarget) {
    target = selectedTarget;
    document.getElementById("target").innerText = target;
}

function startGame() {
    if (!betAmount || !target) {
        alert("Please select a bet amount and target!");
        return;
    }

    // 发牌逻辑：生成玩家和庄家两张牌
    const playerCards = [drawCard(), drawCard()];
    const bankerCards = [drawCard(), drawCard()];

    // 计算点数
    const playerScore = calculateScore(playerCards);
    const bankerScore = calculateScore(bankerCards);

    // 显示牌面
    displayCards("player-cards", playerCards);
    displayCards("banker-cards", bankerCards);

    // 判断胜负
    let result = "";
    if (playerScore > bankerScore) {
        result = "Player";
    } else if (bankerScore > playerScore) {
        result = "Banker";
    } else {
        result = "Tie";
    }

    // 判断下注是否正确
    if (result === target) {
        if (result === "Player") {
            balance += betAmount; // 玩家赢，1:1赔率
        } else if (result === "Banker") {
            balance += Math.floor(betAmount * 0.95); // 庄家赢，0.95:1赔率
        } else if (result === "Tie") {
            balance += betAmount * 8; // 平局，8:1赔率
        }
        points += 50; // 每次赢增加50积分
        alert(`You won! ${result} wins.`);
    } else {
        balance -= betAmount;
        alert(`You lost! ${result} wins.`);
    }

    // 更新状态和记录
    records.push(result.charAt(0));
    updateStatus();
    updateRecords();
}

function drawCard() {
    // 随机生成1到13，分别对应A到K
    return Math.floor(Math.random() * 13) + 1;
}

function calculateScore(cards) {
    // A=1, 2-9按牌面，10及以上为0
    const points = cards.map(card => (card > 10 ? 0 : card));
    const total = points.reduce((sum, point) => sum + point, 0);
    return total % 10; // 超过10点取个位数
}

function displayCards(elementId, cards) {
    const container = document.getElementById(elementId);
    container.innerHTML = cards.map(card => `<div class="card">${card}</div>`).join("");
}

function updateStatus() {
    document.getElementById("balance").innerText = balance;
    document.getElementById("points").innerText = points;
}

function updateRecords() {
    const recordsDiv = document.getElementById("records");
    recordsDiv.innerHTML = records
        .slice(-16)
        .map(record => `<div>${record}</div>`)
        .join("");
}

function openRewardPopup() {
    const reward = prompt(
        "Choose a reward:\n1. 200 Points: +200 Credit\n2. 1000 Points: Welcome Bonus\n3. 3000 Points: Free 8.88"
    );

    if (reward === "1" && points >= 200) {
        balance += 200;
        points -= 200;
        alert("You redeemed 200 Points for +200 Credit!");
    } else if (reward === "2" && points >= 1000) {
        points -= 1000;
        alert("You redeemed 1000 Points for Welcome Bonus!");
    } else if (reward === "3" && points >= 3000) {
        points -= 3000;
        alert("You redeemed 3000 Points for Free 8.88!");
    } else {
        alert("Not enough points to redeem this reward.");
    }

    updateStatus();
}
