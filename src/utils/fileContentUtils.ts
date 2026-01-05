
// Re-export all functionality from the split modules for backward compatibility
export type { ContentFile } from './contentParser';
export { 
  parseContentFile, 
  getFrontPageContent 
} from './contentParser';
export { generateContentFrontMatter } from './frontMatterGenerator';
export { 
  loadContentFile, 
  loadAllContentFiles, 
  loadAllContentFilesFromSupabaseOnly,
  loadAllContentFilesFromStaticOnly,
  saveContentFile, 
  deleteContentFile 
} from './contentLoader';
