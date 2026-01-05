import type { ImageCache as ImageCacheEntry } from './types';
import { IMAGE_CACHE_DURATION } from './constants';

export class ImageCache {
  private cache = new Map<string, ImageCacheEntry>();

  // Enhanced image preloading with better error handling
  preloadImage(url: string): Promise<void> {
    if (!url || this.isImageCached(url)) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const img = new Image();
      const timeout = setTimeout(() => {
        console.warn(`Image preload timeout: ${url}`);
        resolve();
      }, 10000); // 10 second timeout

      img.onload = () => {
        clearTimeout(timeout);
        this.cache.set(url, {
          url,
          timestamp: Date.now(),
          loaded: true
        });
        console.log(`Image preloaded: ${url}`);
        resolve();
      };
      
      img.onerror = () => {
        clearTimeout(timeout);
        console.warn(`Failed to preload image: ${url}`);
        resolve();
      };
      
      img.src = url;
    });
  }

  isImageCached(url: string): boolean {
    const cached = this.cache.get(url);
    if (!cached) return false;

    const isExpired = Date.now() - cached.timestamp > IMAGE_CACHE_DURATION;
    if (isExpired) {
      this.cache.delete(url);
      return false;
    }

    return cached.loaded;
  }

  preloadImagesFromContent(data: any[]): void {
    // Batch preload images to avoid overwhelming the browser
    const imageUrls: string[] = [];
    
    data.forEach(item => {
      if (item.image && typeof item.image === 'string') {
        imageUrls.push(item.image);
      }
    });

    // Preload images in batches of 3
    const batchSize = 3;
    for (let i = 0; i < imageUrls.length; i += batchSize) {
      const batch = imageUrls.slice(i, i + batchSize);
      setTimeout(() => {
        batch.forEach(url => this.preloadImage(url));
      }, i * 100); // Stagger batches by 100ms
    }
  }

  preloadImagesFromText(content: string): void {
    // Extract image URLs from markdown content
    const imageRegex = /!\[.*?\]\((.*?)\)|image:\s*["']([^"']*?)["']/g;
    let match;
    
    while ((match = imageRegex.exec(content)) !== null) {
      const imageUrl = match[1] || match[2];
      if (imageUrl && imageUrl.startsWith('http')) {
        this.preloadImage(imageUrl);
      }
    }
  }

  clear(): void {
    this.cache.clear();
    console.log('Cleared all image cache');
  }

  size(): number {
    return this.cache.size;
  }
}