import { SlideLayout, Slide, SlideMetadata, PresentationData } from '../types/presentation';

// メタデータを解析する関数
export function parseMetadata(content: string): SlideMetadata {
  const metadataMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!metadataMatch) return {};

  const metadataText = metadataMatch[1];
  const metadata: SlideMetadata = {};

  metadataText.split('\n').forEach(line => {
    const [key, value] = line.split(':').map(s => s.trim());
    if (key && value) {
      switch (key) {
        case 'title':
          metadata.title = value;
          break;
        case 'author':
          metadata.author = value;
          break;
        case 'theme':
          metadata.theme = value as 'light' | 'dark';
          break;
        case 'date':
          metadata.date = value;
          break;
      }
    }
  });

  return metadata;
}

// レイアウトを自動判定する関数
export function detectLayout(slideContent: string): SlideLayout {
  const trimmed = slideContent.trim();
  
  // タイトルスライド検出（H1で始まる）
  if (trimmed.startsWith('# ')) return 'title';
  
  // 特殊コンテナ記法の検出
  if (trimmed.includes('::: split')) return 'split';
  if (trimmed.includes('::: compare')) return 'compare';
  if (trimmed.includes('::: gallery')) return 'gallery';
  if (trimmed.includes('::: quote')) return 'quote';
  if (trimmed.includes('::: timeline')) return 'timeline';
  if (trimmed.includes('::: features')) return 'features';
  if (trimmed.includes('::: stats')) return 'stats';
  if (trimmed.includes('::: team')) return 'team';
  if (trimmed.includes('::: hero')) return 'hero';
  if (trimmed.includes('::: center')) return 'center';
  
  // コードブロック単体の検出
  if (trimmed.startsWith('```') && trimmed.split('```').length >= 3) {
    const nonCodeContent = trimmed.replace(/```[\s\S]*?```/g, '').trim();
    if (!nonCodeContent || nonCodeContent.split('\n').filter(line => line.trim()).length <= 2) {
      return 'code';
    }
  }
  
  // 引用単体の検出
  if (trimmed.startsWith('> ')) {
    const lines = trimmed.split('\n').filter(line => line.trim());
    if (lines.every(line => line.startsWith('> ') || line.trim() === '')) {
      return 'quote';
    }
  }
  
  // 画像単体の検出
  if (trimmed.match(/^!\[.*?\]\(.*?\)$/m) && trimmed.split('\n').filter(line => line.trim()).length <= 3) {
  }
  // コードブロック内の---を無視してスライドに分割
  const slideContents = splitSlidesIgnoringCodeBlocks(contentWithoutMetadata);

  const slides: Slide[] = slideContents.map((content, index) => ({
    id: `slide-${index}`,
    content,
    layout: detectLayout(content),
    index
  }));

  return {
    metadata,
    slides
  };
}

// コードブロック内の---を無視してスライドを分割する関数
function splitSlidesIgnoringCodeBlocks(content: string): string[] {
  const slides: string[] = [];
  let currentSlide = '';
  let inCodeBlock = false;
  let codeBlockDelimiter = '';
  
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // コードブロックの開始/終了を検出
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        // コードブロック開始
        inCodeBlock = true;
        codeBlockDelimiter = '```';
      } else if (inCodeBlock && codeBlockDelimiter === '```') {
        // コードブロック終了
        inCodeBlock = false;
        codeBlockDelimiter = '';
      }
      currentSlide += line + '\n';
    } else if (line === '---' && !inCodeBlock) {
      // コードブロック外のスライド区切り
      if (currentSlide.trim()) {
        slides.push(currentSlide.trim());
        currentSlide = '';
      }
    } else {
      // 通常の行またはコードブロック内の行
      currentSlide += line + '\n';
    }
  }
  
  // 最後のスライドを追加
  if (currentSlide.trim()) {
    slides.push(currentSlide.trim());
  }
  
  return slides.filter(slide => slide.length > 0);
}
// レイアウト挿入用のテンプレート
export const layoutTemplates: Record<SlideLayout, string> = {
  title: `# プレゼンテーションタイトル

サブタイトルまたは説明文

発表者名`,
  
  content: `## スライドタイトル

- ポイント1
- ポイント2  
- ポイント3`,
  
  section: `### セクションタイトル

セクションの説明`,
  
  split: `::: split
### 左側のタイトル
左側のコンテンツ

### 右側のタイトル
右側のコンテンツ
:::`,
  
  compare: `::: compare
### Before（改善前）
- 問題点1
- 問題点2

### After（改善後）
- 解決策1
- 解決策2
:::`,
  
  gallery: `::: gallery
![画像1](./images/image1.jpg)
![画像2](./images/image2.jpg)
![画像3](./images/image3.jpg)
:::`,
  
  quote: `> 重要な引用文や名言をここに書きます。
> 複数行でも対応しています。

引用元の情報`,
  
  timeline: `::: timeline
### 2020年
プロジェクト開始

### 2022年
重要なマイルストーン

### 2024年
現在の状況
:::`,
  
  features: `::: features
### 機能1
説明文

### 機能2
説明文

### 機能3
説明文
:::`,
  
  stats: `::: stats
### 85%
満足度

### 1,200+
利用者数

### 50%
効率向上
:::`,
  
  team: `::: team
### 田中太郎
プロジェクトマネージャー

### 佐藤花子
デザイナー

### 山田次郎
エンジニア
:::`,
  
  hero: `![メイン画像](./images/hero.jpg)

# 大きな見出し

重要なメッセージ`,
  
  code: `## コードの説明

\`\`\`javascript
function hello() {
    console.log("Hello World!");
}

hello();
\`\`\``,
  
  center: `::: center
# 中央寄せタイトル

重要なメッセージを中央に配置
:::`
};