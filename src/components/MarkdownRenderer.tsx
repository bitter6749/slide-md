import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { SlideLayout } from '../types/presentation';

interface MarkdownRendererProps {
  content: string;
  layout: SlideLayout;
  theme: 'light' | 'dark';
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  layout,
  theme,
  className = ''
}) => {
  // 特殊コンテナの処理
  const processedContent = processSpecialContainers(content, layout);

  const components = {
    code({node, inline, className, children, ...props}: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={theme === 'dark' ? oneDark : oneLight}
          language={match[1]}
          PreTag="div"
          className="rounded-lg"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={`${className} bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm`} {...props}>
          {children}
        </code>
      );
    },
    h1: ({children}: any) => (
      <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center leading-tight">
        {children}
      </h1>
    ),
    h2: ({children}: any) => (
      <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
        {children}
      </h2>
    ),
    h3: ({children}: any) => (
      <h3 className="text-xl md:text-2xl font-semibold mb-4 leading-tight">
        {children}
      </h3>
    ),
    p: ({children}: any) => (
      <p className="text-base md:text-lg mb-6 leading-relaxed">
        {children}
      </p>
    ),
    ul: ({children}: any) => (
      <ul className="text-base md:text-lg space-y-3 mb-6 list-disc pl-6">
        {children}
      </ul>
    ),
    ol: ({children}: any) => (
      <ol className="text-base md:text-lg space-y-3 mb-6 list-decimal pl-6">
        {children}
      </ol>
    ),
    blockquote: ({children}: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-8 py-4 italic text-lg md:text-xl mb-8 bg-blue-900/20 rounded-r-lg">
        {children}
      </blockquote>
    ),
    img: ({src, alt}: any) => (
      <img 
        src={src} 
        alt={alt} 
        className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
        loading="lazy"
      />
    ),
  };

  return (
    <div className={getLayoutClasses(layout, className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

// 特殊コンテナの処理
function processSpecialContainers(content: string, layout: SlideLayout): string {
  if (layout === 'split') {
    return content.replace(
      /::: split\n([\s\S]*?)\n:::/,
      (match, innerContent) => {
        const sections = innerContent.split(/\n### /);
        if (sections.length >= 2) {
          return `<div class="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            <div class="space-y-4">
              <h3 class="text-2xl font-semibold mb-3">${sections[0].replace(/^### /, '').split('\n')[0]}</h3>
              ${sections[0].replace(/^### .*?\n/, '').trim()}
            </div>
            <div class="space-y-4">
              <h3 class="text-2xl font-semibold mb-3">${sections[1].split('\n')[0]}</h3>
              ${sections[1].replace(/^.*?\n/, '').trim()}
            </div>
          </div>`;
        }
        return innerContent;
      }
    );
  }

  if (layout === 'compare') {
    return content.replace(
      /::: compare\n([\s\S]*?)\n:::/,
      (match, innerContent) => {
        const sections = innerContent.split(/\n### /);
        if (sections.length >= 2) {
          return `<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border-l-4 border-red-500">
              <h3 class="text-xl font-semibold mb-3 text-red-700 dark:text-red-300">${sections[0].replace(/^### /, '').split('\n')[0]}</h3>
              ${sections[0].replace(/^### .*?\n/, '').trim()}
            </div>
            <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
              <h3 class="text-xl font-semibold mb-3 text-green-700 dark:text-green-300">${sections[1].split('\n')[0]}</h3>
              ${sections[1].replace(/^.*?\n/, '').trim()}
            </div>
          </div>`;
        }
        return innerContent;
      }
    );
  }

  // その他の特殊コンテナも同様に処理
  return content.replace(/::: \w+\n([\s\S]*?)\n:::/g, '$1');
}

// レイアウト別のCSSクラス
function getLayoutClasses(layout: SlideLayout, baseClassName: string): string {
  const baseClasses = `${baseClassName} w-full h-full px-12 py-8 overflow-auto`;
  
  switch (layout) {
    case 'title':
      return `${baseClasses} flex flex-col justify-center items-center text-center`;
    case 'center':
      return `${baseClasses} flex flex-col justify-center items-center text-center`;
    case 'hero':
      return `${baseClasses} flex flex-col justify-center items-center text-center space-y-6`;
    case 'quote':
      return `${baseClasses} flex flex-col justify-center items-center text-center max-w-5xl mx-auto`;
    case 'code':
      return `${baseClasses} flex flex-col justify-center space-y-6`;
    case 'stats':
      return `${baseClasses} flex flex-col justify-center`;
    case 'features':
      return `${baseClasses} flex flex-col space-y-8`;
    case 'timeline':
      return `${baseClasses} flex flex-col space-y-8`;
    case 'team':
      return `${baseClasses} grid grid-cols-1 md:grid-cols-3 gap-8 items-center`;
    case 'gallery':
      return `${baseClasses} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-items-center`;
    default:
      return `${baseClasses} flex flex-col justify-start space-y-6`;
  }
}