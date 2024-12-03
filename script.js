let balance = 1000;
let points = 0;
let currentBet = null;
let currentTarget = null;
let recordGrid = [];

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

    const playerCards = [getRandomCard(), getRandomCard()];
    const bankerCards = [getRandomCard(), getRandomCard()];

    updateCards('player-cards', playerCards);
    updateCards('banker-cards', bankerCards);

    const playerScore = calculateScore(playerCards);
    const bankerScore = calculateScore(bankerCards);

    let result = "";
    if (playerScore > bankerScore) {
        result = "Player";
    } else if (bankerScore > playerScore) {
        result = "Banker";
    } else {
        result = "Tie";
    }

    updateBalance(result);
    updatePoints();
    addRecord(result);
}

function getRandomCard() {
    return Math.floor(Math.random() * 9) + 1;
}

function calculateScore(cards) {
    return cards.reduce((sum, card) => sum + card, 0) % 10;
}

function updateCards(elementId, cards) {
    const cardContainer = document.getElementById(elementId);
    cardContainer.innerHTML = "";
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.textContent = card;
        cardContainer.appendChild(cardElement);
    });
}

function updateBalance(result) {
    if (result === currentTarget) {
        balance += currentBet;
    } else {
        balance -= currentBet;
    }
    document.getElementById('balance').textContent = balance;
}

function updatePoints() {
    points += currentBet / 2;
    document.getElementById('points').textContent = points;
}

function addRecord(result) {
    const recordGridElement = document.getElementById('record-grid');
    const recordElement = document.createElement('div');
    recordElement.className = 'record ' + (result === "Player" ? "player" : result === "Banker" ? "banker" : "tie");
    recordElement.textContent = result === "Player" ? "P" : result === "Banker" ? "B" : "T";
    recordGrid.push(recordElement);
    if (recordGrid.length > 16) {
        recordGrid.shift();
    }
    recordGridElement.innerHTML = "";
    recordGrid.forEach(record => recordGridElement.appendChild(record));
}

function redeemRewards() {
    if (points < 200) {
        alert("Not enough points to redeem rewards!");
        return;
    }

    const rewardOptions = `
        <div>
            <h3>Select Your Reward</h3>
            <button onclick="redeemOption(200, '+500 Current Balance')">200 Points: +500 Balance</button>
            <button onclick="redeemOption(1000, 'Welcome Bonus 60%')">1000 Points: Welcome Bonus 60%</button>
            <button onclick="redeemOption(2000, 'Free 8.88')">2000 Points: Free 8.88</button>
        </div>
    `;

    const popup = document.getElementById('success-popup');
    popup.innerHTML = rewardOptions;
    popup.style.display = 'block';

    setTimeout(() => {
        popup.style.display = 'none';
    }, 10000);
}

function redeemOption(requiredPoints, rewardDescription) {
    if (points >= requiredPoints) {
        points -= requiredPoints;
        document.getElementById('points').textContent = points;

        if (rewardDescription === '+500 Current Balance') {
            balance += 500;
            document.getElementById('balance').textContent = balance;
        }

        showPopup(`Congratulations! You redeemed ${rewardDescription}`);
    } else {
        showPopup("Not enough points to redeem this reward!");
    }

    document.getElementById('success-popup').style.display = 'none';
}

function freeCredit() {
    window.open("https://klking88.com", "_blank");
}

function showPopup(message) {
    const popup = document.getElementById('success-popup');
    popup.textContent = message;
    popup.classList.add('show');

    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);
}
