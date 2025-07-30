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

// detectLayout関数の修正
export function detectLayout(slideContent: string): SlideLayout {
  const trimmed = slideContent.trim();

  // Check if the entire slide is a code block
  const isCodeBlock = (content: string) => {
    const lines = content.split('\n');
    return lines[0].startsWith('```') && lines[lines.length - 1].startsWith('```');
  };

  if (isCodeBlock(trimmed)) {
    return 'code';
  }

  // Title slide detection (starts with H1)
  if (trimmed.startsWith('# ')) return 'title';

  // Ignore layout markers inside code blocks
  const lines = trimmed.split('\n');
  let inCodeBlock = false;
  for (const line of lines) {
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
    }
    if (inCodeBlock) continue;

    if (line.includes('::: split')) return 'split';
    if (line.includes('::: compare')) return 'compare';
    if (line.includes('::: gallery')) return 'gallery';
    if (line.includes('::: quote')) return 'quote';
    if (line.includes('::: timeline')) return 'timeline';
    if (line.includes('::: features')) return 'features';
    if (line.includes('::: stats')) return 'stats';
    if (line.includes('::: team')) return 'team';
    if (line.includes('::: hero')) return 'hero';
    if (line.includes('::: center')) return 'center';
  }

  // Detect standalone quotes
  if (trimmed.startsWith('> ')) {
    const quoteLines = trimmed.split('\n').filter(line => line.trim());
    if (quoteLines.every(line => line.startsWith('> ') || line.trim() === '')) {
      return 'quote';
    }
  }

  // Detect standalone images
  if (trimmed.match(/^!\[.*?\]\(.*?\)$/m) && trimmed.split('\n').filter(line => line.trim()).length <= 3) {
    return 'image';
  }

  // Default to content layout
  return 'content';
}

// parseMarkdown関数の修正
export function parseMarkdown(content: string): PresentationData {
  // メタデータを解析
  const metadata = parseMetadata(content);

  // メタデータを除いたコンテンツを取得
  const contentWithoutMetadata = content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '').trim();

  // コードブロック内の---を無視してスライドに分割
  const slideContents = splitSlidesIgnoringCodeBlocks(contentWithoutMetadata);

  // スライドを生成
  const slides: Slide[] = slideContents.map((content, index) => ({
    id: `slide-${index}`,
    content,
    layout: detectLayout(content), // 修正済み
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
      continue;
    }

    // コードブロック内の行はそのまま追加
    if (inCodeBlock) {
      currentSlide += line + '\n';
      continue;
    }

    // スライド区切りを検出
    if (line.trim() === '---') {
      if (currentSlide.trim()) {
        slides.push(currentSlide.trim());
        currentSlide = '';
      }
    } else {
      // 通常の行を追加
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
:::`,
  
  image: `![画像の説明](./images/sample.jpg)`
};