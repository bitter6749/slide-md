---
title: 高専に入って、GUIが苦手になった話
author: あなたの名前
theme: dark
---

# 高専に入って、GUIが苦手になった話

プログラムは書けるのに、PowerPointが使えない？！

2025年 ハッカーズチャンプルー

---

## 自己紹介

- **名前**: 〇〇です
- **所属**: 沖縄高専 情報通信システム工学科
- **趣味**: プログラミング、ゲーム
- **好きな言語**: JavaScript, Python, C++

---

## 今日話すこと

1. PowerPointで困った話
2. 解決策を考えた
3. 実際に作ってみた
4. 結果とまとめ

---

## 問題：PowerPointが難しい

![PowerPointの画面](https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800)

資料作成の機会が増えたけど...

---

::: compare
### PowerPointで困ること
- レイアウトが崩れる
- フォントがおかしくなる
- バージョン管理ができない
- 細かい調整が面倒
- 画像の配置が大変

### 欲しかった機能
- コードで管理したい
- バージョン管理したい
- 自由にカスタマイズしたい
- シンプルに書きたい
- 自動レイアウト
:::

---

## 解決策：自分で作ろう！

> プログラムが書けるなら、
> スライドもプログラムで作れるのでは？

「コードでスライドを書く」という発想

---

## 使った技術

```javascript
// 基本的な構成
const technologies = [
    "React",
    "TypeScript", 
    "Tailwind CSS",
    "Markdown"
];

// メイン機能
function createSlide(markdown) {
    return parseAndRender(markdown);
}
```

---

::: features
### リアルタイム編集
Markdownを書くとすぐにプレビューが更新される

### 自動レイアウト
`#` や `##` で自動的に適切なレイアウトを判定

### 豊富なテンプレート
20種類のレイアウトをワンクリックで挿入
:::

---

::: stats
### 95%
開発時間短縮

### 20+
レイアウト種類

### 100%
Markdown互換
:::

---

## デモ：実際に使ってみよう

::: split
### Before（従来の方法）
1. PowerPointを開く
2. レイアウトを選ぶ
3. テキストを入力
4. 画像を配置
5. フォントを調整
6. 位置を微調整

### After（この ツール）
1. Markdownを書く
2. 完成！
:::

---

## 今後の展望

- [ ] テーマカスタマイズ機能
- [ ] アニメーション効果
- [ ] PDF出力機能
- [ ] オンライン共有機能
- [ ] プラグインシステム

---

::: quote
> プログラマーなら、
> 自分の問題は自分で解決する

これが高専で学んだ一番大切なこと
:::

---

## まとめ

1. **問題を見つけた** - PowerPointが使いにくい
2. **解決策を考えた** - Markdownでスライド作成
3. **実装した** - React + TypeScript
4. **結果** - 開発効率が大幅に向上！

**ありがとうございました！**

---

## 質疑応答

何か質問はありますか？

GitHub: https://github.com/your-username/markdown-slides
Demo: https://your-demo-site.com