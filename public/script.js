document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const registerButton = document.getElementById('registerButton');
    const loginButton = document.getElementById('loginButton');
    const playButton = document.getElementById('playButton');
    const gameResult = document.getElementById('gameResult');
    const scoreDisplay = document.getElementById('score');
    const rewardScoreDisplay = document.getElementById('rewardScore');

    let score = 100;

    // 注册逻辑
    registerButton.addEventListener('click', () => {
        alert('Register functionality to be implemented.');
    });

    // 登录逻辑
    loginButton.addEventListener('click', () => {
        alert('Login functionality to be implemented.');
    });

    // 游戏逻辑
    playButton.addEventListener('click', () => {
        const player = Math.floor(Math.random() * 10) + 1;
        const banker = Math.floor(Math.random() * 10) + 1;
        if (player > banker) {
            gameResult.textContent = `Player: ${player}, Banker: ${banker}. You win!`;
            score += 10;
        } else if (player < banker) {
            gameResult.textContent = `Player: ${player}, Banker: ${banker}. You lose!`;
            score -= 10;
        } else {
            gameResult.textContent = `Player: ${player}, Banker: ${banker}. It's a tie!`;
        }
        scoreDisplay.textContent = score;
        rewardScoreDisplay.textContent = score;
    });

    // 兑换奖励逻辑
    document.querySelectorAll('.redeemButton').forEach(button => {
        button.addEventListener('click', () => {
            const rewardType = button.dataset.reward;
            if (rewardType === 'giftCard' && score >= 100) {
                alert('Redeemed $10 Gift Card!');
                score -= 100;
            } else if (rewardType === 'freeSpin' && score >= 50) {
                alert('Redeemed Free Spin!');
                score -= 50;
            } else {
                alert('Not enough points to redeem this reward.');
            }
            scoreDisplay.textContent = score;
            rewardScoreDisplay.textContent = score;
        });
    });
});
