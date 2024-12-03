let balance = 1000;
let betAmount = 0;
let target = "";

function selectBet(amount) {
  betAmount = amount;
  document.querySelectorAll('.bet-section button').forEach(btn => btn.classList.remove('selected'));
  event.target.classList.add('selected');
}

function selectTarget(selectedTarget) {
  target = selectedTarget;
  document.querySelectorAll('.target-section button').forEach(btn => btn.classList.remove('selected'));
  event.target.classList.add('selected');
}

function generateCardElement(cardSrc, cardValue) {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

  const img = document.createElement("img");
  img.src = cardSrc;
  img.classList.add("card");

  const valueText = document.createElement("div");
  valueText.classList.add("card-value");
  valueText.innerText = `点数: ${cardValue}`;

  cardContainer.appendChild(img);
  cardContainer.appendChild(valueText);
  return cardContainer;
}

function displayCards(playerCards, bankerCards) {
  const playerCardsElement = document.getElementById("player-cards");
  const bankerCardsElement = document.getElementById("banker-cards");

  playerCardsElement.innerHTML = "";
  bankerCardsElement.innerHTML = "";

  playerCards.forEach(card => {
    const cardElement = generateCardElement(card.src, card.value);
    playerCardsElement.appendChild(cardElement);
  });

  bankerCards.forEach(card => {
    const cardElement = generateCardElement(card.src, card.value);
    bankerCardsElement.appendChild(cardElement);
  });
}

function startGame() {
  if (!betAmount || !target) {
    alert("请选择下注金额和投注对象！");
    return;
  }

  const playerCards = [
    { src: "./static/card-front.jpg", value: Math.floor(Math.random() * 10) + 1 },
    { src: "./static/card-front.jpg", value: Math.floor(Math.random() * 10) + 1 },
  ];
  const bankerCards = [
    { src: "./static/card-front.jpg", value: Math.floor(Math.random() * 10) + 1 },
    { src: "./static/card-front.jpg", value: Math.floor(Math.random() * 10) + 1 },
  ];

  displayCards(playerCards, bankerCards);

  const playerScore = (playerCards[0].value + playerCards[1].value) % 10;
  const bankerScore = (bankerCards[0].value + bankerCards[1].value) % 10;

  let result;
  if (playerScore > bankerScore) result = "player";
  else if (bankerScore > playerScore) result = "banker";
  else result = "tie";

  const resultMessage = target === result ? "您赢了！" : "您输了！";
  document.getElementById("game-result").innerText = resultMessage;

  if (target === result) {
    balance += betAmount;
  } else {
    balance -= betAmount;
  }

  document.getElementById("balance").innerText = balance;

  const record = `玩家卡牌: ${playerCards[0].value}, ${playerCards[1].value} (点数: ${playerScore}) | 庄家卡牌: ${bankerCards[0].value}, ${bankerCards[1].value} (点数: ${bankerScore}) | 结果: ${result === "player" ? "玩家胜利" : result === "banker" ? "庄家胜利" : "和局"}`;
  const recordElement = document.createElement("li");
  recordElement.innerText = record;
  document.getElementById("game-records").appendChild(recordElement);
}
