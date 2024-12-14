let currentBalance = 1000;
let currentPoints = 0;
let currentBet = 0;
let currentTarget = "";

function selectBet(amount) {
    currentBet = amount;
    document.getElementById("current-bet").innerText = amount;
}

function selectTarget(target) {
    currentTarget = target;
    document.getElementById("current-target").innerText = target;
}

function startGame() {
    if (currentBet === 0 || !currentTarget) {
        alert("Please select a bet amount and target before starting the game.");
        return;
    }

    // Generate two random cards for Player and Banker
    let playerCard1 = Math.floor(Math.random() * 10) + 1;
    let playerCard2 = Math.floor(Math.random() * 10) + 1;
    let bankerCard1 = Math.floor(Math.random() * 10) + 1;
    let bankerCard2 = Math.floor(Math.random() * 10) + 1;

    let playerTotal = (playerCard1 + playerCard2) % 10;
    let bankerTotal = (bankerCard1 + bankerCard2) % 10;

    document.getElementById("player-cards").innerHTML = `
        <div class="card">${playerCard1}</div>
        <div class="card">${playerCard2}</div>
    `;
    document.getElementById("banker-cards").innerHTML = `
        <div class="card">${bankerCard1}</div>
        <div class="card">${bankerCard2}</div>
    `;
    document.getElementById("player-total").innerText = playerTotal;
    document.getElementById("banker-total").innerText = bankerTotal;

    let result;
    if (playerTotal > bankerTotal) {
        result = "Player";
        addRecord("player");
        currentBalance += currentBet;
        currentPoints += currentBet / 2;
    } else if (playerTotal < bankerTotal) {
        result = "Banker";
        addRecord("banker");
        currentBalance -= currentBet;
    } else {
        result = "Tie";
        addRecord("tie");
    }

    document.getElementById("current-balance").innerText = currentBalance;
    document.getElementById("current-points").innerText = currentPoints;
}

function addRecord(type) {
    const record = document.createElement("div");
    record.classList.add("record", type);
    record.innerText = type.charAt(0).toUpperCase();
    const records = document.querySelector(".game-records");
    if (records.children.length >= 16) {
        records.removeChild(records.firstChild);
    }
    records.appendChild(record);
}

function openRewardPopup() {
    let reward = prompt("Choose a reward:\n1. 200 Points: +200 Credit\n2. 1000 Points: Welcome Bonus\n3. 3000 Points: Free 8.88");
    if (reward === "1" && currentPoints >= 200) {
        currentBalance += 200;
        currentPoints -= 200;
        alert("You redeemed 200 Points for +200 Credit!");
    } else if (reward === "2" && currentPoints >= 1000) {
        alert("You redeemed 1000 Points for Welcome Bonus!");
    } else if (reward === "3" && currentPoints >= 3000) {
        alert("You redeemed 3000 Points for Free 8.88!");
    } else {
        alert("Not enough points to redeem this reward!");
    }

    document.getElementById("current-balance").innerText = currentBalance;
    document.getElementById("current-points").innerText = currentPoints;
}
