let balance = 1000;
let points = 0;
let betAmount = null;
let betTarget = null;

function selectBet(amount) {
    betAmount = amount;
    document.getElementById("bet-amount").textContent = amount;
}

function selectTarget(target) {
    betTarget = target;
    document.getElementById("bet-target").textContent = target;
}

function startGame() {
    if (!betAmount || !betTarget) {
        alert("Please select both bet amount and target!");
        return;
    }

    const playerCard = Math.floor(Math.random() * 10) + 1;
    const bankerCard = Math.floor(Math.random() * 10) + 1;

    document.getElementById("player-cards").innerHTML = `<div>${playerCard}</div>`;
    document.getElementById("banker-cards").innerHTML = `<div>${bankerCard}</div>`;

    let result = "";
    if (playerCard > bankerCard) result = "Player";
    else if (bankerCard > playerCard) result = "Banker";
    else result = "Tie";

    if (result === betTarget) {
        balance += betAmount;
        points += betAmount / 2;
        alert(`You won! Target: ${betTarget}`);
    } else {
        balance -= betAmount;
        alert(`You lost! Target: ${betTarget}`);
    }

    document.getElementById("balance").textContent = balance;
    document.getElementById("points").textContent = points;

    const gameRecords = document.getElementById("game-records");
    const record = document.createElement("div");
    record.textContent = result.charAt(0);
    gameRecords.appendChild(record);

    if (gameRecords.children.length > 16) {
        gameRecords.removeChild(gameRecords.firstChild);
    }
}

function openRewardPopup() {
    let choice = prompt("Choose a reward:\n1. 200 Points: +200 Credit\n2. 1000 Points: Welcome Bonus 60%\n3. 3000 Points: Free 8.88");
    if (!choice) return;

    choice = parseInt(choice);
    if (choice === 1 && points >= 200) {
        points -= 200;
        balance += 200;
        alert("You redeemed +200 Credit!");
    } else if (choice === 2 && points >= 1000) {
        points -= 1000;
        alert("You redeemed Welcome Bonus！");
    } else if (choice === 3 && points >= 3000) {
        points -= 3000;
        alert("You redeemed Free 8.88!");
    } else {
        alert("Not enough points for this reward.");
    }

    document.getElementById("balance").textContent = balance;
    document.getElementById("points").textContent = points;
}
