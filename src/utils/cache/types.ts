export interface CachedContent {
  data: any[];
  timestamp: number;
  version: string;
  source: 'supabase' | 'static' | 'mixed';
}

export interface CacheEntry {
  content: string;
  timestamp: number;
  source: 'supabase' | 'static';
}

export interface ImageCache {
  url: string;
  timestamp: number;
  loaded: boolean;
}

export interface CacheStats {
  contentCache: number;
  fileCache: number;
  imageCache: number;
  totalMemoryUsage: string;
}

export interface ClearOptions {
  content?: boolean;
  files?: boolean;
  images?: boolean;
}

export type ContentType = 'blog' | 'service' | 'industry' | 'media';