let currentBalance = 1000;
let currentPoints = 0;
let currentBetAmount = 0;
let currentTarget = null;

function setBet(amount) {
  currentBetAmount = amount;
  document.getElementById('current-bet-amount').innerText = `Current Bet Amount: ${amount}`;
}

function setTarget(target) {
  currentTarget = target;
  document.getElementById('current-target').innerText = `Current Target: ${target}`;
}

function startGame() {
  if (currentBetAmount === 0 || !currentTarget) {
    alert('Please select a bet amount and target!');
    return;
  }

  const playerCards = [Math.floor(Math.random() * 9) + 1, Math.floor(Math.random() * 9) + 1];
  const bankerCards = [Math.floor(Math.random() * 9) + 1, Math.floor(Math.random() * 9) + 1];

  const playerTotal = playerCards.reduce((a, b) => a + b, 0) % 10;
  const bankerTotal = bankerCards.reduce((a, b) => a + b, 0) % 10;

  document.getElementById('player-cards-display').innerText = playerCards.join(' ');
  document.getElementById('banker-cards-display').innerText = bankerCards.join(' ');

  let result;
  if (playerTotal > bankerTotal) {
    result = 'Player';
    currentBalance += currentBetAmount;
    currentPoints += Math.floor(currentBetAmount / 2);
  } else if (playerTotal < bankerTotal) {
    result = 'Banker';
    currentBalance -= currentBetAmount;
  } else {
    result = 'Tie';
    currentPoints += Math.floor(currentBetAmount / 4);
  }

  document.getElementById('current-balance').innerText = `Current Balance: ${currentBalance}`;
  document.getElementById('current-points').innerText = `Current Points: ${currentPoints}`;
  addGameRecord(result);

  if (currentBalance <= 0) {
    alert('Your balance is empty! Please redeem rewards or reset the game.');
  }
}

function addGameRecord(result) {
  const recordDiv = document.createElement('div');
  recordDiv.classList.add('record', result.toLowerCase());
  recordDiv.textContent = result.charAt(0); // "P", "B", or "T"
  const recordsContainer = document.getElementById('game-records');
  if (recordsContainer.children.length >= 16) {
    recordsContainer.removeChild(recordsContainer.firstChild);
  }
  recordsContainer.appendChild(recordDiv);
}

function openRewardPopup() {
  const reward = prompt(
    'Choose a reward:\n1. 200 Points: +200 Credit\n2. 1000 Points: Welcome Bonus\n3. 3000 Points: Free 8.88'
  );

  if (reward === '1' && currentPoints >= 200) {
    currentBalance += 200;
    currentPoints -= 200;
    alert('You redeemed 200 Points for +200 Credit!');
  } else if (reward === '2' && currentPoints >= 1000) {
    alert('You redeemed 1000 Points for Welcome Bonus!');
  } else if (reward === '3' && currentPoints >= 3000) {
    alert('You redeemed 3000 Points for Free 8.88!');
  } else {
    alert('Not enough points to redeem this reward!');
  }

  document.getElementById('current-balance').innerText = `Current Balance: ${currentBalance}`;
  document.getElementById('current-points').innerText = `Current Points: ${currentPoints}`;
}

function updateDisplay() {
  document.getElementById('current-balance').innerText = `Current Balance: ${currentBalance}`;
  document.getElementById('current-points').innerText = `Current Points: ${currentPoints}`;
  document.getElementById('current-bet-amount').innerText = 'Current Bet Amount: Not Selected';
  document.getElementById('current-target').innerText = 'Current Target: Not Selected';
}

// Initial render
updateDisplay();
