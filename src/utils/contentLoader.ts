import { ContentFile, parseContentFile } from './contentParser';
import { contentCache } from './contentCache';
import { supabase } from '@/integrations/supabase/client';

// Add request deduplication to prevent multiple simultaneous requests for the same file
const pendingRequests = new Map<string, Promise<string | null>>();
const pendingIndexRequests = new Map<string, Promise<string[]>>();

export const loadContentFile = async (slug: string, type: 'blog' | 'service' | 'industry' | 'media'): Promise<string | null> => {
  const cacheKey = `file_${type}_${slug}`;
  
  // Check cache first
  const cached = contentCache.getFile(cacheKey);
  if (cached) {
    console.log(`Using cached content for ${slug}`);
    return cached;
  }
  
  // Check if there's already a pending request for this file
  const requestKey = `${type}_${slug}`;
  if (pendingRequests.has(requestKey)) {
    console.log(`Waiting for pending request for ${slug}`);
    return pendingRequests.get(requestKey)!;
  }

  // Create the request promise
  const requestPromise = (async (): Promise<string | null> => {
    try {
      // First try to load from Supabase
      console.log(`Trying to load ${slug} from Supabase...`);
      const { data: supabaseFile, error } = await supabase
        .from('editable_markdown_files')
        .select('content')
        .eq('slug', slug)
        .eq('type', type)
        .maybeSingle();

      if (!error && supabaseFile) {
        console.log(`Successfully loaded ${slug} from Supabase`);
        contentCache.setFile(cacheKey, supabaseFile.content, 'supabase');
        return supabaseFile.content;
      }

      // Fall back to static markdown files if not found in Supabase
      console.log(`Falling back to static file for ${slug}`);
      const response = await fetch(`/content/${type}/${slug}.md`);
      
      if (!response.ok) {
        console.warn(`Content file not found: /content/${type}/${slug}.md (status: ${response.status})`);
        return null;
      }
      
      const text = await response.text();
      console.log(`Successfully loaded content for ${slug} from static file, length: ${text.length}`);
      
      if (!text || text.trim() === '') {
        console.warn(`Content file is empty: /content/${type}/${slug}.md`);
        return null;
      }
      
      // Cache the content with source information
      contentCache.setFile(cacheKey, text, 'static');
      
      return text;
    } catch (error) {
      console.error(`Error loading ${type} file ${slug}:`, error);
      return null;
    } finally {
      // Remove from pending requests
      pendingRequests.delete(requestKey);
    }
  })();

  // Store the pending request
  pendingRequests.set(requestKey, requestPromise);
  
  return requestPromise;
};

// Enhanced Supabase-only loading with better caching
export const loadContentFileFromSupabaseOnly = async (slug: string, type: 'blog' | 'service' | 'industry' | 'media'): Promise<string | null> => {
  const cacheKey = `file_${type}_${slug}_supabase`;
  
  // Check cache first with Supabase-specific key
  const cached = contentCache.getFile(cacheKey);
  if (cached) {
    console.log(`Using cached Supabase content for ${slug}`);
    return cached;
  }
  
  try {
    console.log(`Loading ${slug} from Supabase only...`);
    
    const { data: supabaseFile, error } = await supabase
      .from('editable_markdown_files')
      .select('content')
      .eq('slug', slug)
      .eq('type', type)
      .maybeSingle();

    if (!error && supabaseFile) {
      console.log(`Successfully loaded ${slug} from Supabase, content length: ${supabaseFile.content?.length || 0}`);
      contentCache.setFile(cacheKey, supabaseFile.content, 'supabase');
      return supabaseFile.content;
    }

    if (error) {
      console.error(`Supabase error for ${slug}:`, error);
    }

    console.log(`Content not found in Supabase for ${slug}`);
    return null;
  } catch (error) {
    console.error(`Error loading ${type} file ${slug} from Supabase:`, error);
    return null;
  }
};

// New function for static files only loading (for homepage)
export const loadContentFileFromStaticOnly = async (slug: string, type: 'blog' | 'service' | 'industry' | 'media'): Promise<string | null> => {
  const cacheKey = `file_${type}_${slug}_static`;
  
  // Check cache first
  const cached = contentCache.getFile(cacheKey);
  if (cached) {
    console.log(`Using cached static content for ${slug}`);
    return cached;
  }
  
  try {
    console.log(`Loading ${slug} from static files only...`);
    console.log(`Fetching content file: /content/${type}/${slug}.md`);
    const response = await fetch(`/content/${type}/${slug}.md`);
    
    if (!response.ok) {
      console.warn(`Static content file not found: /content/${type}/${slug}.md (status: ${response.status})`);
      return null;
    }
    
    const text = await response.text();
    console.log(`Successfully loaded content for ${slug} from static file, length: ${text.length}`);
    
    if (!text || text.trim() === '') {
      console.warn(`Static content file is empty: /content/${type}/${slug}.md`);
      return null;
    }
    
    // Cache the content
    contentCache.setFile(cacheKey, text);
    
    return text;
  } catch (error) {
    console.error(`Error loading ${type} file ${slug} from static files:`, error);
    return null;
  }
};

