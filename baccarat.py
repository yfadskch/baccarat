import random

# 显示游戏规则
def show_rules():
    print("""
    === 游戏规则 ===
    1. 玩家和庄家各抽两张牌。
    2. 点数总和保留个位数（例如：8 + 7 = 15，点数为 5）。
    3. 玩家可以下注，如果玩家胜利，获得等额下注金额；否则失去下注金额。
    4. 点数相同时为平局，不输不赢。
    =================
    """)

# 抽牌功能
def draw_card():
    """抽一张牌，返回点数 (1-9)"""
    return random.randint(1, 9)

# 计算总分
def calculate_score(cards):
    """计算总分，只保留个位"""
    return sum(cards) % 10

# 判断赢家
def determine_winner(player_score, banker_score):
    """判断赢家"""
    if player_score > banker_score:
        return "Player Wins!"
    elif player_score < banker_score:
        return "Banker Wins!"
    else:
        return "It's a Tie!"

# 主游戏逻辑
def baccarat_game():
    # 设置初始筹码
    player_balance = 1000
    game_history = []  # 保存每局结果

    print("\n欢迎来到百家乐游戏！")
    show_rules()

    while player_balance > 0:
        print(f"\n当前筹码：{player_balance}")
        try:
            bet = int(input("请输入您的下注金额（输入 0 退出游戏）："))
        except ValueError:
            print("请输入有效数字！")
            continue

        if bet == 0:
            break
        if bet > player_balance:
            print("您的筹码不足，请重新下注！")
            continue

        # 抽牌
        player_cards = [draw_card(), draw_card()]
        banker_cards = [draw_card(), draw_card()]

        # 计算分数
        player_score = calculate_score(player_cards)
        banker_score = calculate_score(banker_cards)

        # 显示牌面和分数
        print(f"\n玩家的牌: {player_cards}，点数: {player_score}")
        print(f"庄家的牌: {banker_cards}，点数: {banker_score}")

        # 判断赢家
        winner = determine_winner(player_score, banker_score)
        print(f"本局结果: {winner}")

        # 更新筹码
        if winner == "Player Wins!":
            player_balance += bet
            print(f"恭喜！您赢得了 {bet} 筹码！")
        elif winner == "Banker Wins!":
            player_balance -= bet
            print(f"很遗憾，您输了 {bet} 筹码。")
        else:
            print("本局为平局，筹码未变动。")

        # 保存结果
        game_history.append({
            "player_score": player_score,
            "banker_score": banker_score,
            "winner": winner,
            "bet": bet
        })

        # 是否继续游戏
        play_again = input("是否继续游戏？(y/n): ").lower()
        if play_again != 'y':
            break

    # 游戏结束
    print("\n=== 游戏结束 ===")
    print(f"您的最终筹码：{player_balance}")
    print("游戏记录：")
    for idx, record in enumerate(game_history):
        print(f"第 {idx + 1} 局 - 玩家: {record['player_score']} 庄家: {record['banker_score']} 结果: {record['winner']} 下注: {record['bet']}")

if __name__ == "__main__":
    baccarat_game()
