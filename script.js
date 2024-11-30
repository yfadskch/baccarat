let balance = 100; // Player's starting balance

function placeBet(choice) {
    const betAmount = parseInt(document.getElementById("bet-amount").value);

    // Check if the bet amount is valid
    if (isNaN(betAmount) || betAmount <= 0) {
        updateMessage("Please enter a valid bet amount.", "error");
        return;
    }

    if (betAmount > balance) {
        updateMessage("You don't have enough balance to place this bet.", "error");
        return;
    }

    // Randomly determine the winner: Banker or Player
    const outcomes = ["banker", "player"];
    const winner = outcomes[Math.floor(Math.random() * outcomes.length)];

    // Update balance based on the outcome
    if (choice === winner) {
        balance += betAmount;
        updateMessage(`You won! ${choice.charAt(0).toUpperCase() + choice.slice(1)} wins!`, "success");
    } else {
        balance -= betAmount;
        updateMessage(`You lost! ${winner.charAt(0).toUpperCase() + winner.slice(1)} wins.`, "error");
    }

    // Update the balance display
    document.getElementById("balance").innerText = `$${balance}`;

    // Check if the player is out of money
    if (balance <= 0) {
        updateMessage("You are out of balance! Game over.", "error");
        disableButtons();
    }
}

function updateMessage(message, type) {
    const resultMessage = document.getElementById("result-message");
    resultMessage.innerText = message;

    if (type === "success") {
        resultMessage.style.color = "#2ecc71";
    } else {
        resultMessage.style.color = "#e74c3c";
    }
}

function disableButtons() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.disabled = true);
}
