# スライドの作り方ガイド

このツールの使い方を説明します。

![ガイドのイメージ](https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800 "プレゼンテーション作成のイメージ|width:500px|maxHeight:300px")

---

## 基本の書き方

普通のMarkdownと同じです：

```markdown
## スライドタイトル

- 箇条書き1
- 箇条書き2
- 箇条書き3
```

![基本の書き方](https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800 "Markdownの書き方|width:400px|maxHeight:250px")

---

## スライドを分ける

`---` でスライドを区切ります：

```markdown
## 最初のスライド

内容1

---

## 次のスライド

内容2
```

![スライド分割のイメージ](https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800 "スライドの分割|width:450px|maxHeight:280px")

---

## メタデータの設定

最初にプレゼンテーションの情報を書けます：

```markdown
---
title: プレゼンテーションタイトル
author: あなたの名前
theme: dark
---
```

![設定のイメージ](https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800 "設定画面|width:400px|maxHeight:250px")

---

## 自動レイアウト認識

特別な記述をしなくても、自動でレイアウトが決まります：

- `# タイトル` → **タイトルスライド**
- `## 見出し` → **通常スライド**
- `![画像](url)` 単体 → **画像フォーカス**
- `> 引用` 単体 → **引用スライド**

![自動レイアウト](https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800 "自動レイアウト機能|width:500px|maxHeight:300px")

---

## 特別なレイアウト

### 2つに分けたい時

```markdown
::: split
### 左側のタイトル
左側の内容

### 右側のタイトル  
右側の内容
:::
```

![2カラムレイアウト](https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800 "2カラムレイアウト|width:450px|maxHeight:280px")

---

### 比較したい時

```markdown
::: compare
### Before（改善前）
- 問題点1
- 問題点2

### After（改善後）
- 解決策1
- 解決策2
:::
```

![比較レイアウト](https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800 "比較レイアウト|width:450px|maxHeight:280px")

---

### 統計・数値を強調

```markdown
::: stats
### 85%
満足度

### 1,200+
利用者数

### 50%
効率向上
:::
```

---

### 機能紹介

```markdown
::: features
### 機能1
説明文

### 機能2
説明文

### 機能3
説明文
:::
```

---

## レイアウト一覧

| レイアウト | 用途 | 記法 |
|-----------|------|------|
| title | タイトルページ | `# タイトル` |
| content | 通常のスライド | `## 見出し` |
| split | 2カラム | `::: split` |
| compare | 比較 | `::: compare` |
| quote | 引用強調 | `::: quote` |
| stats | 数値強調 | `::: stats` |
| features | 機能紹介 | `::: features` |
| hero | 画像フォーカス | `![画像](url)` 単体 |
| code | コード説明 | コードブロック中心 |
| center | 中央寄せ | `::: center` |

---

## 便利な機能

### キーボードショートカット（プレゼンモード）
- `→` または `Space` : 次のスライド
- `←` : 前のスライド  
- `Esc` : プレゼンモード終了

### ツールバー
- **レイアウト挿入**: ワンクリックでテンプレート挿入
- **背景色変更**: 5種類の背景色から選択
- **ファイル読み込み**: .mdファイルを開く
- **ダウンロード**: .mdファイルとして保存

![ツールバー](https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800 "ツールバーの機能|width:500px|maxHeight:300px")

---

## コツとテクニック

1. **シンプルに書く** - 複雑な記法は避ける
2. **画像はオンライン** - URLで指定すると確実
3. **プレビューを確認** - リアルタイムで見ながら編集
4. **レイアウトボタン活用** - 手で書くより確実

![コツとテクニック](https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg?auto=compress&cs=tinysrgb&w=800 "効率的な作成方法|width:450px|maxHeight:280px")

---

## よくある質問

### Q: 画像が表示されない
A: 画像のURLが正しいか確認してください。相対パスの場合は同じフォルダに画像ファイルが必要です。

### Q: 特殊レイアウトがうまく表示されない
A: `:::` の前後に空行があることを確認してください。

### Q: プレゼンモードで操作できない
A: キーボードの矢印キーやスペースキーを使ってください。

### Q: 画像のサイズを調整したい
A: タイトル属性でサイズを指定できます：
```markdown
![画像](url "説明|width:400px|height:300px")
```

![FAQ](https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800 "よくある質問|width:400px|maxHeight:250px")

---

## サンプルファイル

「sample-presentation.md」に実際の例があります。
参考にして、自分のプレゼンテーションを作ってみてください！

**楽しいプレゼンテーション作成を！**

![完成イメージ](https://images.pexels.com/photos/1181712/pexels-photo-1181712.jpeg?auto=compress&cs=tinysrgb&w=800 "完成したプレゼンテーション|width:500px|maxHeight:300px")