
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
        alert('Balance is too low! Please redeem rewards.');
        return;
    }

    if (!currentBet || !currentTarget) {
        alert('Please select both a bet amount and a target!');
        return;
    }

    const playerScore = Math.floor(Math.random() * 10);
    const bankerScore = Math.floor(Math.random() * 10);
    const result = playerScore > bankerScore ? 'Player' : playerScore < bankerScore ? 'Banker' : 'Tie';

    if (currentTarget === result) {
        balance += currentBet;
    } else {
        balance -= currentBet;
    }

    points += currentBet / 2;
    document.getElementById('balance').textContent = balance;
    document.getElementById('points').textContent = points;
    addRecord(result);
}

function addRecord(result) {
    const recordGrid = document.getElementById('record-grid');
    const record = document.createElement('div');
    record.className = 'record ' + result.toLowerCase();
    record.textContent = result[0];
    recordGrid.appendChild(record);
    if (recordGrid.children.length > 16) {
        recordGrid.removeChild(recordGrid.children[0]);
    }
}

function showRedeemOptions() {
    const points = parseInt(document.getElementById('points').textContent, 10);
    if (points < 200) {
        alert('Not enough points to redeem rewards!');
        return;
    }
    let rewardMessage = '';
    if (points >= 3000) {
        rewardMessage = 'Congratulations! You have redeemed Free 8.88.';
    } else if (points >= 1000) {
        rewardMessage = 'Congratulations! You have redeemed Welcome Bonus 60%.';
    } else if (points >= 200) {
        rewardMessage = 'Congratulations! You have redeemed +200 Balance.';
        balance += 200;
        document.getElementById('balance').textContent = balance;
    }
    alert(rewardMessage);
}
