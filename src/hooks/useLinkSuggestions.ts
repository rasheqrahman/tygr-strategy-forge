
import { useState, useEffect } from 'react';
import { loadAllPages } from '@/utils/pageUtils';
import { loadAllBlogPosts } from '@/utils/blogUtils';

export interface LinkSuggestion {
  title: string;
  path: string;
  type: 'blog' | 'service' | 'industry' | 'media' | 'page';
  description?: string;
}

export const useLinkSuggestions = () => {
  const [suggestions, setSuggestions] = useState<LinkSuggestion[]>([]);
  
  useEffect(() => {
    const loadSuggestions = async () => {
      const linkSuggestions: LinkSuggestion[] = [];
      
      // Add static pages
      linkSuggestions.push(
        { title: 'Home', path: '/', type: 'page', description: 'Main landing page' },
        { title: 'Blog', path: '/blog', type: 'page', description: 'Blog listing page' },
        { title: 'LinkedIn Header', path: '/linkedin-header', type: 'page', description: 'LinkedIn header generator' },
        { title: 'Business Card', path: '/business-card', type: 'page', description: 'Business card generator' },
        { title: 'Square Logo', path: '/square-logo', type: 'page', description: 'Square logo generator' }
      );
      
      try {
        // Add blog posts
        const blogPosts = await loadAllBlogPosts();
        blogPosts.forEach(post => {
          linkSuggestions.push({
            title: post.title,
            path: `/blog/${post.slug}`,
            type: 'blog',
            description: post.excerpt
          });
        });
        
        // Add service pages
        const servicePages = await loadAllPages('service');
        servicePages.forEach(page => {
          linkSuggestions.push({
            title: page.title,
            path: `/services/${page.slug}`,
            type: 'service',
            description: page.excerpt
          });
        });
        
        // Add industry pages
        const industryPages = await loadAllPages('industry');
        industryPages.forEach(page => {
          linkSuggestions.push({
            title: page.title,
            path: `/industries/${page.slug}`,
            type: 'industry',
            description: page.excerpt
          });
        });
        
        // Add media pages
        const mediaPages = await loadAllPages('media');
        mediaPages.forEach(page => {
          linkSuggestions.push({
            title: page.title,
            path: `/media/${page.slug}`,
            type: 'media',
            description: page.excerpt
          });
        });
      } catch (error) {
        console.error('Error loading link suggestions:', error);
      }
      
      setSuggestions(linkSuggestions);
    };

    loadSuggestions();
  }, []);
  
  return suggestions;
};
