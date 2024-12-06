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

    if (balance <= 0) {
        alert("Balance is insufficient! Redeem rewards to continue playing.");
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
    points += (currentBet / 2);
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

function showRedeemOptions() {
    if (points < 200) {
        alert("Not enough points to redeem rewards!");
        return;
    }

    const redeemChoice = prompt(
        "Choose a reward:\n1. 200 Points: +200 Balance\n2. 1000 Points: Welcome Bonus 60%\n3. 3000 Points: Free 8.88",
        "Enter 1, 2, or 3"
    );

    switch (redeemChoice) {
        case "1":
            if (points >= 200) {
                points -= 200;
                balance += 200;
                alert("Congratulations! You redeemed 200 points for +200 Balance.");
            } else {
                alert("Not enough points!");
            }
            break;
        case "2":
            if (points >= 1000) {
                points -= 1000;
                alert("Congratulations! You redeemed 1000 points for Welcome Bonus 60%.");
            } else {
                alert("Not enough points!");
            }
            break;
        case "3":
            if (points >= 3000) {
                points -= 3000;
                alert("Congratulations! You redeemed 3000 points for Free 8.88.");
            } else {
                alert("Not enough points!");
            }
            break;
        default:
            alert("Invalid choice.");
    }

    document.getElementById('balance').textContent = balance;
    document.getElementById('points').textContent = points;
}
