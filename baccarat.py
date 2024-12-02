import random

# 游戏规则
def show_rules():
    print("""
    === 游戏规则 ===
    1. 每位玩家和庄家都会抽两张牌。
    2. 牌的点数为 1 到 9，点数总和只保留个位数。
    3. 玩家可以下注，并选择是否继续游戏。
    4. 庄家和玩家的分数比较高者获胜。
    5. 如果点数相同，游戏结果为平局。
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
    # 设置玩家初始筹码
    player_balance = int(input("请输入您的初始筹码（默认为1000）：") or 1000)
    game_history = []  # 保存每局结果

    while player_balance > 0:
        print(f"\n当前筹码：{player_balance}")
        bet = int(input("请输入您的下注金额："))
        if bet > player_balance:
            print("您的筹码不足，请重新下注！")
            continue

        # 抽牌
        player_cards = [draw_card(), draw_card()]
        banker_cards = [draw_card(), draw_card()]

        # 计算分数
        player_score = calculate_score(player_cards)
        banker_score = calculate_score(banker_cards)

        # 看牌功能
        show_cards = input("是否查看牌？(y/n): ").lower()
        if show_cards == 'y':
            print(f"玩家的牌: {player_cards}，点数: {player_score}")
            print(f"庄家的牌: {banker_cards}，点数: {banker_score}")

        # 判断赢家
        winner = determine_winner(player_score, banker_score)
        print(f"\n本局结果: {winner}")

        # 更新筹码
        if winner == "Player Wins!":
            player_balance += bet
        elif winner == "Banker Wins!":
            player_balance -= bet

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

# 运行游戏
if __name__ == "__main__":
    print("欢迎来到百家乐游戏！")
    show_rules()
    baccarat_game()
