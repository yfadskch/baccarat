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
  } else if (playerTotal < bankerTotal) {
    result = 'Banker';
    currentBalance -= currentBetAmount;
  } else {
    result = 'Tie';
  }

  document.getElementById('current-balance').innerText = `Current Balance: ${currentBalance}`;
  addGameRecord(result);
}

function addGameRecord(result) {
  const recordDiv = document.createElement('div');
  recordDiv.classList.add('record', result.toLowerCase());
  recordDiv.textContent = result.charAt(0);
  const recordsContainer = document.getElementById('game-records');
  if (recordsContainer.children.length >= 16) {
    recordsContainer.removeChild(recordsContainer.firstChild);
  }
  recordsContainer.appendChild(recordDiv);
}

function openRewardPopup() {
  alert('Redeem Rewards feature coming soon!');
}