const loadFileList = async (type: 'blog' | 'service' | 'industry' | 'media'): Promise<string[]> => {
  // Check if there's already a pending request for this index
  if (pendingIndexRequests.has(type)) {
    console.log(`Waiting for pending index request for ${type}`);
    return pendingIndexRequests.get(type)!;
  }

  const requestPromise = (async (): Promise<string[]> => {
    try {
      // First get all files from Supabase
      console.log(`Loading ${type} files from Supabase...`);
      const { data: supabaseFiles, error } = await supabase
        .from('editable_markdown_files')
        .select('slug')
        .eq('type', type);

      const supabaseSlugs = supabaseFiles?.map(file => `${file.slug}.md`) || [];
      
      // Then get files from static index
      console.log(`Loading ${type} index from static files...`);
      const indexResponse = await fetch(`/content/${type}/index.json`);
      let staticFiles: string[] = [];
      
      if (indexResponse.ok) {
        staticFiles = await indexResponse.json();
      }
      
      // Combine and deduplicate (Supabase takes priority)
      const allFiles = [...new Set([...supabaseSlugs, ...staticFiles])];
      console.log(`Found ${allFiles.length} ${type} files total (${supabaseSlugs.length} from Supabase, ${staticFiles.length} from static)`);
      return allFiles;
    } catch (error) {
      console.error(`Error loading ${type} index:`, error);
      // Fall back to static files only
      try {
        const indexResponse = await fetch(`/content/${type}/index.json`);
        if (indexResponse.ok) {
          return await indexResponse.json();
        }
      } catch (fallbackError) {
        console.error(`Error loading static ${type} index:`, fallbackError);
      }
      return [];
    } finally {
      // Remove from pending requests
      pendingIndexRequests.delete(type);
    }
  })();

  // Store the pending request
  pendingIndexRequests.set(type, requestPromise);
  
  return requestPromise;
};

// Enhanced Supabase-only file list loading with better caching
const loadFileListFromSupabaseOnly = async (type: 'blog' | 'service' | 'industry' | 'media'): Promise<string[]> => {
  const cacheKey = `filelist_${type}_supabase`;
  
  try {
    console.log(`Loading ${type} files from Supabase only...`);
    
    const { data: supabaseFiles, error } = await supabase
      .from('editable_markdown_files')
      .select('slug')
      .eq('type', type);

    if (error) {
      console.error(`Error loading ${type} files from Supabase:`, error);
      return [];
    }

    const supabaseSlugs = supabaseFiles?.map(file => `${file.slug}.md`) || [];
    console.log(`Found ${supabaseSlugs.length} ${type} files in Supabase`);
    
    return supabaseSlugs;
  } catch (error) {
    console.error(`Error loading ${type} index from Supabase:`, error);
    return [];
  }
};

// New function for static files only list loading (for homepage)
const loadFileListFromStaticOnly = async (type: 'blog' | 'service' | 'industry' | 'media'): Promise<string[]> => {
  try {
    console.log(`Loading ${type} files from static files only...`);
    const indexResponse = await fetch(`/content/${type}/index.json`);
    
    if (!indexResponse.ok) {
      console.warn(`Static index file not found: /content/${type}/index.json (status: ${indexResponse.status})`);
      return [];
    }
    
    const staticFiles = await indexResponse.json();
    console.log(`Found ${staticFiles.length} ${type} files in static index`);
    return staticFiles;
  } catch (error) {
    console.error(`Error loading ${type} index from static files:`, error);
    return [];
  }
};

export const loadAllContentFiles = async (type: 'blog' | 'service' | 'industry' | 'media'): Promise<ContentFile[]> => {
  const cacheKey = `all_${type}`;
  
  // Check cache first
  const cached = contentCache.get(cacheKey);
  if (cached) {
    console.log(`Using cached ${type} files (${cached.length} items)`);
    return cached;
  }
  
  try {
    const fileList = await loadFileList(type);
    const files: ContentFile[] = [];
    
    // Load files in parallel for better performance
    const filePromises = fileList.map(async (filename) => {
      try {
        const slug = filename.replace('.md', '');
        const content = await loadContentFile(slug, type);
        if (content) {
          const parsed = parseContentFile(filename, content, type);
          console.log(`Successfully parsed ${type} file: ${slug}`);
          return parsed;
        } else {
          console.warn(`Failed to load content for ${slug}`);
          return null;
        }
      } catch (error) {
        console.error(`Error parsing ${type} file ${filename}:`, error);
        return null;
      }
    });

    const results = await Promise.all(filePromises);
    files.push(...results.filter(file => file !== null));
    
    const sortedFiles = files.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Cache the results with mixed source (since it could be from both Supabase and static)
    contentCache.set(cacheKey, sortedFiles, 'mixed');
    
    return sortedFiles;
  } catch (error) {
    console.error(`Error loading ${type} files:`, error);
    return [];
  }
};

