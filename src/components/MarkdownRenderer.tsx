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
  const components = {
    code({node, inline, className, children, ...props}: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <div className="w-full overflow-hidden">
          <SyntaxHighlighter
            style={theme === 'dark' ? oneDark : oneLight}
            language={match[1]}
            PreTag="div"
            className="rounded-lg text-sm"
            customStyle={{
              width: '100%',
              fontSize: '0.875rem',
              lineHeight: '1.5',
              margin: 0,
              overflow: 'auto'
            }}
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className={`${className} bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm break-all`} {...props}>
          {children}
        </code>
      );
    },
    h1: ({children}: any) => (
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-center leading-tight break-words overflow-hidden">
        {children}
      </h1>
    ),
    h2: ({children}: any) => (
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 leading-tight break-words overflow-hidden">
        {children}
      </h2>
    ),
    h3: ({children}: any) => (
      <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-3 md:mb-4 leading-tight break-words overflow-hidden">
        {children}
      </h3>
    ),
    p: ({children}: any) => (
      <p className="text-sm md:text-base lg:text-lg mb-4 md:mb-6 leading-relaxed break-words overflow-hidden">
        {children}
      </p>
    ),
    ul: ({children}: any) => (
      <ul className="text-sm md:text-base lg:text-lg space-y-2 md:space-y-3 mb-4 md:mb-6 list-disc pl-6 overflow-hidden">
        {children}
      </ul>
    ),
    ol: ({children}: any) => (
      <ol className="text-sm md:text-base lg:text-lg space-y-2 md:space-y-3 mb-4 md:mb-6 list-decimal pl-6 overflow-hidden">
        {children}
      </ol>
    ),
    li: ({children}: any) => (
      <li className="break-words overflow-hidden">
        {children}
      </li>
    ),
    blockquote: ({children}: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 md:pl-8 py-4 italic text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 bg-blue-900/20 rounded-r-lg break-words overflow-hidden">
        {children}
      </blockquote>
    ),
    img: ({src, alt, title}: any) => {
      // タイトル属性からサイズ指定を解析
      let width = 'auto';
      let height = 'auto';
      let maxWidth = '90%';
      let maxHeight = '50vh';
      let displayTitle = title || alt;
      
      if (title) {
        const parts = title.split('|');
        displayTitle = parts[0] || alt;
        
        parts.forEach(({part}: any) => {
          const trimmed = part.trim();
          if (trimmed.startsWith('width:')) {
            width = trimmed.replace('width:', '');
          } else if (trimmed.startsWith('height:')) {
            height = trimmed.replace('height:', '');
          } else if (trimmed.startsWith('maxWidth:')) {
            maxWidth = trimmed.replace('maxWidth:', '');
          } else if (trimmed.startsWith('maxHeight:')) {
            maxHeight = trimmed.replace('maxHeight:', '');
          }
        });
      }
      
      return (
        <div className="flex justify-center items-center w-full overflow-hidden mb-4 md:mb-6">
          <img 
            src={src} 
            alt={alt}
            title={displayTitle}
            className="rounded-lg shadow-lg object-contain"
            style={{
              width,
              height,
              maxWidth,
              maxHeight
            }}
            loading="lazy"
          />
        </div>
      );
    },
    table: ({children}: any) => (
      <div className="overflow-x-auto w-full mb-4 md:mb-6">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm md:text-base">
          {children}
        </table>
      </div>
    ),
    th: ({children}: any) => (
      <th className="border border-gray-300 dark:border-gray-600 px-3 md:px-4 py-2 bg-gray-100 dark:bg-gray-700 font-semibold text-left break-words">
        {children}
      </th>
    ),
    td: ({children}: any) => (
      <td className="border border-gray-300 dark:border-gray-600 px-3 md:px-4 py-2 break-words">
        {children}
      </td>
    ),
    pre: ({children}: any) => (
      <div className="w-full overflow-hidden mb-4 md:mb-6">
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
          {children}
        </pre>
      </div>
    ),
  };

  return (
    <div className={getLayoutClasses(layout, className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

// レイアウト別のCSSクラス
function getLayoutClasses(layout: SlideLayout, baseClassName: string): string {
  const baseClasses = `${baseClassName} w-full h-full overflow-hidden`;
  
  switch (layout) {
    case 'title':
      return `${baseClasses} flex flex-col justify-center items-center text-center px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8`;
    case 'center':
      return `${baseClasses} flex flex-col justify-center items-center text-center px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8`;
    case 'hero':
      return `${baseClasses} flex flex-col justify-center items-center text-center space-y-4 md:space-y-6 px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8`;
    case 'quote':
      return `${baseClasses} flex flex-col justify-center items-center text-center px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8`;
    case 'code':
      return `${baseClasses} flex flex-col justify-center space-y-4 md:space-y-6 px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8`;
    case 'stats':
      return `${baseClasses} flex flex-col justify-center px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8`;
    case 'features':
      return `${baseClasses} flex flex-col space-y-6 md:space-y-8 px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8`;
    case 'timeline':
      return `${baseClasses} flex flex-col space-y-6 md:space-y-8 px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8`;
    case 'team':
      return `${baseClasses} grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8`;
    case 'gallery':
      return `${baseClasses} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-center justify-items-center px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8`;
    case 'split':
      return `${baseClasses} grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8`;
    case 'compare':
      return `${baseClasses} grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8`;
    default:
      return `${baseClasses} flex flex-col justify-start space-y-4 md:space-y-6 px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8 overflow-y-auto`;
  }
}