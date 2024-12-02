from flask import Flask, render_template, request
import random

app = Flask(__name__)

# 初始余额
player_balance = 1000

# 游戏历史记录
game_history = []

@app.route('/', methods=['GET', 'POST'])
def baccarat_game():
    global player_balance
    global game_history

    if request.method == 'POST':
        # 获取用户下注金额
        try:
            bet = int(request.form['bet'])
            if bet <= 0 or bet > player_balance:
                return render_template('index.html', balance=player_balance, history=game_history, error="下注金额无效，请重新输入！")
        except ValueError:
            return render_template('index.html', balance=player_balance, history=game_history, error="请输入有效的数字！")

        # 抽取点数
        player_score = random.randint(1, 9)
        banker_score = random.randint(1, 9)

        # 判断胜负
        if player_score > banker_score:
            result = "玩家胜利！"
            player_balance += bet
        elif player_score < banker_score:
            result = "庄家胜利！"
            player_balance -= bet
        else:
            result = "平局！"

        # 保存游戏记录
        game_history.append({
            "player_score": player_score,
            "banker_score": banker_score,
            "result": result,
            "bet": bet
        })

        # 返回结果页面
        return render_template('index.html', balance=player_balance, history=game_history)

    # 初始页面
    return render_template('index.html', balance=player_balance, history=game_history)

if __name__ == '__main__':
    app.run(debug=True)
