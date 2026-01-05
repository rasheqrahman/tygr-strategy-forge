import type { CacheEntry } from './types';
import { CACHE_DURATION, SUPABASE_CACHE_DURATION } from './constants';

export class FileCache {
  private cache = new Map<string, CacheEntry>();

  set(key: string, content: string, source: 'supabase' | 'static' = 'supabase'): void {
    const cached: CacheEntry = {
      content,
      timestamp: Date.now(),
      source
    };
    
    this.cache.set(key, cached);
    console.log(`Cached file ${key} from ${source} (${content.length} chars)`);
  }

  get(key: string): string | null {
    const cached = this.cache.get(key);
    
    if (!cached) return null;

    // Use different cache durations based on source
    const cacheDuration = cached.source === 'supabase' ? SUPABASE_CACHE_DURATION : CACHE_DURATION;
    const isExpired = Date.now() - cached.timestamp > cacheDuration;
    
    if (isExpired) {
      console.log(`File cache expired for ${key} (source: ${cached.source})`);
      this.cache.delete(key);
      return null;
    }

    console.log(`File cache hit for ${key} (source: ${cached.source})`);
    return cached.content;
  }

  invalidate(key: string): void {
    this.cache.delete(key);
    console.log(`Invalidated file cache for ${key}`);
  }

  clear(): void {
    this.cache.clear();
    console.log('Cleared file cache');
  }

  size(): number {
    return this.cache.size;
  }

  getMemoryUsage(): number {
    let memoryUsage = 0;
    this.cache.forEach(item => {
      memoryUsage += item.content.length;
    });
    return memoryUsage;
  }
}