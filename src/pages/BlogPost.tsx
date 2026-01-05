
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadBlogPost, parseBlogPost } from '@/utils/blogUtils';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import { useLocalAuth } from '@/contexts/LocalAuthContext';
import BlogLoadingState from '@/components/blog/BlogLoadingState';
import ErrorState from '@/components/ErrorState';
import BlogCallToAction from '@/components/blog/BlogCallToAction';
import BlogPostHeader from '@/components/BlogPostHeader';
import BlogPostContent from '@/components/BlogPostContent';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useLocalAuth();

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError('Blog post slug is missing.');
        setLoading(false);
        return;
      }

      try {
        const rawContent = await loadBlogPost(slug);
        if (rawContent) {
          // Parse the raw markdown content into a BlogPost object
          const parsedPost = parseBlogPost(`${slug}.md`, rawContent);
          setPost(parsedPost);
        } else {
          setError('Blog post not found.');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load blog post.');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return <BlogLoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!post) {
    return <ErrorState message="Blog post not found." />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <MainNavigation />

      <div className="flex-1">
        <BlogPostHeader post={post} />
        <BlogPostContent post={post} />
      </div>

      <div className="bg-slate-900 mt-auto">
        <BlogCallToAction />
        <Footer />
      </div>
    </div>
  );
};

export default BlogPost;
