document.getElementById('play-button').addEventListener('click', async () => {
    const results = ['player', 'banker', 'tie'];
    const randomResult = results[Math.floor(Math.random() * results.length)];

    // 模拟用户 ID
    const userId = '1234567890abcdef12345678';

    // 保存游戏结果到服务器
    await fetch('/api/game/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, result: randomResult })
    });

    // 重新加载游戏结果
    loadResults();
});

async function loadResults() {
    const response = await fetch('/api/game/results');
    const results = await response.json();

    const tableBody = document.querySelector('#results-table tbody');
    tableBody.innerHTML = '';

    results.forEach((result, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td class="${result.result}">${result.result}</td>
            <td>${new Date(result.createdAt).toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
    });
}

// 初始加载
loadResults();
