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
          className="rounded-lg max-w-full overflow-x-auto text-sm"
          customStyle={{
            maxWidth: '100%',
            fontSize: '0.875rem',
            lineHeight: '1.5'
          }}
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
      <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center leading-tight max-w-full break-words">
        {children}
      </h1>
    ),
    h2: ({children}: any) => (
      <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight max-w-full break-words">
        {children}
      </h2>
    ),
    h3: ({children}: any) => (
      <h3 className="text-xl md:text-2xl font-semibold mb-4 leading-tight max-w-full break-words">
        {children}
      </h3>
    ),
    p: ({children}: any) => (
      <p className="text-base md:text-lg mb-6 leading-relaxed max-w-full break-words">
        {children}
      </p>
    ),
    ul: ({children}: any) => (
      <ul className="text-base md:text-lg space-y-3 mb-6 list-disc pl-6 max-w-full">
        {children}
      </ul>
    ),
    ol: ({children}: any) => (
      <ol className="text-base md:text-lg space-y-3 mb-6 list-decimal pl-6 max-w-full">
        {children}
      </ol>
    ),
    li: ({children}: any) => (
      <li className="break-words max-w-full">
        {children}
      </li>
    ),
    blockquote: ({children}: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-8 py-4 italic text-lg md:text-xl mb-8 bg-blue-900/20 rounded-r-lg max-w-full break-words">
        {children}
      </blockquote>
    ),
    img: ({src, alt, title}: any) => {
      // タイトル属性からサイズ指定を解析 (例: "画像説明|width:400px|height:300px")
      let width = 'auto';
      let height = 'auto';
      let maxWidth = '100%';
      let maxHeight = '70vh';
      let displayTitle = title || alt;
      
      if (title) {
        const parts = title.split('|');
        displayTitle = parts[0] || alt;
        
        parts.forEach(part => {
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
        <img 
          src={src} 
          alt={alt}
          title={displayTitle}
          className="rounded-lg shadow-lg mx-auto object-contain"
          style={{
            width,
            height,
            maxWidth,
            maxHeight
          }}
          loading="lazy"
        />
      );
    },
    table: ({children}: any) => (
      <div className="overflow-x-auto max-w-full mb-6">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
          {children}
        </table>
      </div>
    ),
    th: ({children}: any) => (
      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-100 dark:bg-gray-700 font-semibold text-left break-words">
        {children}
      </th>
    ),
    td: ({children}: any) => (
      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 break-words">
        {children}
      </td>
    ),
    pre: ({children}: any) => (
      <pre className="max-w-full overflow-x-auto bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
        {children}
      </pre>
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
          const leftTitle = sections[0].replace(/^### /, '').split('\n')[0];
          const leftContent = sections[0].replace(/^### .*?\n/, '').trim();
          const rightTitle = sections[1].split('\n')[0];
          const rightContent = sections[1].replace(/^.*?\n/, '').trim();
          
          return `### ${leftTitle}

${leftContent}

---split---

### ${rightTitle}

${rightContent}`;
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
          const leftTitle = sections[0].replace(/^### /, '').split('\n')[0];
          const leftContent = sections[0].replace(/^### .*?\n/, '').trim();
          const rightTitle = sections[1].split('\n')[0];
          const rightContent = sections[1].replace(/^.*?\n/, '').trim();
          
          return `### ${leftTitle}

${leftContent}

---compare---

### ${rightTitle}

${rightContent}`;
        }
        return innerContent;
      }
    );
  }

  if (layout === 'stats') {
    return content.replace(
      /::: stats\n([\s\S]*?)\n:::/,
      (match, innerContent) => {
        const sections = innerContent.split(/\n### /);
        let result = '';
        sections.forEach((section, index) => {
          if (section.trim()) {
            const title = section.replace(/^### /, '').split('\n')[0];
            const content = section.replace(/^### .*?\n/, '').trim();
            if (index > 0) result += '\n\n---stat---\n\n';
            result += `### ${title}\n\n${content}`;
          }
        });
        return result;
      }
    );
  }

  if (layout === 'features') {
    return content.replace(
      /::: features\n([\s\S]*?)\n:::/,
      (match, innerContent) => {
        const sections = innerContent.split(/\n### /);
        let result = '';
        sections.forEach((section, index) => {
          if (section.trim()) {
            const title = section.replace(/^### /, '').split('\n')[0];
            const content = section.replace(/^### .*?\n/, '').trim();
            if (index > 0) result += '\n\n---feature---\n\n';
            result += `### ${title}\n\n${content}`;
          }
        });
        return result;
      }
    );
  }

  if (layout === 'quote') {
    return content.replace(
      /::: quote\n([\s\S]*?)\n:::/,
      (match, innerContent) => {
        return innerContent;
      }
    );
  }

  if (layout === 'center') {
    return content.replace(
      /::: center\n([\s\S]*?)\n:::/,
      (match, innerContent) => {
        return innerContent;
      }
    );
  }

  // その他の特殊コンテナも同様に処理
  return content.replace(/::: \w+\n([\s\S]*?)\n:::/g, '$1');
}

// レイアウト別のCSSクラス
function getLayoutClasses(layout: SlideLayout, baseClassName: string): string {
  const baseClasses = `${baseClassName} w-full h-full max-w-full max-h-full px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8 overflow-hidden`;
  
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
    case 'split':
      return `${baseClasses} grid grid-cols-1 md:grid-cols-2 gap-8 items-start`;
    case 'compare':
      return `${baseClasses} grid grid-cols-1 md:grid-cols-2 gap-8 items-start`;
    default:
      return `${baseClasses} flex flex-col justify-start space-y-6 overflow-y-auto`;
  }
}