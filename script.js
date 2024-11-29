const ROWS = 8; // 表格行数
const COLS = 12; // 表格列数
let currentRow = 0;
let currentCol = 0;

function initializeTable() {
    const table = document.getElementById('history-table');
    table.innerHTML = ''; // 清空表格
    for (let i = 0; i < ROWS; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < COLS; j++) {
            const cell = document.createElement('td');
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    currentRow = 0;
    currentCol = 0;
}

function addRecord(result) {
    const table = document.getElementById('history-table');
    const rows = table.getElementsByTagName('tr');
    const cell = rows[currentRow].children[currentCol];
    if (result === 'player') {
        cell.classList.add('blue');
        cell.textContent = '蓝';
    } else if (result === 'banker') {
        cell.classList.add('red');
        cell.textContent = '红';
    } else if (result === 'tie') {
        cell.classList.add('green');
        cell.textContent = '绿';
    }

    currentRow++;
    if (currentRow >= ROWS) {
        currentRow = 0;
        currentCol++;
        if (currentCol >= COLS) {
            alert('表格已满，清空记录！');
            initializeTable();
        }
    }
}

function playGame(betType) {
    const virtualCurrency = document.getElementById('virtual-currency');
    const points = document.getElementById('points');
    const playerCards = document.getElementById('player-cards');
    const bankerCards = document.getElementById('banker-cards');

    const outcomes = ['player', 'banker', 'tie'];
    const result = outcomes[Math.floor(Math.random() * outcomes.length)];

    let virtualCurrencyValue = parseInt(virtualCurrency.textContent);
    let pointsValue = parseInt(points.textContent);

    const playerHand = ['8♦', 'K♠'];
    const bankerHand = ['9♥', 'J♣'];

    playerCards.textContent = `玩家卡牌: ${playerHand.join(', ')}`;
    bankerCards.textContent = `庄家卡牌: ${bankerHand.join(', ')}`;

    if (result === betType) {
        virtualCurrencyValue += 100;
        pointsValue += 10;
        alert(`恭喜！您赢了，增加 100 虚拟货币和 10 积分！结果是${result === 'player' ? '玩家赢' : result === 'banker' ? '庄家赢' : '平局'}!`);
    } else {
        virtualCurrencyValue -= 100;
        alert(`很遗憾，您输了，减少 100 虚拟货币。结果是${result === 'player' ? '玩家赢' : result === 'banker' ? '庄家赢' : '平局'}!`);
    }

    virtualCurrency.textContent = virtualCurrencyValue;
    points.textContent = pointsValue;

    addRecord(result);

    if (virtualCurrencyValue <= 0) {
        alert('游戏结束！您的虚拟货币已用完！');
    }
}

document.getElementById('player-win').addEventListener('click', () => playGame('player'));
document.getElementById('banker-win').addEventListener('click', () => playGame('banker'));
document.getElementById('tie').addEventListener('click', () => playGame('tie'));

// 初始化表格
initializeTable();
