let balance = 1000;
let points = 0;
let betAmount = 0;
let target = "";

function setBet(amount) {
    betAmount = amount;
    document.getElementById("bet-amount").textContent = amount;
}

function setTarget(selectedTarget) {
    target = selectedTarget;
    document.getElementById("target").textContent = selectedTarget;
}

function startGame() {
    if (balance <= 0) {
        alert("Not enough balance! Please redeem rewards.");
        return;
    }
    if (!betAmount || !target) {
        alert("Please select a bet amount and target!");
        return;
    }

    const playerScore = Math.floor(Math.random() * 10);
    const bankerScore = Math.floor(Math.random() * 10);

    document.getElementById("player-card-1").textContent = playerScore;
    document.getElementById("banker-card-1").textContent = bankerScore;

    let result = "";
    if (playerScore > bankerScore) {
        result = "player";
        balance += betAmount;
        points += 50; // Points for winning
    } else if (playerScore < bankerScore) {
        result = "banker";
        balance -= betAmount;
    } else {
        result = "tie";
        points += 20; // Points for tie
    }

    updateStatus();
    updateRecords(result);
}

function updateStatus() {
    document.getElementById("balance").textContent = balance;
    document.getElementById("points").textContent = points;
}

function updateRecords(result) {
    const records = document.getElementById("game-records");
    const record = document.createElement("div");
    record.className = `record ${result}`;
    record.textContent = result === "player" ? "P" : result === "banker" ? "B" : "T";
    records.appendChild(record);

    // Limit to 16 records
    if (records.children.length > 16) {
        records.removeChild(records.firstChild);
    }
}

function redeemReward() {
    if (points < 200) {
        alert("Not enough points to redeem rewards!");
        return;
    }

    const choice = prompt("Choose a reward:\n1. 200 Points: +200 Credit\n2. 1000 Points: Welcome Bonus\n3. 3000 Points: Free 8.88");

    switch (choice) {
        case "1":
            if (points >= 200) {
                points -= 200;
                balance += 200;
                alert("You redeemed 200 Points for +200 Credit!");
            } else {
                alert("Not enough points!");
            }
            break;
        case "2":
            if (points >= 1000) {
                points -= 1000;
                alert("You redeemed 1000 Points for Welcome Bonus!");
            } else {
                alert("Not enough points!");
            }
            break;
        case "3":
            if (points >= 3000) {
                points -= 3000;
                alert("You redeemed 3000 Points for Free 8.88!");
            } else {
                alert("Not enough points!");
            }
            break;
        default:
            alert("Invalid choice!");
    }

    updateStatus();
}
