// 确保所有内容在 DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 1. Register 和 Login 按钮事件绑定
    document.getElementById('registerButton').addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (username && password) {
            alert(`User ${username} registered successfully!`);
        } else {
            alert('Please fill in all fields!');
        }
    });

    document.getElementById('loginButton').addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (username && password) {
            alert(`Welcome back, ${username}!`);
        } else {
            alert('Please fill in all fields!');
        }
    });

    // 2. Play Game 按钮绑定
    document.getElementById('playButton').addEventListener('click', playGame);

    // 3. Redeem Reward 按钮绑定
    const redeemButtons = document.querySelectorAll('.redeemButton');
    redeemButtons.forEach(button => {
        button.addEventListener('click', redeemReward);
    });
});

// 游戏逻辑：实现 Play Game 功能
function playGame() {
    const playerScore = Math.floor(Math.random() * 10) + 1; // 随机生成玩家分数
    const bankerScore = Math.floor(Math.random() * 10) + 1; // 随机生成庄家分数
    const statusElement = document.getElementById('gameStatus');
    const scoreElement = document.getElementById('score');

    let currentScore = parseInt(scoreElement.textContent.split(': ')[1]); // 获取当前分数

    // 判断游戏结果
    if (playerScore > bankerScore) {
        statusElement.textContent = `Player: ${playerScore}, Banker: ${bankerScore}. You win!`;
        currentScore += 10; // 玩家胜利加10分
    } else if (playerScore < bankerScore) {
        statusElement.textContent = `Player: ${playerScore}, Banker: ${bankerScore}. You lose!`;
        currentScore -= 5; // 玩家失败扣5分
    } else {
        statusElement.textContent = `Player: ${playerScore}, Banker: ${bankerScore}. It's a tie!`;
        currentScore += 1; // 平局加1分
    }

    scoreElement.textContent = `Score: ${currentScore}`; // 更新分数
}

// 兑换逻辑：实现 Redeem Reward 功能
function redeemReward(event) {
    const button = event.target; // 获取触发点击事件的按钮
    const requiredPoints = parseInt(button.dataset.points); // 获取兑换所需积分
    const rewardName = button.dataset.reward; // 获取奖励名称

    const scoreElement = document.getElementById('score');
    let currentScore = parseInt(scoreElement.textContent.split(': ')[1]); // 当前分数

    // 判断是否有足够积分兑换
    if (currentScore >= requiredPoints) {
        currentScore -= requiredPoints; // 扣除积分
        alert(`You have redeemed ${rewardName}!`); // 显示成功信息
    } else {
        alert(`Not enough points to redeem ${rewardName}!`); // 显示失败信息
    }

    scoreElement.textContent = `Score: ${currentScore}`; // 更新分数
}