// Enhanced Supabase-only content loading with aggressive caching
export const loadAllContentFilesFromSupabaseOnly = async (type: 'blog' | 'service' | 'industry' | 'media'): Promise<ContentFile[]> => {
  const cacheKey = `all_${type}_supabase_only`;
  
  // Check cache first
  const cached = contentCache.get(cacheKey);
  if (cached) {
    console.log(`Using cached ${type} files from Supabase (${cached.length} items)`);
    return cached;
  }
  
  try {
    console.log(`Loading all ${type} files from Supabase only...`);
    const fileList = await loadFileListFromSupabaseOnly(type);
    const files: ContentFile[] = [];
    
    // Load files in parallel for better performance
    const filePromises = fileList.map(async (filename) => {
      try {
        const slug = filename.replace('.md', '');
        const content = await loadContentFileFromSupabaseOnly(slug, type);
        if (content) {
          const parsed = parseContentFile(filename, content, type);
          console.log(`Successfully parsed ${type} file from Supabase: ${slug}`);
          return parsed;
        } else {
          console.warn(`Failed to load content for ${slug} from Supabase`);
          return null;
        }
      } catch (error) {
        console.error(`Error parsing ${type} file ${filename}:`, error);
        return null;
      }
    });

    const results = await Promise.all(filePromises);
    files.push(...results.filter(file => file !== null));
    
    const sortedFiles = files.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Cache the results with Supabase source for longer caching
    contentCache.set(cacheKey, sortedFiles, 'supabase');
    console.log(`Cached ${sortedFiles.length} ${type} files from Supabase`);
    
    return sortedFiles;
  } catch (error) {
    console.error(`Error loading ${type} files from Supabase only:`, error);
    return [];
  }
};

// New function for static files only content loading (for homepage)
export const loadAllContentFilesFromStaticOnly = async (type: 'blog' | 'service' | 'industry' | 'media'): Promise<ContentFile[]> => {
  const cacheKey = `all_${type}_static_only`;
  
  // Check cache first
  const cached = contentCache.get(cacheKey);
  if (cached) {
    console.log(`Using cached ${type} files (static only)`);
    return cached;
  }
  
  try {
    const fileList = await loadFileListFromStaticOnly(type);
    const files: ContentFile[] = [];
    
    // Load files in parallel for better performance
    const filePromises = fileList.map(async (filename) => {
      try {
        const slug = filename.replace('.md', '');
        const content = await loadContentFileFromStaticOnly(slug, type);
        if (content) {
          const parsed = parseContentFile(filename, content, type);
          console.log(`Successfully parsed ${type} file from static: ${slug}`);
          return parsed;
        } else {
          console.warn(`Failed to load content for ${slug} from static files`);
          return null;
        }
      } catch (error) {
        console.error(`Error parsing ${type} file ${filename}:`, error);
        return null;
      }
    });

    const results = await Promise.all(filePromises);
    files.push(...results.filter(file => file !== null));
    
    const sortedFiles = files.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Cache the results
    contentCache.set(cacheKey, sortedFiles);
    
    return sortedFiles;
  } catch (error) {
    console.error(`Error loading ${type} files from static only:`, error);
    return [];
  }
};

// Updated save function without localStorage
export const saveContentFile = async (slug: string, content: string, type: 'blog' | 'service' | 'industry' | 'media') => {
  console.log(`Saving ${type} content for ${slug} - updating cache`);
  
  // Update the cache immediately with the new content
  const cacheKey = `file_${type}_${slug}`;
  contentCache.setFile(cacheKey, content);
  
  // Invalidate related caches so they refresh
  contentCache.invalidate(`all_${type}`);
  contentCache.invalidate(`all_${type}_supabase_only`);
  
  console.log(`Content for ${slug} has been updated in cache`);
};

/**
 * Save markdown file to Supabase server via edge function.
 * Only admins can call this endpoint successfully.
 */
export const saveMarkdownFileToServer = async (
  slug: string,
  type: 'blog' | 'service' | 'industry' | 'media',
  content: string,
  jwt?: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch(
      `http://72.60.172.1:8000/functions/v1/save-markdown-file`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(jwt ? { "Authorization": `Bearer ${jwt}` } : {})
        },
        body: JSON.stringify({ slug, type, content }),
      }
    );
    if (!response.ok) {
      const data = await response.json();
      return { success: false, error: data.error || response.statusText };
    }
    return { success: true };
  } catch (e: any) {
    console.error("[saveMarkdownFileToServer] Error:", e);
    return { success: false, error: e.message };
  }
};

export const deleteContentFile = (slug: string, type: 'blog' | 'service' | 'industry' | 'media') => {
  console.log(`Deleting ${type} content for ${slug}`);
  
  // Invalidate related caches
  contentCache.invalidateFile(`file_${type}_${slug}`);
  contentCache.invalidate(`all_${type}`);
  contentCache.invalidate(`all_${type}_supabase_only`);
};
