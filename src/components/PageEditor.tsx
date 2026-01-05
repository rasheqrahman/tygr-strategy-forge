import React, { useState, useEffect } from 'react';
import { generateFrontMatter, savePage, loadPage, parsePage } from '@/utils/pageUtils';
import { useToast } from '@/hooks/use-toast';
import PageMetadataForm from './PageMetadataForm';
import PageEditorContent from './PageEditorContent';

interface PageEditorProps {
  slug?: string;
  type: 'service' | 'industry' | 'media';
  onSave?: (slug: string) => void;
}

const PageEditor = ({ slug, type, onSave }: PageEditorProps) => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [frontPageContent, setFrontPageContent] = useState('');
  const [published, setPublished] = useState(true);
  const [image, setImage] = useState('');
  const [icon, setIcon] = useState('');
  const [rawMarkdown, setRawMarkdown] = useState('');
  const [activeTab, setActiveTab] = useState('edit');
  const { toast } = useToast();

  useEffect(() => {
    const loadContent = async () => {
      if (slug) {
        try {
          const savedContent = await loadPage(slug, type);
          if (savedContent) {
            const page = parsePage(`${slug}.md`, savedContent, type);
            setTitle(page.title);
            setExcerpt(page.excerpt || '');
            setContent(page.content);
            setFrontPageContent(page.frontPageContent || '');
            setPublished(page.published);
            setImage(page.image || '');
            setIcon(page.icon || '');
            setRawMarkdown(savedContent);
            console.log('Loaded page data:', {
              title: page.title,
              excerpt: page.excerpt,
              contentLength: page.content.length,
              frontPageContentLength: page.frontPageContent?.length || 0,
              published: page.published,
              image: page.image,
              icon: page.icon
            });
          }
        } catch (error) {
          console.error('Error loading page:', error);
        }
      } else {
        // New page - set better defaults
        const defaultTitle = `New ${type.charAt(0).toUpperCase() + type.slice(1)}`;
        setTitle(defaultTitle);
        const newPage = generateFrontMatter({
          title: defaultTitle,
          excerpt: '',
          content: '',
          frontPageContent: '',
          published: true,
          image: '',
          icon: ''
        });
        setRawMarkdown(newPage);
      }
    };

    loadContent();
  }, [slug, type]);

  const updateRawMarkdown = () => {
    console.log('=== UPDATING RAW MARKDOWN ===');
    console.log('Current frontPageContent:', frontPageContent);
    console.log('Length:', frontPageContent.length);
    
    const newMarkdown = generateFrontMatter({
      title,
      excerpt,
      content,
      frontPageContent,
      published,
      image,
      icon
    });
    console.log('Generated markdown frontPageContent section:', 
      newMarkdown.includes('frontPageContent:') ? 'INCLUDED' : 'MISSING');
    setRawMarkdown(newMarkdown);
  };

  useEffect(() => {
    updateRawMarkdown();
  }, [title, excerpt, content, frontPageContent, published, image, icon]);

  const handleSave = async () => {
    console.log('=== SAVE PROCESS STARTED ===');
    console.log('Current state before save:', {
      title,
      excerpt,
      contentLength: content.length,
      frontPageContentLength: frontPageContent.length,
      frontPageContent: frontPageContent.substring(0, 100) + '...',
      published,
      image,
      icon
    });

    if (!title.trim()) {
      toast({
        title: "Error",
        description: `Please enter a title for your ${type} page`,
        variant: "destructive"
      });
      return;
    }

    const pageSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Ensure we're saving the most up-to-date content
    const finalMarkdown = generateFrontMatter({
      title,
      excerpt,
      content,
      frontPageContent,
      published,
      image,
      icon
    });
    
    console.log('Final save data:', {
      slug: pageSlug,
      title,
      excerpt,
      contentLength: content.length,
      frontPageContentLength: frontPageContent.length,
      frontPageContentPreview: frontPageContent.substring(0, 100),
      published,
      image,
      icon,
      markdownLength: finalMarkdown.length,
      markdownHasFrontPageContent: finalMarkdown.includes('frontPageContent:')
    });
    
    try {
      await savePage(pageSlug, finalMarkdown, type);
      
      toast({
        title: "Success",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} page saved successfully!`
      });

      if (onSave) {
        onSave(pageSlug);
      }
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "Error",
        description: `Failed to save ${type} page. Please try again.`,
        variant: "destructive"
      });
    }
  };

  const handleRawMarkdownChange = (newRawMarkdown: string) => {
    console.log('Raw markdown manually changed');
    setRawMarkdown(newRawMarkdown);
    
    // Parse the raw markdown to update individual fields
    try {
      const page = parsePage('temp.md', newRawMarkdown, type);
      setTitle(page.title);
      setExcerpt(page.excerpt || '');
      setContent(page.content);
      setFrontPageContent(page.frontPageContent || '');
      setPublished(page.published);
      setImage(page.image || '');
      setIcon(page.icon || '');
      console.log('Parsed frontPageContent from raw markdown:', page.frontPageContent);
    } catch (error) {
      console.error('Error parsing raw markdown:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <PageMetadataForm
        title={title}
        excerpt={excerpt}
        image={image}
        icon={icon}
        frontPageContent={frontPageContent}
        published={published}
        type={type}
        slug={slug}
        onTitleChange={setTitle}
        onExcerptChange={setExcerpt}
        onImageChange={setImage}
        onIconChange={setIcon}
        onFrontPageContentChange={setFrontPageContent}
        onPublishedChange={setPublished}
        onSave={handleSave}
      />

      <PageEditorContent
        content={content}
        rawMarkdown={rawMarkdown}
        activeTab={activeTab}
        type={type}
        onContentChange={setContent}
        onRawMarkdownChange={handleRawMarkdownChange}
        onActiveTabChange={setActiveTab}
      />
    </div>
  );
};

export default PageEditor;
