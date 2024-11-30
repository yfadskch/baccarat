let round = 1;

function placeBet(side) {
    let betAmount = document.getElementById('betAmount').value;
    let gameResult = Math.random() < 0.5 ? 'banker' : 'player';
    let resultText = side === gameResult ? 'You win!' : 'You lose!';
    document.getElementById('gameResult').innerText = `Result: ${resultText}, Winning Side: ${gameResult}`;

    let table = document.getElementById('resultsTable');
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.innerText = `Round ${round}`;
    cell2.innerText = resultText;
    cell3.innerText = gameResult;

    round++;
}

function resetTable() {
    let table = document.getElementById('resultsTable');
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    round = 1;
}
