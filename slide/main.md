---
title: 高専に入って、GUIが苦手になった話
author: あなたの名前
theme: dark
date: 2025-01-29
---

# 高専に入って、GUIが苦手になった話

〜コードは書けるのに、PowerPointで挫折した高専生の物語〜

**ハッカーズチャンプルー 2025**

---

::: split
### 自己紹介

- **名前**: 〇〇です
- **所属**: 沖縄高専 メディア情報工学科
- **趣味**: プログラミング、ツール作成
- **好きな技術**: React, tailwindcss, Node.js

### ![プログラミング風景](https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600 "コーディング|width:400px|maxHeight:250px")
:::
---

## 今日お話しすること

1. **高専あるある** - スライド作成の機会が多すぎる問題
2. **挫折** - PowerPointに振り回される日々
3. **転機** - LaTeXとの出会い
4. **挑戦** - HTML/CSS/JSでスライド作成
5. **進化** - Markdownスライドツールの開発
6. **学び** - 「作ればいい」という発想

---

# 高専のスライド地獄

プレゼンの機会が異常に多い高専生活

---

## スライド作成の機会がとにかく多い！

::: features
### ICT委員会
委員会内でLT会を数多く開催
定期的な技術発表

### 学内イベント
企画書をパワポで作成
イベント報告資料

### 授業内発表
グループワークでの発表スライド
研究発表、中間報告
:::

**高専は本当にパワポでスライドを作る機会がとても多い！**

---

## 問題：PowerPointが楽しくない

![PowerPointの複雑な画面](https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800 "PowerPoint|width:500px|maxHeight:300px")

> コードを書くのは好きだけど、パワポでスライドを作成している時間は楽しくなく、モチベがないので全然上達しなかった。

---

::: compare
### PowerPointの現実
- 画像の配置に苦戦
- バージョン管理ができない
- モチベーションが上がらない
- 全然上達しない

### プログラマーの理想
- コードで管理したい
- Git でバージョン管理したい
- 楽しく作業したい
- 効率的に作成したい
:::

---

# 転機：LaTeXとの出会い

別の可能性を知った瞬間

---

## 衝撃的な発見

![LaTeX文書のイメージ](https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=600 "文書作成|width:450px|maxHeight:280px")

> 別の学科の人がレポートをLaTeXで書いているのを見た。
> 自分はWordで作成していたので、コードで書けるのがうらやましかった。

**「コードで文書が作れるなんて！」**

---

## 発想の転換

```latex
\documentclass{article}
\begin{document}
\title{レポートタイトル}
\author{学生名}
\maketitle

\section{はじめに}
この方法なら...
\end{document}
```

> そこから発想して、html, css, javascriptでスライドが書けないか試す。

**「だったらWeb技術でスライドも作れるのでは？」**

---

# 第一歩：HTML/CSS/JSでスライド作成

Web技術でのスライド作成に挑戦

---

## 最初の実装

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .slide {
            width: 100vw;
            height: 100vh;
            display: none;
            justify-content: center;
            align-items: center;
        }
        .slide.active { display: flex; }
    </style>
</head>
<body>
    <div class="slide active">
        <h1>最初のスライド</h1>
    </div>
    <div class="slide">
        <h2>次のスライド</h2>
    </div>
</body>
</html>
```

---

## JavaScript でナビゲーション

```javascript
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

//　矢印キーで進む・戻る
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    }
});

function nextSlide() {
    slides[currentSlide].classList.remove('active'); // 現在のスライドを非表示
    currentSlide = (currentSlide + 1) % slides.length; //　表示するスライドのインデックスを計算
    slides[currentSlide].classList.add('active'); // 次のスライドを表示
}
```

---

## 最初の感想

::: quote
> 記述量がとても多く、時間もかかる。

**「コードで制御できるのは良いけど、もっと効率的にしたい...」**
:::

---

# 進化1：JSONデータ化

データとレイアウトの分離を試行

---

## JSONでスライドデータを管理

```json
{
  "slides": [
    {
      "type": "title",
      "title": "プレゼンテーションタイトル",
      "subtitle": "サブタイトル",
      "author": "発表者名"
    },
    {
      "type": "content",
      "title": "スライドタイトル",
      "content": ["ポイント1", "ポイント2", "ポイント3"]
    }
  ]
}
```

> じゃあjsonで情報を書いてそれをhtmlに変換するwebアプリを作ろう！

---

## WebアプリでHTML生成

```javascript
function generateSlide(slideData) {
    if (slideData.type === 'title') {
        return `
            <div class="slide title-slide">
                <h1>${slideData.title}</h1>
                <h2>${slideData.subtitle}</h2>
                <p>${slideData.author}</p>
            </div>
        `;
    }
    // その他のスライドタイプも処理...
}
```

**作った！でも...**

---

## また新たな問題

::: center
> しかし、まだ、書く量が多くて時間がかかる。

**JSONも結局面倒だった...**
:::

---

# 進化2：Markdownの導入

先輩からのアドバイス

---

## 重要なアドバイス

![先輩からのアドバイス](https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg?auto=compress&cs=tinysrgb&w=600 "アドバイス|width:400px|maxHeight:250px")

> 先輩から「マークダウンで書けるようにしたらバックエンドの人とかには需要ありそうだけどね」と助言をもらう。

**これが転換点だった！**

---

## Markdownパーサーの実装

> mdファイルからスライドが作成できないか模索

```markdown
# タイトルスライド

