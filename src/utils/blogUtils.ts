
import { ContentFile, parseContentFile, generateContentFrontMatter, saveContentFile, loadContentFile, loadAllContentFilesFromSupabaseOnly, deleteContentFile } from './fileContentUtils';
import { contentCache } from './contentCache';
import { saveMarkdownFileToServer } from './contentLoader';

export interface BlogPost extends ContentFile {
  type: 'blog';
}

export const parseBlogPost = (filename: string, fileContent: string): BlogPost => {
  const contentFile = parseContentFile(filename, fileContent, 'blog');
  return {
    ...contentFile,
    type: 'blog'
  };
};

export const generateFrontMatter = (post: Partial<BlogPost>): string => {
  return generateContentFrontMatter(post);
};

export const saveBlogPost = async (slug: string, content: string) => {
  console.log(`Saving blog post: ${slug}`);

  // Update the cache immediately with the new content
  const cacheKey = `file_blog_${slug}`;
  contentCache.setFile(cacheKey, content);
  
  // Invalidate related caches so they refresh
  contentCache.invalidate(`all_blog`);
  contentCache.invalidate(`all_blog_supabase_only`);

  // Save to Supabase (if admin) - get token from Supabase auth
  try {
    // Import supabase client to get the current session
    const { supabase } = await import('@/integrations/supabase/client');
    
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.access_token) {
      console.log(`Attempting to save ${slug} to Supabase...`);
      const result = await saveMarkdownFileToServer(slug, "blog", content, session.access_token);
      if (result.success) {
        console.log(`Successfully saved ${slug} to Supabase`);
      } else {
        console.error(`Failed to save ${slug} to Supabase:`, result.error);
      }
    } else {
      console.log(`No valid session found - content not saved to Supabase`);
    }
  } catch (err: any) {
    console.error("Failed to save blog to Supabase:", err?.message);
  }
};

export const loadBlogPost = async (slug: string): Promise<string | null> => {
  // Load from the unified content loader (which prioritizes Supabase)
  return await loadContentFile(slug, 'blog');
};

// New function for homepage that only loads from Supabase
export const loadAllBlogPostsFromSupabaseOnly = async (): Promise<BlogPost[]> => {
  const allFiles = await loadAllContentFilesFromSupabaseOnly('blog');
  return allFiles.map(file => ({ ...file, type: 'blog' as const }));
};

export const loadAllBlogPosts = async (): Promise<BlogPost[]> => {
  // Load from the unified content loader (which prioritizes Supabase)
  const allFiles = await loadAllContentFilesFromSupabaseOnly('blog');
  return allFiles.map(file => ({ ...file, type: 'blog' as const }));
};

export const deleteBlogPost = (slug: string) => {
  deleteContentFile(slug, 'blog');
  // Invalidate cache when deleting
  contentCache.invalidate(`all_blog`);
  contentCache.invalidate(`all_blog_supabase_only`);
  contentCache.invalidateFile(`file_blog_${slug}`);
};
