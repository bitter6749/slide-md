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
    const parts = content.split('---split---');
    if (parts.length === 2) {
      return (
        <div className={`${className} w-full h-full max-w-full max-h-full px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8 overflow-hidden`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-start">
            <div className="space-y-4 max-w-full overflow-hidden">
              <MarkdownRenderer
                content={parts[0].trim()}
                layout="content"
                theme={theme}
                className="max-w-full"
              />
            </div>
            <div className="space-y-4 max-w-full overflow-hidden">
              <MarkdownRenderer
                content={parts[1].trim()}
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

  if (layout === 'compare') {
    const parts = content.split('---compare---');
    if (parts.length === 2) {
      return (
        <div className={`${className} w-full h-full max-w-full max-h-full px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8 overflow-hidden`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-start">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border-l-4 border-red-500 max-w-full overflow-hidden">
              <MarkdownRenderer
                content={parts[0].trim()}
                layout="content"
                theme={theme}
                className="max-w-full text-red-700 dark:text-red-300"
              />
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500 max-w-full overflow-hidden">
              <MarkdownRenderer
                content={parts[1].trim()}
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

  if (layout === 'stats') {
    const parts = content.split('---stat---');
    return (
      <div className={`${className} w-full h-full max-w-full max-h-full px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8 overflow-hidden`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full items-center justify-items-center">
          {parts.map((part, index) => (
            <div key={index} className="text-center space-y-2 max-w-full">
              <MarkdownRenderer
                content={part.trim()}
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

  if (layout === 'features') {
    const parts = content.split('---feature---');
    return (
      <div className={`${className} w-full h-full max-w-full max-h-full px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8 overflow-hidden`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full items-start">
          {parts.map((part, index) => (
            <div key={index} className="space-y-4 max-w-full overflow-hidden">
              <MarkdownRenderer
                content={part.trim()}
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

  // デフォルトのレンダリング
  return (
    <MarkdownRenderer
      content={content}
      layout={layout}
      theme={theme}
      className={className}
    />
  );
};