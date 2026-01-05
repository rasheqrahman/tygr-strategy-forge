
import React, { useState, useEffect } from 'react';
import { generateFrontMatter, saveBlogPost, loadBlogPost, parseBlogPost } from '@/utils/blogUtils';
import { useToast } from '@/hooks/use-toast';
import BlogMetadataForm from './BlogMetadataForm';
import MarkdownEditorTabs from './MarkdownEditorTabs';

interface MarkdownEditorProps {
  slug?: string;
  onSave?: (slug: string) => void;
}

const MarkdownEditor = ({ slug, onSave }: MarkdownEditorProps) => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(true);
  const [icon, setIcon] = useState('');
  const [image, setImage] = useState('');
  const [frontPageContent, setFrontPageContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [rawMarkdown, setRawMarkdown] = useState('');
  const [activeTab, setActiveTab] = useState('edit');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadContent = async () => {
      if (slug) {
        setLoading(true);
        setError(null);
        try {
          const savedPostData = await loadBlogPost(slug);
          console.log('[MarkdownEditor] loaded blog post data:', savedPostData);
          if (savedPostData) {
            // If the result is a string, we need to parse it before accessing fields
            const savedPost = typeof savedPostData === "string"
              ? parseBlogPost(`${slug}.md`, savedPostData)
              : savedPostData;

            setTitle(savedPost.title || '');
            setExcerpt(savedPost.excerpt || '');
            setContent(savedPost.content || '');
            setPublished(savedPost.published);
            setIcon(savedPost.icon || '');
            setImage(savedPost.image || '');
            setFrontPageContent(savedPost.frontPageContent || '');
            setTags(savedPost.tags || []);

            // Generate the raw markdown from the parsed post
            const generatedMarkdown = generateFrontMatter({
              title: savedPost.title,
              excerpt: savedPost.excerpt,
              content: savedPost.content,
              published: savedPost.published,
              icon: savedPost.icon,
              image: savedPost.image,
              frontPageContent: savedPost.frontPageContent,
              tags: savedPost.tags
            });
            setRawMarkdown(generatedMarkdown);
            setLoading(false);
          } else {
            setError('Blog post not found.');
            setLoading(false);
          }
        } catch (error) {
          console.error('Error loading blog post:', error);
          setError('Error loading blog post.');
          setLoading(false);
        }
      } else {
        // New post - set default values
        setTitle('New Blog Post');
        setExcerpt('');
        setContent('');
        setPublished(true);
        setIcon('');
        setImage('');
        setFrontPageContent('');
        setTags([]);

        const newPost = generateFrontMatter({
          title: 'New Blog Post',
          excerpt: '',
          content: '',
          published: true,
          icon: '',
          image: '',
          frontPageContent: '',
          tags: []
        });
        setRawMarkdown(newPost);
      }
    };

    loadContent();
  }, [slug]);

  // Update raw markdown when metadata or content changes
  const updateRawMarkdown = () => {
    console.log('Updating raw markdown with current state:', {
      title,
      excerpt,
      content: content.substring(0, 100) + '...',
      published,
      icon,
      image,
      frontPageContent: frontPageContent.substring(0, 50) + '...',
      tags
    });
    
    const newMarkdown = generateFrontMatter({
      title,
      excerpt,
      content,
      published,
      icon,
      image,
      frontPageContent,
      tags
    });
    setRawMarkdown(newMarkdown);
  };

  useEffect(() => {
    updateRawMarkdown();
  }, [title, excerpt, content, published, icon, image, frontPageContent, tags]);

  const handleRawMarkdownChange = (newRawMarkdown: string) => {
    console.log('Raw markdown changed, new length:', newRawMarkdown.length);
    setRawMarkdown(newRawMarkdown);

    try {
      const post = parseBlogPost('temp.md', newRawMarkdown);
      setTitle(post.title);
      setExcerpt(post.excerpt || '');
      setContent(post.content);
      setPublished(post.published);
      setIcon(post.icon || '');
      setImage(post.image || '');
      setFrontPageContent(post.frontPageContent || '');
      setTags(post.tags || []);
    } catch (error) {
      toast({
        title: "Parse Error",
        description: "There was an error parsing the markdown. Please check the format.",
        variant: "destructive"
      });
    }
  };

  const handleSave = async () => {
    console.log('=== SAVE PROCESS STARTED ===');
    console.log('Current state before save:', {
      title,
      slug,
      contentLength: content.length,
      rawMarkdownLength: rawMarkdown.length,
      published
    });

    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your blog post",
        variant: "destructive"
      });
      return;
    }

    const postSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    try {
      const finalMarkdown = rawMarkdown || generateFrontMatter({
        title,
        excerpt,
        content,
        published,
        icon,
        image,
        frontPageContent,
        tags
      });

      await saveBlogPost(postSlug, finalMarkdown);

      toast({
        title: "Success",
        description: "Blog post saved successfully!"
      });

      if (onSave) {
        onSave(postSlug);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save blog post. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Render loading or error UI
  if (slug && loading) {
    return (
      <div className="max-w-6xl mx-auto p-10 text-center text-lg text-slate-600">
        Loading blog post...
      </div>
    );
  }
  if (slug && error) {
    return (
      <div className="max-w-6xl mx-auto p-10 text-center text-red-600 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <BlogMetadataForm
        title={title}
        excerpt={excerpt}
        published={published}
        icon={icon}
        image={image}
        frontPageContent={frontPageContent}
        tags={tags}
        slug={slug}
        onTitleChange={setTitle}
        onExcerptChange={setExcerpt}
        onPublishedChange={setPublished}
        onIconChange={setIcon}
        onImageChange={setImage}
        onFrontPageContentChange={setFrontPageContent}
        onTagsChange={setTags}
        onSave={handleSave}
      />

      <MarkdownEditorTabs
        content={content}
        rawMarkdown={rawMarkdown}
        activeTab={activeTab}
        onContentChange={setContent}
        onRawMarkdownChange={handleRawMarkdownChange}
        onActiveTabChange={setActiveTab}
      />
    </div>
  );
};

export default MarkdownEditor;
