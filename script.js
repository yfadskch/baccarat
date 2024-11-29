document.addEventListener('DOMContentLoaded', () => {
    let virtualCurrency = 1000;
    let playerPoints = 0;

    function updateGameInfo() {
        document.getElementById('virtual-currency').textContent = virtualCurrency;
        document.getElementById('player-points').textContent = playerPoints;
    }

    function playGame(betType) {
        const outcomes = ['player', 'banker', 'tie'];
        const result = outcomes[Math.floor(Math.random() * outcomes.length)];

        const betAmount = 100; 
        let message = '';

        if (result === betType) {
            virtualCurrency += betAmount;
            playerPoints += 10; 
            message = `恭喜！你赢了，增加 ${betAmount} 虚拟货币和 10 积分！`;
        } else {
            virtualCurrency -= betAmount;
            message = `很遗憾，你输了，减少 ${betAmount} 虚拟货币。`;
        }

        document.getElementById('result-message').textContent = message;
        updateGameInfo();
    }

    document.getElementById('player-button').addEventListener('click', () => playGame('player'));
    document.getElementById('banker-button').addEventListener('click', () => playGame('banker'));
    document.getElementById('tie-button').addEventListener('click', () => playGame('tie'));

    updateGameInfo();
});
