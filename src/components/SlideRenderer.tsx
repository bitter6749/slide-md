import React from 'react';
import { MarkdownRenderer } from './MarkdownRenderer';
import { SlideLayout } from '../types/presentation';

interface SlideRendererProps {
  content: string;
  layout: SlideLayout;
  theme: 'light' | 'dark';
  className?: string;
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({
  content,
  layout,
  theme,
  className = ''
}) => {

  // 記法の囲みブロック内の前後に:::などマーカーが残らないように安全に中身を取得するヘルパー
  function extractInnerContent(matchArray: RegExpMatchArray | null): string {
    if (!matchArray) return '';
    const raw = matchArray[1];
    // 「:::」や空行のみの行を除去する
    return raw
      .split('\n')
      .filter(line => !line.trim().startsWith(':::') && line.trim() !== '')
      .join('\n')
      .trim();
  }

  if (layout === 'split') {
    // 「::: split ... :::」の全マッチを取得（複数あれば対応可能）
    const splitBlocks = [...content.matchAll(/::: split\n([\s\S]*?)\n:::/g)];
    if (splitBlocks.length > 0) {
      // 今回は最初のsplitブロックのみ使用
      const innerContent = extractInnerContent(splitBlocks[0]);

      // ### で区切ってセクションごとに分割
      const sections = innerContent.split(/(?=### )/);
      const validSections = sections.filter(section => section.trim().startsWith('###'));

      if (validSections.length >= 2) {
        return (
          <div className={`${className} w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8 overflow-hidden`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl items-start">
              <div className="space-y-4 overflow-hidden flex flex-col justify-center">
                <MarkdownRenderer
                  content={validSections[0].trim()}
                  layout="content"
                  theme={theme}
                  className="overflow-hidden"
                />
              </div>
              <div className="space-y-4 overflow-hidden flex flex-col justify-center">
                <MarkdownRenderer
                  content={validSections[1].trim()}
                  layout="content"
                  theme={theme}
                  className="overflow-hidden"
                />
              </div>
            </div>
          </div>
        );
      }
    }
  }

  if (layout === 'compare') {
    const compareBlocks = [...content.matchAll(/::: compare\n([\s\S]*?)\n:::/g)];
    if (compareBlocks.length > 0) {
      const innerContent = extractInnerContent(compareBlocks[0]);

      const sections = innerContent.split(/(?=### )/);
      const validSections = sections.filter(section => section.trim().startsWith('###'));

      if (validSections.length >= 2) {
        return (
          <div className={`${className} w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8 overflow-hidden`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl items-start">
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border-l-4 border-red-500 overflow-hidden flex flex-col justify-center">
                <MarkdownRenderer
                  content={validSections[0].trim()}
                  layout="content"
                  theme={theme}
                  className="overflow-hidden text-red-700 dark:text-red-300"
                />
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500 overflow-hidden flex flex-col justify-center">
                <MarkdownRenderer
                  content={validSections[1].trim()}
                  layout="content"
                  theme={theme}
                  className="overflow-hidden text-green-700 dark:text-green-300"
                />
              </div>
            </div>
          </div>
        );
      }
    }
  }

  if (layout === 'stats') {
    const statsBlocks = [...content.matchAll(/::: stats\n([\s\S]*?)\n:::/g)];
    if (statsBlocks.length > 0) {
      const innerContent = extractInnerContent(statsBlocks[0]);
      const sections = innerContent.split(/(?=### )/);
      const validSections = sections.filter(section => section.trim().startsWith('###'));

      return (
        <div className={`${className} w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8 overflow-hidden`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl items-center justify-items-center">
            {validSections.map((section, i) => (
              <div key={i} className="text-center space-y-2 overflow-hidden">
                <MarkdownRenderer
                  content={section.trim()}
                  layout="content"
                  theme={theme}
                  className="overflow-hidden"
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  if (layout === 'features') {
    const featuresBlocks = [...content.matchAll(/::: features\n([\s\S]*?)\n:::/g)];
    if (featuresBlocks.length > 0) {
      const innerContent = extractInnerContent(featuresBlocks[0]);
      const sections = innerContent.split(/(?=### )/);
      const validSections = sections.filter(section => section.trim().startsWith('###'));

      return (
        <div className={`${className} w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8 overflow-hidden`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl items-start">
            {validSections.map((section, i) => (
              <div key={i} className="space-y-4 overflow-hidden flex flex-col justify-center">
                <MarkdownRenderer
                  content={section.trim()}
                  layout="content"
                  theme={theme}
                  className="overflow-hidden"
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  if (layout === 'quote') {
    const quoteBlocks = [...content.matchAll(/::: quote\n([\s\S]*?)\n:::/g)];
    if (quoteBlocks.length > 0) {
      const innerContent = extractInnerContent(quoteBlocks[0]);

      return (
        <div className={`${className} w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8 overflow-hidden`}>
          <div className="max-w-5xl text-center">
            <MarkdownRenderer
              content={innerContent}
              layout="content"
              theme={theme}
              className="overflow-hidden"
            />
          </div>
        </div>
      );
    }
  }

  if (layout === 'center') {
    const centerBlocks = [...content.matchAll(/::: center\n([\s\S]*?)\n:::/g)];
    if (centerBlocks.length > 0) {
      const innerContent = extractInnerContent(centerBlocks[0]);

      return (
        <div className={`${className} w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8 overflow-hidden`}>
          <div className="text-center max-w-5xl">
            <MarkdownRenderer
              content={innerContent}
              layout="content"
              theme={theme}
              className="overflow-hidden"
            />
          </div>
        </div>
      );
    }
  }


  // デフォルト
  return (
    <div className={`${className} w-full h-full overflow-hidden`}>
      <MarkdownRenderer
        content={content}
        layout={layout}
        theme={theme}
        className="w-full h-full"
      />
    </div>
  );
};
