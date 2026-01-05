
import { ContentFile, parseContentFile, generateContentFrontMatter, saveContentFile, loadContentFile, loadAllContentFilesFromSupabaseOnly, loadAllContentFilesFromStaticOnly, deleteContentFile } from './fileContentUtils';
import { contentCache } from './contentCache';
import { saveMarkdownFileToServer } from './contentLoader';

export interface Page extends ContentFile {
  type: 'service' | 'industry' | 'media';
}

export const parsePage = (filename: string, fileContent: string, type: 'service' | 'industry' | 'media'): Page => {
  const contentFile = parseContentFile(filename, fileContent, type);
  return {
    ...contentFile,
    type
  };
};

export const generateFrontMatter = (page: Partial<Page>): string => {
  return generateContentFrontMatter(page);
};

export const savePage = async (slug: string, content: string, type: 'service' | 'industry' | 'media') => {
  console.log(`Saving ${type} page: ${slug}`);

  // Update the cache immediately with the new content
  const cacheKey = `file_${type}_${slug}`;
  contentCache.setFile(cacheKey, content);
  
  // Invalidate related caches so they refresh
  contentCache.invalidate(`all_${type}`);
  contentCache.invalidate(`all_${type}_supabase_only`);

  // Save to Supabase (if admin) - get token from Supabase auth
  try {
    // Import supabase client to get the current session
    const { supabase } = await import('@/integrations/supabase/client');
    
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.access_token) {
      console.log(`Attempting to save ${slug} to Supabase...`);
      const result = await saveMarkdownFileToServer(slug, type, content, session.access_token);
      if (result.success) {
        console.log(`Successfully saved ${slug} to Supabase`);
      } else {
        console.error(`Failed to save ${slug} to Supabase:`, result.error);
      }
    } else {
      console.log(`No valid session found - content not saved to Supabase`);
    }
  } catch (err: any) {
    console.error(`Failed to save ${type} to Supabase:`, err?.message);
  }
};

export const loadPage = async (slug: string, type: 'service' | 'industry' | 'media'): Promise<string | null> => {
  // Load from the unified content loader (which prioritizes Supabase)
  return await loadContentFile(slug, type);
};

// Function for homepage that only loads from Supabase
export const loadAllPagesFromSupabaseOnly = async (type: 'service' | 'industry' | 'media'): Promise<Page[]> => {
  const allFiles = await loadAllContentFilesFromSupabaseOnly(type);
  return allFiles.map(file => ({ ...file, type }));
};

// New function for homepage that only loads from static files
export const loadAllPagesFromStaticOnly = async (type: 'service' | 'industry' | 'media'): Promise<Page[]> => {
  const allFiles = await loadAllContentFilesFromStaticOnly(type);
  return allFiles.map(file => ({ ...file, type }));
};

export const loadAllPages = async (type: 'service' | 'industry' | 'media'): Promise<Page[]> => {
  // Load from the unified content loader (which prioritizes Supabase)
  const allFiles = await loadAllContentFilesFromSupabaseOnly(type);
  return allFiles.map(file => ({ ...file, type }));
};

export const deletePage = (slug: string, type: 'service' | 'industry' | 'media') => {
  deleteContentFile(slug, type);
  // Invalidate cache when deleting
  contentCache.invalidate(`all_${type}`);
  contentCache.invalidate(`all_${type}_supabase_only`);
  contentCache.invalidateFile(`file_${type}_${slug}`);
};
