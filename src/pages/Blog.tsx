
import React, { useState, useEffect } from 'react';
import { loadAllContentFiles } from '@/utils/fileContentUtils';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogPostsList from '@/components/blog/BlogPostsList';
import EmptyBlogState from '@/components/blog/EmptyBlogState';
import BlogCallToAction from '@/components/blog/BlogCallToAction';
import BlogLoadingState from '@/components/blog/BlogLoadingState';

const Blog = () => {
  const { isAdmin } = useAuth();
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await loadAllContentFiles('blog');
        console.log('Blog page - Loaded blog posts:', allPosts);
        console.log('Blog page - Admin status:', isAdmin);
        
        // Show all posts to admins, only published posts to regular users
        const visiblePosts = isAdmin ? allPosts : allPosts.filter(post => post.published !== false);
        console.log('Blog page - Visible posts after filtering:', visiblePosts);
        
        setBlogPosts(visiblePosts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, [isAdmin]);

  console.log('Blog page render - isAdmin:', isAdmin);
  console.log('Blog page render - blogPosts:', blogPosts);
  console.log('Blog page render - loading:', loading);

  if (loading) {
    return <BlogLoadingState />;
  }

  // Sort posts: published first, then drafts at the end
  const sortedPosts = [...blogPosts].sort((a, b) => {
    if (a.published === false && b.published !== false) return 1;
    if (a.published !== false && b.published === false) return -1;
    return 0;
  });

  const publishedPosts = sortedPosts.filter(post => post.published !== false);
  const draftPosts = sortedPosts.filter(post => post.published === false);

  console.log('Blog page render - publishedPosts:', publishedPosts);
  console.log('Blog page render - draftPosts:', draftPosts);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <MainNavigation />
      
      <div className="max-w-4xl mx-auto py-12 px-6 flex-1">
        <BlogHeader isAuthenticated={isAdmin} />

        {/* All Posts in Order: Published first, then Drafts */}
        {sortedPosts.length > 0 && (
          <div className="mb-8 space-y-6">
            {sortedPosts.map(post => (
              <div key={post.slug}>
                <BlogPostsList 
                  posts={[post]} 
                  isAuthenticated={isAdmin}
                  isDraft={post.published === false}
                />
              </div>
            ))}
          </div>
        )}

        {/* Show empty state only if no posts at all */}
        {sortedPosts.length === 0 && (
          <EmptyBlogState isAuthenticated={isAdmin} />
        )}
      </div>

      <div className="bg-slate-900 mt-auto">
        <BlogCallToAction />
        <Footer />
      </div>
    </div>
  );
};

export default Blog;
