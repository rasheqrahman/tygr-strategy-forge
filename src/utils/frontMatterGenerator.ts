
import { ContentFile } from './contentParser';

export const generateContentFrontMatter = (contentFile: Partial<ContentFile>): string => {
  console.log('=== GENERATING FRONT MATTER ===');
  console.log('Input frontPageContent:', contentFile.frontPageContent);
  console.log('Input frontPageContent length:', contentFile.frontPageContent?.length || 0);
  
  const frontMatter = {
    title: contentFile.title || '',
    excerpt: contentFile.excerpt || '',
    published: contentFile.published !== false,
    date: contentFile.date || new Date().toISOString().split('T')[0],
    ...(contentFile.icon && { icon: contentFile.icon }),
    ...(contentFile.image && { image: contentFile.image }),
    ...(contentFile.frontPageContent && contentFile.frontPageContent.trim() && { frontPageContent: contentFile.frontPageContent }),
    ...(contentFile.tags && contentFile.tags.length > 0 && { tags: contentFile.tags })
  };

  console.log('Front matter object:', frontMatter);
  console.log('Has frontPageContent in object:', 'frontPageContent' in frontMatter);

  const yamlContent = Object.entries(frontMatter)
    .map(([key, value]) => {
      if (key === 'tags' && Array.isArray(value)) {
        return `${key}: ${JSON.stringify(value)}`;
      }
      if (key === 'frontPageContent' && typeof value === 'string') {
        // Handle multi-line frontPageContent by properly quoting it
        const escapedValue = value.replace(/"/g, '\\"');
        return `${key}: "${escapedValue}"`;
      }
      return `${key}: ${typeof value === 'string' ? `"${value}"` : value}`;
    })
    .join('\n');

  const result = `---\n${yamlContent}\n---\n\n${contentFile.content || ''}`;
  
  console.log('Generated YAML includes frontPageContent:', result.includes('frontPageContent:'));
  console.log('Final result preview:', result.substring(0, 300));
  
  return result;
};
