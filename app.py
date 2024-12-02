from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

player_balance = 2000
game_history = []

def draw_card():
    """抽一张卡，返回卡牌和点数"""
    card = random.randint(1, 9)  # 卡牌是 1 到 9
    return str(card), card  # 返回卡牌和点数

@app.route('/')
def index():
    return render_template('index.html', balance=player_balance, history=game_history)

@app.route('/play', methods=['POST'])
def play():
    global player_balance
    bet_amount = int(request.json.get('betAmount', 0))
    target = request.json.get('target', 'player')

    player_cards = [draw_card(), draw_card()]
    banker_cards = [draw_card(), draw_card()]

    player_score = sum([card[1] for card in player_cards]) % 10
    banker_score = sum([card[1] for card in banker_cards]) % 10

    if player_score > banker_score:
        winner = 'player'
    elif player_score < banker_score:
        winner = 'banker'
    else:
        winner = 'tie'

    balance_change = 0
    if target == winner:
        balance_change = bet_amount
        player_balance += bet_amount
    elif winner != 'tie':  # 平局不输不赢
        balance_change = -bet_amount
        player_balance -= bet_amount

    result = {
        'player_cards': [card[0] for card in player_cards],
        'banker_cards': [card[0] for card in banker_cards],
        'player_score': player_score,
        'banker_score': banker_score,
        'winner': winner,
        'bet': bet_amount,
        'balance_change': balance_change,
    }
    game_history.append(result)

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
