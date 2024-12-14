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

    const playerCard = Math.floor(Math.random() * 10) + 1;
    const bankerCard = Math.floor(Math.random() * 10) + 1;

    const playerCardsDiv = document.getElementById("player-cards");
    const bankerCardsDiv = document.getElementById("banker-cards");

    playerCardsDiv.innerHTML = `<div>${playerCard}</div>`;
    bankerCardsDiv.innerHTML = `<div>${bankerCard}</div>`;

    if ((playerCard > bankerCard && target === "Player") ||
        (playerCard < bankerCard && target === "Banker") ||
        (playerCard === bankerCard && target === "Tie")) {
        balance += betAmount;
        points += 50;
        records.push(target.charAt(0));
        alert("You won!");
    } else {
        balance -= betAmount;
        alert("You lost!");
    }

    updateStatus();
    updateRecords();
}

function updateStatus() {
    document.getElementById("balance").innerText = balance;
    document.getElementById("points").innerText = points;
}

function updateRecords() {
    const recordsDiv = document.getElementById("records");
    recordsDiv.innerHTML = records
        .slice(-16)
        .map((record) => `<div>${record}</div>`)
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
