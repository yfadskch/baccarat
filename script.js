let balance = 1000;
let currentBet = 0;
let currentTarget = null;

function selectBet(amount) {
    currentBet = amount;
    document.getElementById("current-bet").textContent = amount;
}

function selectTarget(target) {
    currentTarget = target;
    document.getElementById("current-target").textContent = target;
}

function getRandomCard() {
    return Math.floor(Math.random() * 10) + 1;
}

function calculateScore(cards) {
    return cards.reduce((sum, card) => (sum + card) % 10, 0);
}

function startGame() {
    if (currentBet === 0 || currentTarget === null) {
        alert("Please select both bet amount and target!");
        return;
    }

    let playerCards = [getRandomCard(), getRandomCard()];
    let bankerCards = [getRandomCard(), getRandomCard()];
    let playerScore = calculateScore(playerCards);
    let bankerScore = calculateScore(bankerCards);

    document.getElementById("player-cards").innerHTML = playerCards
        .map(card => `<div>${card}</div>`)
        .join("");
    document.getElementById("banker-cards").innerHTML = bankerCards
        .map(card => `<div>${card}</div>`)
        .join("");

    let result = "";
    if (playerScore > bankerScore) result = "Player";
    else if (bankerScore > playerScore) result = "Banker";
    else result = "Tie";

    updateBalance(result);
    addRecord(result);
}

function updateBalance(result) {
    if (result === currentTarget) {
        balance += currentBet;
    } else {
        balance -= currentBet;
    }
    document.getElementById("current-balance").textContent = balance;
}

function addRecord(result) {
    const records = document.getElementById("game-records");
    const record = document.createElement("div");
    record.textContent = result[0];
    record.className = result.toLowerCase();
    records.appendChild(record);
}
