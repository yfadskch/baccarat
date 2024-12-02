// Cards and points logic
const suits = ["♠", "♥", "♣", "♦"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function drawCard() {
  const suit = suits[Math.floor(Math.random() * suits.length)];
  const rank = ranks[Math.floor(Math.random() * ranks.length)];
  let value = isNaN(rank) ? (rank === "A" ? 1 : 0) : parseInt(rank);
  return { suit, rank, value };
}

function calculateScore(hand) {
  let score = hand.reduce((acc, card) => acc + card.value, 0);
  return score % 10; // Baccarat score is modulo 10
}

function renderCard(card) {
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";
  cardDiv.textContent = `${card.rank}${card.suit}`;
  return cardDiv;
}

function dealCards() {
  const playerHand = [drawCard(), drawCard()];
  const bankerHand = [drawCard(), drawCard()];

  const playerScore = calculateScore(playerHand);
  const bankerScore = calculateScore(bankerHand);

  const result =
    playerScore > bankerScore
      ? "Player Wins!"
      : playerScore < bankerScore
      ? "Banker Wins!"
      : "It's a Tie!";

  document.getElementById("player-cards").innerHTML = "";
  playerHand.forEach((card) => {
    document.getElementById("player-cards").appendChild(renderCard(card));
  });

  document.getElementById("banker-cards").innerHTML = "";
  bankerHand.forEach((card) => {
    document.getElementById("banker-cards").appendChild(renderCard(card));
  });

  document.getElementById("result").textContent = result;
}

document.getElementById("deal-button").addEventListener("click", dealCards);