---

## 通常のスライド

- ポイント1
- ポイント2
- ポイント3

---

::: split
### 左側のコンテンツ
内容

### 右側のコンテンツ
内容
:::
```

**これなら書きやすい！**

---

## リアルタイムプレビューの実装

> このタイミングでリアルタイムでプレビューが見えるようにエディターを作成

### 技術スタックの進化
- **Before**: HTML, CSS, JavaScript
- **After**: React + Tailwind CSS

###
![リアルタイムエディター](https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=600 "エディター|width:450px|maxHeight:280px")

---

## 独自記法の追加

> なるべくマークダウンの記法を崩さずに、独自の記法を混ぜて、スライドを作成できるように。

```markdown
::: split
### 左側
内容

### 右側
内容
:::

::: stats
### 85%
満足度

### 1,200+
利用者数
:::
```

**14種類のレイアウトに対応！**

---

# 開発で苦労したこと

技術的な挑戦と学び

---

## バグとの戦い

::: features
### スライドの区切り
`---` が意図しない場所で認識される
コードブロック内の区切り文字対策

### 独自記法の認識
`::: レイアウト名` の前後の空行チェック
ネストした構造の解析

### 正規表現
初めて本格的に使用
複雑なパターンマッチング
:::

> とにかくバグが多い。スライドの区切りがおかしかったり、独自の記法が上手く認識されなかったり。正規表現というのも初めて知った。

---

## 具体的な技術的課題

### 1. スライド区切りの問題
```markdown
# タイトル

\`\`\`
コードブロック内の---がスライド区切りと認識される
---
\`\`\`
```

### 2. 独自記法の解析
```javascript
// 正規表現でレイアウトブロックを抽出
const layoutRegex = /^:::\s*(\w+)\s*$(.*?)^:::$/gms;
```

---

# 得られた学びと成果

開発を通じて学んだこと

---

## 技術的な学び

::: split
### React の威力
- 複雑になったり、画面を細かく分割する場合はやっぱり、reactが便利だった
- コンポーネント思考の重要性
- 状態管理の効率化

### 新しい技術
- 正規表現の習得
- Markdownパーサーの実装
- リアルタイムプレビューの仕組み
:::

---

## 重要な気づき

::: quote
> 「ツールに慣れないなら作ればよい」という発想

**これが最も重要な学びだった**
:::

### 他の重要な学び
- **技術はあくまで手段** - 目的を見失わない
- **ユーザー視点の重要性** - 自分が使いやすいものを作る
- **継続的改善** - 使いながら機能を追加

---

## Before vs After

::: compare
### PowerPoint時代
- 作成に数時間かかる
- レイアウト調整で消耗
- バージョン管理なし
- カスタマイズ不可
- モチベーション低下

### Markdownスライド
- 作成時間が大幅短縮
- 一貫したレイアウト
- Gitでバージョン管理
- 自由にカスタマイズ
- 楽しく作業できる
:::

---

# デモンストレーション

実際のツールをご紹介

---

## 現在の機能

::: features
### 14種類のレイアウト
title, content, split, compare, stats, features, quote, center など

### リアルタイムプレビュー
編集しながらすぐに結果を確認

### ファイル操作
Markdownファイルの読み込み・保存
:::

---

## このスライド自体が実例

**このプレゼンテーション自体が自作ツールで作成されています！**

```markdown
---
title: 高専に入って、GUIが苦手になった話
author: あなたの名前
theme: dark
---

# 高専に入って、GUIが苦手になった話

〜コードは書けるのに、PowerPointで挫折した高専生の物語〜
```

---

# まとめ

高専生らしい問題解決

---

## 開発のストーリー

1. **問題発見** - PowerPointでの作業が非効率
2. **きっかけ** - LaTeXとの出会い
3. **第一歩** - HTML/CSS/JSで実装
4. **改良1** - JSONデータ化
5. **転機** - 先輩からのMarkdownアドバイス
6. **完成** - リアルタイムMarkdownエディター

---

::: quote
> 「ツールに慣れないなら作ればよい」

これが高専で学んだ最も重要なこと

問題を見つけたら、技術で解決する
:::

---

::: split
### 今後の展望
- **テーマシステムの強化**
- **PDF出力機能**
- **プラグインシステム**
- **オンライン共有機能**

### 
![未来への展望](https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600 "未来|width:450px|maxHeight:280px")
:::
---

## 高専生へのメッセージ

### あなたも作ってみませんか？

- 困ったことがあったら、まず「作れないか？」を考える
- 既存のツールに縛られない発想
- 技術は問題解決の強力な手段
- 小さくても自分の問題を解決することから始める

**みんなで技術で世界を便利にしていこう！**

---

## 質疑応答

ご質問・ご感想をお聞かせください

![質疑応答](https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg?auto=compress&cs=tinysrgb&w=600 "質問|width:400px|maxHeight:250px")

**ありがとうございました！**

---

::: center
# Thank You!

**ハッカーズチャンプルー 2025**

- GitHub: https://github.com/bitter6749/slide-md

- **Happy Coding! 🚀**
:::