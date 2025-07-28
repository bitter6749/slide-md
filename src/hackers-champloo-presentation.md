---
title: 高専に入って、GUIが苦手になった話
author: あなたの名前
theme: dark
---

# 高専に入って、GUIが苦手になった話

プログラムは書けるのに、PowerPointが使えない？！

**2025年 ハッカーズチャンプルー**

---

## 自己紹介

- **名前**: 〇〇です
- **所属**: 沖縄高専 情報通信システム工学科 X年
- **趣味**: プログラミング、ゲーム
- **好きな言語**: JavaScript, Python, C++

![プログラミングのイメージ](https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600 "プログラミング風景|width:400px|maxHeight:250px")

---

## なぜこのタイトル？

> 「コードは書けるのに、なぜGUIツールはこんなに難しいんだ...」

高専に入って、プログラミングは得意になったけど...

**PowerPointで資料作成が地獄だった話**

---

## 今日話すこと

1. **問題提起** - PowerPointとの格闘
2. **転機** - 「それなら自分で作ろう」
3. **技術解説** - ブラウザスライドの仕組み
4. **進化** - Markdown対応
5. **学び** - 得られたもの

---

## 問題：PowerPointが難しすぎる

![PowerPointの複雑な画面](https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800 "PowerPointの複雑なUI|width:600px|maxHeight:350px")

高専入学後、**資料作成の機会が激増**

---

::: compare
### PowerPointで困ること
- レイアウトが勝手に崩れる
- フォントが勝手に変わる
- バージョン管理ができない
- 細かい調整が異常に面倒
- 画像の配置で1時間消費
- 「なんで思った通りにならないの？」

### プログラマーが欲しいもの
- コードで管理したい
- Git でバージョン管理したい
- 自由にカスタマイズしたい
- シンプルに書きたい
- 自動レイアウト
- 「思った通りに動いて欲しい」
:::

---

## 具体的な困りごと

```text
発表前日の夜...

「あれ？フォントが変わってる...」
「画像がずれてる...」
「レイアウトが崩れた...」
「PowerPointのバージョンが違う...」

結果：徹夜でレイアウト調整 😭
```

**コードは書けるのに、なぜGUIはこんなに難しいんだ...**

---

## 転機：「それなら自分で作ろう」

![ひらめきのイメージ](https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=600 "アイデアのひらめき|width:400px|maxHeight:250px")

> 「Web技術でスライドを作れば、コードで制御できる！」

**HTML/CSS/JavaScriptなら得意分野**

---

## 初回スライド作成体験

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .slide { 
            width: 100vw; 
            height: 100vh; 
            display: none; 
        }
        .slide.active { display: flex; }
    </style>
</head>
<body>
    <div class="slide active">
        <h1>最初のスライド</h1>
    </div>
</body>
</html>
```

**「これだ！完全にコントロールできる！」**

---

## 技術解説：ブラウザスライドの仕組み

### 基本的な技術構成

- **HTML**: コンテンツ構造
- **CSS**: レイアウト・デザイン
- **JavaScript**: インタラクション・ナビゲーション

![Web技術のイメージ](https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600 "Web開発|width:450px|maxHeight:280px")

---

## キーボードイベント処理

```javascript
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'Escape') {
        exitFullscreen();
    }
});

function nextSlide() {
    currentSlide++;
    updateSlideDisplay();
}
```

**PowerPointにはない自由度とカスタマイズ性！**

---

## CSSアニメーション

```css
.slide {
    transition: transform 0.3s ease-in-out;
}

.slide-enter {
    transform: translateX(100%);
}

.slide-exit {
    transform: translateX(-100%);
}

/* 自分好みのアニメーションが作れる！ */
```

---

::: stats
### 95%
開発時間短縮

### 0回
レイアウト崩れ

### 100%
思った通りの動作
:::

---

## さらなる進化：Markdown対応

![Markdownのイメージ](https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=600 "Markdown記法|width:500px|maxHeight:300px")

> 「HTMLを直接書くのも面倒だな...」

**Markdownパーサーの導入**

---

## Before vs After

::: split
### Before（HTML直書き）
```html
<div class="slide">
    <h1>タイトル</h1>
    <ul>
        <li>項目1</li>
        <li>項目2</li>
    </ul>
</div>
```

### After（Markdown）
```markdown
# タイトル

- 項目1
- 項目2
```
:::

**記述の簡単さとコードでの管理のメリット**

---

## デモ：Markdownからスライド生成

\`\`\`markdown
---
title: プレゼンテーション
author: 高専生
---

# タイトルスライド

---

## 内容スライド

- ポイント1
- ポイント2

---

::: split
### 左側
内容

### 右側  
内容
:::
\`\`\`

**→ 美しいスライドに自動変換！**

---

## 実際に使ってみた結果

![成功のイメージ](https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600 "成功体験|width:450px|maxHeight:280px")

- **作成時間**: 1/10に短縮
- **レイアウト崩れ**: 0回
- **バージョン管理**: Git で完璧
- **カスタマイズ**: 思いのまま

---

## 得られたもの・学び

### 1. 問題解決のアプローチ
> GUIが苦手でも、得意分野で解決策を見つけられる

### 2. 技術で解決する楽しさ
> 問題を技術で解決する達成感

### 3. 発想の転換
> 「ツールに合わせる」から「ツールを作る」へ

---

::: features
### 高専生らしい解決法
既存ツールの限界を感じたら、自分で作る

### 得意分野の活用
プログラミングスキルを別分野に応用

### 継続的改善
使いながら機能を追加・改善
:::

---

## 今後の展望

- [ ] **テーマカスタマイズ機能**
- [ ] **アニメーション効果の追加**
- [ ] **PDF出力機能**
- [ ] **オンライン共有機能**
- [ ] **プラグインシステム**
- [ ] **音声認識での操作**

![未来のイメージ](https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600 "未来への展望|width:450px|maxHeight:280px")

---

::: quote
> 「困ったら作る」

これが高専で学んだ一番大切なこと

プログラマーなら、自分の問題は自分で解決する
:::

---

## まとめ

1. **問題を見つけた** - PowerPointが使いにくい
2. **解決策を考えた** - Web技術でスライド作成
3. **実装した** - HTML/CSS/JS → Markdown
4. **結果** - 開発効率が大幅に向上！

### 高専生らしい問題解決アプローチ
**「ツールに振り回されるより、ツールを作ろう」**

---

## 実際のデモ

**このスライド自体が自作ツールで作られています！**

![デモのイメージ](https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=600 "ライブデモ|width:500px|maxHeight:300px")

**GitHub**: https://github.com/your-username/markdown-slides

---

## 質疑応答

何か質問はありますか？

![質問のイメージ](https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg?auto=compress&cs=tinysrgb&w=600 "質疑応答|width:450px|maxHeight:280px")

**ありがとうございました！**