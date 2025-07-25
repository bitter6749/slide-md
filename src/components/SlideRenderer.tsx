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
  // 特殊レイアウトの処理
  if (layout === 'split') {
    // ::: split コンテナを処理
    const splitMatch = content.match(/::: split\n([\s\S]*?)\n:::/);
    if (splitMatch) {
      const innerContent = splitMatch[1];
      const sections = innerContent.split(/(?=### )/);
      const validSections = sections.filter(section => section.trim().startsWith('###'));
      
      if (validSections.length >= 2) {
        return (
          <div className={`${className} w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl items-start">
              <div className="space-y-4 max-w-full overflow-hidden">
                <MarkdownRenderer
                  content={validSections[0].trim()}
                  layout="content"
                  theme={theme}
                  className="max-w-full"
                />
              </div>
              <div className="space-y-4 max-w-full overflow-hidden">
                <MarkdownRenderer
                  content={validSections[1].trim()}
                  layout="content"
                  theme={theme}
                  className="max-w-full"
                />
              </div>
            </div>
          </div>
        );
      }
    }
  }

  if (layout === 'compare') {
    // ::: compare コンテナを処理
    const compareMatch = content.match(/::: compare\n([\s\S]*?)\n:::/);
    if (compareMatch) {
      const innerContent = compareMatch[1];
      const sections = innerContent.split(/(?=### )/);
      const validSections = sections.filter(section => section.trim().startsWith('###'));
      
      if (validSections.length >= 2) {
        return (
          <div className={`${className} w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl items-start">
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border-l-4 border-red-500 max-w-full overflow-hidden">
                <MarkdownRenderer
                  content={validSections[0].trim()}
                  layout="content"
                  theme={theme}
                  className="max-w-full text-red-700 dark:text-red-300"
                />
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500 max-w-full overflow-hidden">
                <MarkdownRenderer
                  content={validSections[1].trim()}
                  layout="content"
                  theme={theme}
                  className="max-w-full text-green-700 dark:text-green-300"
                />
              </div>
            </div>
          </div>
        );
      }
    }
  }

  if (layout === 'stats') {
    // ::: stats コンテナを処理
    const statsMatch = content.match(/::: stats\n([\s\S]*?)\n:::/);
    if (statsMatch) {
      const innerContent = statsMatch[1];
      const sections = innerContent.split(/(?=### )/);
      const validSections = sections.filter(section => section.trim().startsWith('###'));
      
      return (
        <div className={`${className} w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl items-center justify-items-center">
            {validSections.map((section, index) => (
              <div key={index} className="text-center space-y-2 max-w-full">
                <MarkdownRenderer
                  content={section.trim()}
                  layout="content"
                  theme={theme}
                  className="max-w-full"
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  if (layout === 'features') {
    // ::: features コンテナを処理
    const featuresMatch = content.match(/::: features\n([\s\S]*?)\n:::/);
    if (featuresMatch) {
      const innerContent = featuresMatch[1];
      const sections = innerContent.split(/(?=### )/);
      const validSections = sections.filter(section => section.trim().startsWith('###'));
      
      return (
        <div className={`${className} w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl items-start">
            {validSections.map((section, index) => (
              <div key={index} className="space-y-4 max-w-full overflow-hidden">
                <MarkdownRenderer
                  content={section.trim()}
                  layout="content"
                  theme={theme}
                  className="max-w-full"
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  if (layout === 'quote') {
    // ::: quote コンテナを処理
    const quoteMatch = content.match(/::: quote\n([\s\S]*?)\n:::/);
    if (quoteMatch) {
      const innerContent = quoteMatch[1];
      return (
        <div className={`${className} w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8`}>
          <div className="max-w-5xl text-center">
            <MarkdownRenderer
              content={innerContent.trim()}
              layout="content"
              theme={theme}
              className="max-w-full"
            />
          </div>
        </div>
      );
    }
  }

  if (layout === 'center') {
    // ::: center コンテナを処理
    const centerMatch = content.match(/::: center\n([\s\S]*?)\n:::/);
    if (centerMatch) {
      const innerContent = centerMatch[1];
      return (
        <div className={`${className} w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8`}>
          <div className="text-center max-w-5xl">
            <MarkdownRenderer
              content={innerContent.trim()}
              layout="content"
              theme={theme}
              className="max-w-full"
            />
          </div>
        </div>
      );
    }
  }

  // デフォルトのレンダリング
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