import React, { useState, useRef, useEffect } from 'react';
import { PresentationData, SlideLayout } from '../types/presentation';
import { parseMarkdown, layoutTemplates } from '../utils/markdownParser';
import { SlideRenderer } from './SlideRenderer';
import { Play, Pause, FileText, Layout, Image, Quote, Code, BarChart3, Users, Baseline as Timeline, Grid3x3, Maximize2, Minimize2, ChevronLeft, ChevronRight, Download, Upload, Sun, Moon } from 'lucide-react';

interface SlideEditorProps {
  initialMarkdown?: string;
}

export const SlideEditor: React.FC<SlideEditorProps> = ({ initialMarkdown = '' }) => {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [presentation, setPresentation] = useState<PresentationData>(() => 
    parseMarkdown(initialMarkdown)
  );
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [backgroundColor, setBackgroundColor] = useState('#1f2937');
  const [showLayoutPanel, setShowLayoutPanel] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Markdownの変更時にプレゼンテーションデータを更新
  useEffect(() => {
    const newPresentation = parseMarkdown(markdown);
    setPresentation(newPresentation);
    
    // テーマがメタデータで指定されている場合は適用
    if (newPresentation.metadata.theme) {
      setTheme(newPresentation.metadata.theme);
    }
  }, [markdown]);

  // キーボードショートカット
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPresentationMode) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
          e.preventDefault();
          nextSlide();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevSlide();
        } else if (e.key === 'Escape') {
          setIsPresentationMode(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPresentationMode, currentSlideIndex, presentation.slides.length]);

  const nextSlide = () => {
    if (currentSlideIndex < presentation.slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const insertLayout = (layout: SlideLayout) => {
    const template = layoutTemplates[layout];
    const newContent = markdown + (markdown ? '\n\n---\n\n' : '') + template;
    setMarkdown(newContent);
    setShowLayoutPanel(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/markdown') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setMarkdown(content);
      };
      reader.readAsText(file);
    }
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'presentation.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentSlide = presentation.slides[currentSlideIndex];

  const layoutIcons: Record<SlideLayout, React.ReactNode> = {
    title: <FileText className="w-4 h-4" />,
    content: <FileText className="w-4 h-4" />,
    section: <FileText className="w-4 h-4" />,
    split: <Layout className="w-4 h-4" />,
    compare: <BarChart3 className="w-4 h-4" />,
    gallery: <Grid3x3 className="w-4 h-4" />,
    quote: <Quote className="w-4 h-4" />,
    timeline: <Timeline className="w-4 h-4" />,
    features: <Grid3x3 className="w-4 h-4" />,
    stats: <BarChart3 className="w-4 h-4" />,
    team: <Users className="w-4 h-4" />,
    hero: <Image className="w-4 h-4" />,
    code: <Code className="w-4 h-4" />,
    center: <Layout className="w-4 h-4" />
  };

  if (isPresentationMode) {
    return (
      <div className="min-h-screen dark text-white" style={{ backgroundColor }}>
        <div className="h-screen flex flex-col">
          {/* プレゼンテーション用ツールバー */}
          <div className="absolute top-4 right-4 z-50 flex space-x-2">
            <button
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className="p-2 bg-black/20 hover:bg-black/40 text-white rounded-full disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="px-3 py-2 bg-black/20 text-white rounded-full text-sm">
              {currentSlideIndex + 1} / {presentation.slides.length}
            </span>
            <button
              onClick={nextSlide}
              disabled={currentSlideIndex === presentation.slides.length - 1}
              className="p-2 bg-black/20 hover:bg-black/40 text-white rounded-full disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsPresentationMode(false)}
              className="p-2 bg-black/20 hover:bg-black/40 text-white rounded-full"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>

          {/* スライド表示 */}
          <div className="flex-1 flex items-center justify-center p-8">
            {currentSlide && (
              <div className="w-full max-w-7xl">
                <SlideRenderer
                  content={currentSlide.content}
                  layout={currentSlide.layout}
                  theme={theme}
                  className="h-full px-12 py-8"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark bg-gray-900 text-white">
      {/* ヘッダー */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">Markdown プレゼンテーションツール</h1>
            {presentation.metadata.title && (
              <span className="text-sm text-gray-400">
                - {presentation.metadata.title}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {/* 背景色選択 */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-300">背景色:</label>
              <div className="flex space-x-1">
                {[
                  { name: 'ダークグレー', color: '#1f2937' },
                  { name: 'ブラック', color: '#000000' },
                  { name: 'ダークブルー', color: '#1e3a8a' },
                  { name: 'ダークグリーン', color: '#166534' },
                  { name: 'ダークパープル', color: '#581c87' }
                ].map((bg) => (
                  <button
                    key={bg.color}
                    onClick={() => setBackgroundColor(bg.color)}
                    className={`w-6 h-6 rounded border-2 ${backgroundColor === bg.color ? 'border-white' : 'border-gray-600'}`}
                    style={{ backgroundColor: bg.color }}
                    title={bg.name}
                  />
                ))}
              </div>
            </div>

            {/* テーマ切り替え（隠す） */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 hover:bg-gray-700 rounded-lg hidden"
            >
              <Sun className="w-5 h-5" />
            </button>

            {/* ファイル操作 */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-gray-700 rounded-lg"
              title="ファイルを開く"
            >
              <Upload className="w-5 h-5" />
            </button>
            <button
              onClick={downloadMarkdown}
              className="p-2 hover:bg-gray-700 rounded-lg"
              title="ダウンロード"
            >
              <Download className="w-5 h-5" />
            </button>

            {/* レイアウトパネル */}
            <button
              onClick={() => setShowLayoutPanel(!showLayoutPanel)}
              className="p-2 hover:bg-gray-700 rounded-lg"
              title="レイアウト挿入"
            >
              <Layout className="w-5 h-5" />
            </button>

            {/* プレゼンテーション開始 */}
            <button
              onClick={() => setIsPresentationMode(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>プレゼン開始</span>
            </button>
          </div>
        </div>

        {/* レイアウトパネル */}
        {showLayoutPanel && (
          <div className="mt-4 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-sm font-medium mb-3">レイアウトを挿入</h3>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
              {Object.entries(layoutTemplates).map(([layout, _]) => (
                <button
                  key={layout}
                  onClick={() => insertLayout(layout as SlideLayout)}
                  className="p-3 bg-gray-600 hover:bg-gray-500 rounded-lg flex flex-col items-center space-y-1 text-xs"
                  title={layout}
                >
                  {layoutIcons[layout as SlideLayout]}
                  <span className="capitalize">{layout}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* メインコンテンツ */}
      <div className="flex flex-col h-[calc(100vh-80px)]">
        {/* エディター部分（上半分） */}
        <div className="h-1/2 flex flex-col border-b border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-sm font-medium">エディター</h2>
          </div>
          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="flex-1 p-4 bg-gray-800 border-none outline-none resize-none font-mono text-sm leading-relaxed text-gray-100"
            placeholder="ここにMarkdownを入力してください..."
            spellCheck={false}
          />
        </div>

        {/* プレビュー部分（下半分） */}
        <div className="h-1/2 flex flex-col">
          {/* スライドナビゲーション */}
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-sm font-medium">プレビュー</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={prevSlide}
                disabled={currentSlideIndex === 0}
                className="p-1 hover:bg-gray-700 rounded disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm px-2 py-1 bg-gray-700 rounded">
                {currentSlideIndex + 1} / {presentation.slides.length}
              </span>
              <button
                onClick={nextSlide}
                disabled={currentSlideIndex === presentation.slides.length - 1}
                className="p-1 hover:bg-gray-700 rounded disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* スライドプレビュー */}
          <div className="flex-1 relative overflow-hidden" style={{ backgroundColor }}>
            <div className="w-full h-full p-4">
              {currentSlide ? (
                <SlideRenderer
                  content={currentSlide.content}
                  layout={currentSlide.layout}
                  theme={theme}
                  className="w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  スライドがありません
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 隠しファイル入力 */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.markdown"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};