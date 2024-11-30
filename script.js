let balance = 100;

function placeBet(choice) {
    const betAmount = parseInt(document.getElementById('betAmount').value);
    if (balance < betAmount) {
        alert("Insufficient balance!");
        return;
    }

    balance -= betAmount;
    document.getElementById('balance').innerText = balance;

    const playerScore = drawCard();
    const bankerScore = drawCard();
    const winner = playerScore > bankerScore ? 'player' : 'banker';

    updateResults(playerScore, bankerScore, winner, choice, betAmount);
}

function drawCard() {
    // Simplified card draw mechanism for example purposes
    return Math.floor(Math.random() * 9) + 1;  // Cards from 1 to 9
}

function updateResults(playerScore, bankerScore, winner, choice, betAmount) {
    let message = winner === choice ? "You win!" : "You lose!";
    if (winner === choice) balance += betAmount * 2;

    document.getElementById('resultsDisplay').innerHTML = `You bet on ${choice}. ${message} Player: ${playerScore}, Banker: ${bankerScore}.`;

    const table = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.insertCell(0).innerText = table.rows.length + 1;
    row.insertCell(1).innerText = playerScore;
    row.insertCell(2).innerText = bankerScore;
    row.insertCell(3).innerText = winner;
}

document.getElementById('balance').innerText = balance;
