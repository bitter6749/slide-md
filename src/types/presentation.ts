export interface SlideMetadata {
  title?: string;
  author?: string;
  theme?: 'light' | 'dark';
  date?: string;
}

export interface Slide {
  id: string;
  content: string;
  layout: SlideLayout;
  index: number;
}

export type SlideLayout = 
  | 'title'
  | 'content' 
  | 'section'
  | 'split'
  | 'compare'
  | 'gallery'
  | 'quote'
  | 'timeline'
  | 'features'
  | 'stats'
  | 'team'
  | 'hero'
  | 'code'
  | 'center'
  | 'image';

export interface PresentationData {
  metadata: SlideMetadata;
  slides: Slide[];
}

export interface EditorState {
  currentSlideIndex: number;
  isFullscreen: boolean;
  isEditing: boolean;
  zoom: number;
}