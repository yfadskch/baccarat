document.getElementById("player-button").addEventListener("click", function() {
    playGame("player");
});

document.getElementById("banker-button").addEventListener("click", function() {
    playGame("banker");
});

document.getElementById("tie-button").addEventListener("click", function() {
    playGame("tie");
});

function playGame(bet) {
    const outcomes = ["player", "banker", "tie"];
    const result = outcomes[Math.floor(Math.random() * outcomes.length)];

    let message = "";
    if (bet === result) {
        message = `恭喜！您投注${translate(bet)}赢了！`;
    } else {
        message = `很遗憾，您投注${translate(bet)}输了。结果是${translate(result)}！`;
    }

    document.getElementById("result").innerText = message;
}

function translate(outcome) {
    switch (outcome) {
        case "player": return "玩家赢";
        case "banker": return "庄家赢";
        case "tie": return "平局";
    }
}
