let balance = 1000;
let points = 0;
let currentBet = null;
let currentTarget = null;

function selectBet(amount) {
    currentBet = amount;
    document.getElementById('current-bet').textContent = amount;
}

function selectTarget(target) {
    currentTarget = target;
    document.getElementById('current-target').textContent = target;
}

function startGame() {
    if (!currentBet || !currentTarget) {
        alert("Please select both a bet amount and a target!");
        return;
    }

    const playerScore = Math.floor(Math.random() * 10);
    const bankerScore = Math.floor(Math.random() * 10);

    document.getElementById('player-cards').innerHTML = `<div class="card">${playerScore}</div>`;
    document.getElementById('banker-cards').innerHTML = `<div class="card">${bankerScore}</div>`;

    let result = playerScore > bankerScore ? "Player" : playerScore < bankerScore ? "Banker" : "Tie";

    if (currentTarget === result) {
        balance += currentBet;
    } else {
        balance -= currentBet;
    }

    points += currentBet / 2;

    document.getElementById('balance').textContent = balance;
    document.getElementById('points').textContent = points;

    alert(`Result: ${result}!`);
}

function redeemReward(pointsRequired) {
    if (points < pointsRequired) {
        showPopup("Not enough points to redeem rewards!");
        return;
    }

    points -= pointsRequired;

    if (pointsRequired === 200) {
        balance += 200;
        showPopup("Congratulations! You have redeemed +200 Balance!");
    } else if (pointsRequired === 1000) {
        showPopup("Congratulations! You have redeemed Welcome Bonus 60%!");
    } else if (pointsRequired === 3000) {
        showPopup("Congratulations! You have redeemed Free 8.88!");
    }

    document.getElementById('balance').textContent = balance;
    document.getElementById('points').textContent = points;
}

function showPopup(message) {
    const popup = document.getElementById('message-popup');
    const popupMessage = document.getElementById('popup-message');
    popupMessage.textContent = message;
    popup.style.display = "flex";
}

function closePopup() {
    document.getElementById('message-popup').style.display = "none";
}
