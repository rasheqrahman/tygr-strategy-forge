
import matter from 'gray-matter';

// Simple Buffer polyfill for gray-matter compatibility
if (typeof global === 'undefined') {
  (window as any).global = window;
}
if (typeof Buffer === 'undefined') {
  (window as any).Buffer = {
    isBuffer: (obj: any) => false,
    from: (str: string, encoding?: string) => {
      return new TextEncoder().encode(str);
    }
  };
}

export interface ContentFile {
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  published: boolean;
  date: string;
  icon?: string;
  image?: string;
  frontPageContent?: string;
  tags?: string[];
  type: 'blog' | 'service' | 'industry' | 'media';
}

const formatTitleFromSlug = (slug: string): string => {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
};

export const parseContentFile = (filename: string, fileContent: string, type: 'blog' | 'service' | 'industry' | 'media'): ContentFile => {
  try {
    // Handle potential Buffer issues by ensuring we have a string
    const contentString = typeof fileContent === 'string' ? fileContent : String(fileContent);
    
    // Check if content is empty or null
    if (!contentString || contentString.trim() === '') {
      throw new Error('Content is empty');
    }
    
    console.log(`=== DEBUGGING ${filename} ===`);
    console.log('Raw content length:', contentString.length);
    console.log('First 100 characters:', contentString.substring(0, 100));
    
    // Trim the content to handle leading whitespace
    const trimmedContent = contentString.trim();
    console.log('Trimmed content starts with ---?', trimmedContent.startsWith('---'));
    
    const slug = filename.replace(/\.md$/, '');
    
    // Enhanced manual parsing with better debugging and multi-line support
    if (trimmedContent.startsWith('---')) {
      const lines = trimmedContent.split('\n');
      console.log('Total lines:', lines.length);
      console.log('First 5 lines:', lines.slice(0, 5));
      
      let frontMatterEndIndex = -1;
      
      // Start from line 1 (skip the opening ---)
      for (let i = 1; i < lines.length; i++) {
        console.log(`Line ${i}: "${lines[i].trim()}"`);
        if (lines[i].trim() === '---') {
          frontMatterEndIndex = i;
          console.log(`Found front matter end at line ${i}`);
          break;
        }
      }
      
      if (frontMatterEndIndex > 0) {
        // Extract front matter lines (between the --- delimiters)
        const frontMatterLines = lines.slice(1, frontMatterEndIndex);
        console.log('Front matter lines:', frontMatterLines);
        
        // Extract content (everything after the closing ---)
        const contentLines = lines.slice(frontMatterEndIndex + 1);
        const cleanContent = contentLines.join('\n').trim();
        
        console.log(`Content starts from line ${frontMatterEndIndex + 1}`);
        console.log(`Clean content length: ${cleanContent.length}`);
        console.log('First 100 chars of clean content:', cleanContent.substring(0, 100));
        
        // Parse front matter with multi-line support
        const frontMatter: any = {};
        let i = 0;
        while (i < frontMatterLines.length) {
          const line = frontMatterLines[i];
          console.log(`Parsing front matter line ${i}: "${line}"`);
          
          if (line.trim() && line.includes(':')) {
            const colonIndex = line.indexOf(':');
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();
            
            // Handle array values (tags)
            if (value.startsWith('[') && value.endsWith(']')) {
              try {
                frontMatter[key] = JSON.parse(value);
              } catch {
                // If JSON parsing fails, treat as comma-separated string
                const cleanValue = value.slice(1, -1).replace(/"/g, '');
                frontMatter[key] = cleanValue.split(',').map(tag => tag.trim()).filter(tag => tag);
              }
            } else if (value.startsWith('"') && !value.endsWith('"')) {
              // Multi-line quoted value - collect all lines until we find the closing quote
              let multiLineValue = value.substring(1); // Remove opening quote
              i++;
              
              while (i < frontMatterLines.length) {
                const nextLine = frontMatterLines[i];
                if (nextLine.trim().endsWith('"')) {
                  // Found the closing quote
                  multiLineValue += '\n' + nextLine.trim().slice(0, -1); // Remove closing quote
                  break;
                } else {
                  multiLineValue += '\n' + nextLine.trim();
                }
                i++;
              }
              
              frontMatter[key] = multiLineValue;
              console.log(`Parsed multi-line: ${key} = ${frontMatter[key]}`);
            } else {
              // Single line value
              // Remove quotes if present
              if ((value.startsWith('"') && value.endsWith('"')) || 
                  (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
              }
              
              // Parse boolean values
              if (value === 'true') {
                frontMatter[key] = true;
              } else if (value === 'false') {
                frontMatter[key] = false;
              } else if (value === '') {
                frontMatter[key] = '';
              } else {
                frontMatter[key] = value;
              }
              
              console.log(`Parsed: ${key} = ${frontMatter[key]}`);
            }
          }
          i++;
        }
        
        console.log(`Final parsed front matter:`, frontMatter);
        console.log(`Final clean content (first 200 chars):`, cleanContent.substring(0, 200));
        
        // Use the title from front matter or format it from slug
        const title = frontMatter.title && frontMatter.title.trim() !== '' 
          ? frontMatter.title 
          : formatTitleFromSlug(slug);
        
        return {
          slug,
          title,
          excerpt: frontMatter.excerpt || '',
          content: cleanContent,
          published: frontMatter.published !== false,
          date: frontMatter.date || new Date().toISOString().split('T')[0],
          icon: frontMatter.icon || '',
          image: frontMatter.image || '',
          frontPageContent: frontMatter.frontPageContent || '',
          tags: frontMatter.tags || [],
          type
        };
      } else {
        console.log('No closing --- found');
      }
    } else {
      console.log('Content does not start with ---');
    }
    
    // If no front matter found, use the entire content and format title from slug
    console.log(`No front matter found in ${filename}, using entire content`);
    return {
      slug,
      title: formatTitleFromSlug(slug),
      excerpt: '',
      content: trimmedContent,
      published: true,
      date: new Date().toISOString().split('T')[0],
      icon: '',
      image: '',
      frontPageContent: '',
      tags: [],
      type
    };
  } catch (error) {
    console.error(`Error parsing content file ${filename}:`, error);
    // Return a fallback content file if parsing fails
    const slug = filename.replace(/\.md$/, '');
    return {
      slug,
      title: formatTitleFromSlug(slug),
      excerpt: '',
      content: 'Content not available.',
      published: true,
      date: new Date().toISOString().split('T')[0],
      icon: '',
      image: '',
      frontPageContent: '',
      tags: [],
      type
    };
  }
};

export const getFrontPageContent = (contentFile: ContentFile): string => {
  return contentFile.frontPageContent || contentFile.content;
};
