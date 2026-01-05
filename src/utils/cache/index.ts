import { MemoryCache } from './MemoryCache';
import { FileCache } from './FileCache';
import { ImageCache } from './ImageCache';
import type { CacheStats, ClearOptions, ContentType } from './types';

class ContentCache {
  private memoryCache = new MemoryCache();
  private fileCache = new FileCache();
  private imageCache = new ImageCache();

  // Enhanced cache for parsed content lists with source tracking
  set(key: string, data: any[], source: 'supabase' | 'static' | 'mixed' = 'mixed'): void {
    this.memoryCache.set(key, data, source);
    
    // Preload images from the cached content
    this.imageCache.preloadImagesFromContent(data);
  }

  get(key: string): any[] | null {
    const data = this.memoryCache.get(key);
    
    if (data) {
      // Preload images when content is retrieved from cache
      this.imageCache.preloadImagesFromContent(data);
    }

    return data;
  }

  // Enhanced file caching with source tracking
  setFile(key: string, content: string, source: 'supabase' | 'static' = 'supabase'): void {
    this.fileCache.set(key, content, source);

    // Extract and preload any images from the content
    this.imageCache.preloadImagesFromText(content);
  }

  getFile(key: string): string | null {
    return this.fileCache.get(key);
  }

  // Enhanced image preloading with better error handling
  preloadImage(url: string): Promise<void> {
    return this.imageCache.preloadImage(url);
  }

  isImageCached(url: string): boolean {
    return this.imageCache.isImageCached(url);
  }

  // Enhanced invalidation with selective clearing
  invalidate(key: string): void {
    this.memoryCache.invalidate(key);
  }

  invalidateFile(key: string): void {
    this.fileCache.invalidate(key);
  }

  invalidateImages(): void {
    this.imageCache.clear();
  }

  // Enhanced cache clearing with options
  clear(options: ClearOptions = {}): void {
    const { content = true, files = true, images = true } = options;
    
    if (content) {
      this.memoryCache.clear();
    }
    
    if (files) {
      this.fileCache.clear();
    }
    
    if (images) {
      this.imageCache.clear();
    }
  }

  // Enhanced cache statistics
  getCacheStats(): CacheStats {
    // Estimate memory usage
    const memoryUsage = this.memoryCache.getMemoryUsage() + this.fileCache.getMemoryUsage();

    return {
      contentCache: this.memoryCache.size(),
      fileCache: this.fileCache.size(),
      imageCache: this.imageCache.size(),
      totalMemoryUsage: `${(memoryUsage / 1024).toFixed(2)} KB`
    };
  }

  // New method to prefetch content for better UX
  async prefetchContent(types: ContentType[]): Promise<void> {
    await this.memoryCache.prefetchContent(types);
  }
}

export const contentCache = new ContentCache();

// Export utility function for manual cache management
export const cacheUtils = {
  clearExpiredCache: () => {
    const stats = contentCache.getCacheStats();
    console.log('Current cache stats:', stats);
    
    // You could add logic here to selectively clear expired items
    // For now, we'll just log the stats
  },
  
  warmupCache: async (types: ContentType[]) => {
    await contentCache.prefetchContent(types);
  }
};

// Export types for external use
export type { CacheStats, ClearOptions, ContentType } from './types';