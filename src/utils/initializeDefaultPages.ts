
import { createDefaultServicePages, createDefaultIndustryPages } from '@/data/defaultPages';

export const initializeDefaultPages = () => {
  // Check if default pages have already been created
  const defaultPagesInitialized = localStorage.getItem('defaultPagesInitialized');
  
  if (!defaultPagesInitialized) {
    createDefaultServicePages();
    createDefaultIndustryPages();
    localStorage.setItem('defaultPagesInitialized', 'true');
    console.log('Default service and industry pages created');
  }
};
