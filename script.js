let round = 1;

function addResult(result) {
    let table = document.getElementById('resultsTable');
    if (round > 8) { // Resets the table if more than 8 rounds
        resetTable();
        round = 1;
    }
    let row = table.insertRow(round);
    row.insertCell(0).innerText = 'Round ' + round;
    for (let i = 1; i <= 12; i++) {
        let cell = row.insertCell(i);
        cell.classList.add(result === 'W' ? 'win' : result === 'L' ? 'lose' : 'draw');
        cell.innerText = result;
    }
    round++;
}

function resetTable() {
    let table = document.getElementById('resultsTable');
    for (let i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
    round = 1;
}
