let balance = 100;

function placeBet(choice) {
    const betAmount = parseInt(document.getElementById('betAmount').value);
    if (balance < betAmount) {
        alert("Insufficient balance!");
        return;
    }

    balance -= betAmount;
    document.getElementById('balance').innerText = balance;

    const playerCard = drawCard();
    const bankerCard = drawCard();
    const winner = playerCard > bankerCard ? 'player' : 'banker';

    showCard('playerCard', playerCard);
    showCard('bankerCard', bankerCard);

    setTimeout(() => {
        let message = winner === choice ? "You win!" : "You lose!";
        if (winner === choice) balance += betAmount * 2;
        document.getElementById('resultsDisplay').innerHTML = `You bet on ${choice}. ${message} Player: ${playerCard}, Banker: ${bankerCard}.`;

        const table = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
        const row = table.insertRow();
        row.insertCell(0).innerText = table.rows.length + 1;
        row.insertCell(1).innerText = playerCard;
        row.insertCell(2).innerText = bankerCard;
        row.insertCell(3).innerText = winner;
    }, 700);
}

function drawCard() {
    return Math.floor(Math.random() * 13) + 1;  // Cards from 1 to 13 (Ace to King)
}

function showCard(elementId, cardNumber) {
    const card = document.getElementById(elementId);
    card.style.transform = 'rotateY(0deg)'; // Flip to show the front
    setTimeout(() => {
        card.style.backgroundImage = `url('${cardNumber}.jpg')`; // Assuming you have 1.jpg to 13.jpg for cards
        card.style.transform = 'rotateY(180deg)'; // Flip back to show the back again
    }, 600);
}
