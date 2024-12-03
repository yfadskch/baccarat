const balanceElement = document.getElementById("balance");
const playerCardsElement = document.getElementById("player-cards");
const bankerCardsElement = document.getElementById("banker-cards");
const resultDisplay = document.getElementById("result-display");
const gameHistory = document.getElementById("game-history");

let balance = 1000;
let selectedBet = 100;
let betTarget = "玩家";

// 卡牌正反面
const cardBack = "./static/card-back.jpg";
const cardFronts = ["./static/card-front.jpg", "./static/card-front.jpg"];

// 更新余额
function updateBalance(amount) {
  balance += amount;
  balanceElement.textContent = balance;
}

// 生成卡牌
function generateCardElement(cardSrc) {
  const img = document.createElement("img");
  img.src = cardSrc;
  return img;
}

// 显示卡牌
function displayCards(playerCards, bankerCards) {
  playerCardsElement.innerHTML = "";
  bankerCardsElement.innerHTML = "";

  playerCards.forEach(card => {
    const cardElement = generateCardElement(card);
    playerCardsElement.appendChild(cardElement);
  });

  bankerCards.forEach(card => {
    const cardElement = generateCardElement(card);
    bankerCardsElement.appendChild(cardElement);
  });
}

// 游戏逻辑
function startGame() {
  const playerCards = [cardFronts[0], cardFronts[1]];
  const bankerCards = [cardFronts[0], cardFronts[1]];

  displayCards(playerCards, bankerCards);

  // 随机生成分数
  const playerScore = Math.floor(Math.random() * 10);
  const bankerScore = Math.floor(Math.random() * 10);

  // 计算结果
  let result;
  if (playerScore > bankerScore) {
    result = "玩家胜利!";
    if (betTarget === "玩家") updateBalance(selectedBet);
    else updateBalance(-selectedBet);
  } else if (playerScore < bankerScore) {
    result = "庄家胜利!";
    if (betTarget === "庄家") updateBalance(selectedBet);
    else updateBalance(-selectedBet);
  } else {
    result = "平局!";
    if (betTarget === "和局") updateBalance(selectedBet * 8);
    else updateBalance(-selectedBet);
  }

  resultDisplay.textContent = result;

  // 更新历史记录
  const historyItem = document.createElement("li");
  historyItem.textContent = `玩家卡牌: ${playerScore}, 庄家卡牌: ${bankerScore}, 结果: ${result}`;
  gameHistory.appendChild(historyItem);
}

// 按钮事件
document.querySelectorAll(".bet-button").forEach(button => {
  button.addEventListener("click", () => {
    selectedBet = parseInt(button.getAttribute("data-bet"));
  });
});

document.querySelectorAll(".bet-target").forEach(button => {
  button.addEventListener("click", () => {
    betTarget = button.textContent;
  });
});

document.getElementById("start-game").addEventListener("click", startGame);
