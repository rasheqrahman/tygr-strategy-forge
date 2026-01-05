import type { CachedContent, ContentType } from './types';
import { CACHE_DURATION, SUPABASE_CACHE_DURATION, CACHE_VERSION } from './constants';

export class MemoryCache {
  private cache = new Map<string, CachedContent>();

  set(key: string, data: any[], source: 'supabase' | 'static' | 'mixed' = 'mixed'): void {
    const cached: CachedContent = {
      data,
      timestamp: Date.now(),
      version: CACHE_VERSION,
      source
    };
    
    this.cache.set(key, cached);
    
    // Store in localStorage with source information
    try {
      localStorage.setItem(`content_cache_${key}`, JSON.stringify(cached));
      console.log(`Cached ${data.length} items for ${key} from ${source}`);
    } catch (error) {
      console.warn('Failed to store cache in localStorage:', error);
    }
  }

  get(key: string): any[] | null {
    // Check memory cache first
    let cached = this.cache.get(key);
    
    // If not in memory, try localStorage
    if (!cached) {
      try {
        const stored = localStorage.getItem(`content_cache_${key}`);
        if (stored) {
          cached = JSON.parse(stored);
          if (cached) {
            this.cache.set(key, cached);
          }
        }
      } catch (error) {
        console.warn('Failed to load cache from localStorage:', error);
        return null;
      }
    }

    if (!cached) return null;

    // Use different cache durations based on source
    const cacheDuration = cached.source === 'supabase' ? SUPABASE_CACHE_DURATION : CACHE_DURATION;
    const isExpired = Date.now() - cached.timestamp > cacheDuration;
    const isOldVersion = cached.version !== CACHE_VERSION;
    
    if (isExpired || isOldVersion) {
      console.log(`Cache expired for ${key} (source: ${cached.source}, age: ${Date.now() - cached.timestamp}ms)`);
      this.invalidate(key);
      return null;
    }

    console.log(`Cache hit for ${key} (source: ${cached.source}, ${cached.data.length} items)`);
    return cached.data;
  }

  invalidate(key: string): void {
    this.cache.delete(key);
    try {
      localStorage.removeItem(`content_cache_${key}`);
      console.log(`Invalidated cache for ${key}`);
    } catch (error) {
      console.warn('Failed to remove cache from localStorage:', error);
    }
  }

  clear(): void {
    this.cache.clear();
    console.log('Cleared content cache');
    
    // Clear localStorage cache entries
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('content_cache_')) {
          localStorage.removeItem(key);
        }
      });
      console.log('Cleared localStorage content cache');
    } catch (error) {
      console.warn('Failed to clear localStorage cache:', error);
    }
  }

  size(): number {
    return this.cache.size;
  }

  getMemoryUsage(): number {
    let memoryUsage = 0;
    this.cache.forEach(item => {
      memoryUsage += JSON.stringify(item).length;
    });
    return memoryUsage;
  }

  // New method to prefetch content for better UX
  async prefetchContent(types: ContentType[]): Promise<void> {
    console.log('Prefetching content for types:', types);
    
    // This would integrate with your content loading functions
    // Implementation would depend on your specific needs
    for (const type of types) {
      const cacheKey = `all_${type}_supabase_only`;
      if (!this.get(cacheKey)) {
        console.log(`Content for ${type} not cached, would benefit from prefetching`);
      }
    }
  }
}