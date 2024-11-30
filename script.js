let balance = 100;

function placeBet(side) {
    const betAmount = parseInt(document.getElementById('betAmount').value);
    if (balance < betAmount) {
        alert('Insufficient balance!');
        return;
    }
    balance -= betAmount;
    document.getElementById('balance').textContent = balance;

    const playerCards = drawCards();
    const bankerCards = drawCards();
    const winner = determineWinner(playerCards, bankerCards);

    document.getElementById('gameResult').textContent = `Player: ${playerCards.join(', ')} Banker: ${bankerCards.join(', ')} - ${side === winner ? 'You win!' : 'You lose!'}`;
    balance += (side === winner) ? betAmount * 2 : 0;
    document.getElementById('balance').textContent = balance;

    const table = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.insertCell(0).textContent = table.rows.length + 1;
    row.insertCell(1).textContent = playerCards.join(', ');
    row.insertCell(2).textContent = bankerCards.join(', ');
    row.insertCell(3).textContent = winner;
}

function drawCards() {
    // Simulate drawing cards for Baccarat
    return [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
}

function determineWinner(playerCards, bankerCards) {
    const playerScore = playerCards.reduce((a, b) => a + b) % 10;
    const bankerScore = bankerCards.reduce((a, b) => a + b) % 10;
    return playerScore > bankerScore ? 'player' : 'banker';
}
