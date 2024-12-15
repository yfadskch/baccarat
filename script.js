let currentBalance = 1000;
let currentPoints = 0;
let currentBet = 0;
let currentTarget = '';

function updateDisplay() {
  document.getElementById('current-balance').textContent = `Current Balance: ${currentBalance}`;
  document.getElementById('current-points').textContent = `Current Points: ${currentPoints}`;
  document.getElementById('current-bet-amount').textContent = currentBet > 0 ? `Current Bet Amount: ${currentBet}` : 'Current Bet Amount: Not Selected';
  document.getElementById('current-target').textContent = currentTarget || 'Current Target: Not Selected';
}

function setBet(amount) {
  currentBet = amount;
  updateDisplay();
}

function setTarget(target) {
  currentTarget = target;
  updateDisplay();
}

function startGame() {
  if (currentBet <= 0 || !currentTarget) {
    alert('Please select a bet amount and target.');
    return;
  }

  const playerCards = [Math.floor(Math.random() * 9) + 1, Math.floor(Math.random() * 9) + 1];
  const bankerCards = [Math.floor(Math.random() * 9) + 1, Math.floor(Math.random() * 9) + 1];

  const playerTotal = playerCards.reduce((a, b) => a + b, 0) % 10;
  const bankerTotal = bankerCards.reduce((a, b) => a + b, 0) % 10;

  renderCards('player-cards-display', playerCards);
  renderCards('banker-cards-display', bankerCards);

  let result = '';
  if (playerTotal > bankerTotal) result = 'Player';
  else if (playerTotal < bankerTotal) result = 'Banker';
  else result = 'Tie';

  addGameRecord(result);

  if (currentTarget === result) {
    currentBalance += currentBet * 2;
    currentPoints += currentBet;
    alert(`You win! ${result} wins.`);
  } else {
    currentBalance -= currentBet;
    alert(`You lose! ${result} wins.`);
  }

  updateDisplay();
}

function renderCards(elementId, cards) {
  const container = document.getElementById(elementId);
  container.innerHTML = '';
  cards.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.textContent = card;
    cardDiv.classList.add('card');
    container.appendChild(cardDiv);
  });
}

function addGameRecord(result) {
  const recordDiv = document.createElement('div');
  recordDiv.classList.add('record', result.toLowerCase());
  recordDiv.textContent = result === 'Player' ? '闲' : result === 'Banker' ? '庄' : '和';

  const recordsContainer = document.getElementById('game-records');
  if (recordsContainer.children.length >= 16) {
    recordsContainer.removeChild(recordsContainer.firstChild);
  }
  recordsContainer.appendChild(recordDiv);
}

function openRewardPopup() {
  let reward = prompt("Choose a reward:\n1. 200 Points: +200 Credit\n2. 1000 Points: Welcome Bonus\n3. 3000 Points: Free 8.88");
  if (reward === "1" && currentPoints >= 200) {
    currentBalance += 200;
    currentPoints -= 200;
    alert("You redeemed 200 Points for +200 Credit!");
  } else if (reward === "2" && currentPoints >= 1000) {
    alert("You redeemed 1000 Points for Welcome Bonus!");
  } else if (reward === "3" && currentPoints >= 3000) {
    alert("You redeemed 3000 Points for Free 8.88!");
  } else {
    alert("Not enough points to redeem this reward!");
  }
  updateDisplay();
}

updateDisplay();
