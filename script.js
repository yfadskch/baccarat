
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
    if (balance <= 0) {
        alert("Insufficient balance! Redeem rewards to continue.");
        return;
    }

    const playerScore = Math.floor(Math.random() * 9) + 1;
    const bankerScore = Math.floor(Math.random() * 9) + 1;

    balance -= currentBet;
    points += currentBet / 2;

    document.getElementById('balance').textContent = balance;
    document.getElementById('points').textContent = points;

    const result = playerScore > bankerScore ? "Player" : (bankerScore > playerScore ? "Banker" : "Tie");
    alert("Result: " + result);
}

function redeemRewards() {
    const rewardOptions = document.getElementById('reward-options');
    rewardOptions.style.display = rewardOptions.style.display === 'none' ? 'block' : 'none';
}

function redeemPoints(requiredPoints) {
    if (points < requiredPoints) {
        alert("Not enough points to redeem rewards!");
        return;
    }

    if (requiredPoints === 200) {
        balance += 200;
        alert("Congratulations! You redeemed 200 Points for +200 Balance.");
    } else if (requiredPoints === 1000) {
        alert("Congratulations! You redeemed 1000 Points for Welcome Bonus 60%.");
    } else if (requiredPoints === 3000) {
        alert("Congratulations! You redeemed 3000 Points for Free 8.88.");
    }

    points -= requiredPoints;
    document.getElementById('balance').textContent = balance;
    document.getElementById('points').textContent = points;
}
