
import React from 'react';
import BlogPostCard from './BlogPostCard';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  image?: string;
  published: boolean;
}

interface BlogPostsListProps {
  posts: BlogPost[];
  isAuthenticated: boolean;
  title?: string;
  isDraft?: boolean;
}

const BlogPostsList: React.FC<BlogPostsListProps> = ({ 
  posts, 
  isAuthenticated, 
  title,
  isDraft = false 
}) => {
  if (posts.length === 0) return null;

  return (
    <div>
      {title && (
        <h2 className="text-2xl font-light text-slate-900 mb-4">{title}</h2>
      )}
      <div className="grid gap-6">
        {posts.map(post => (
          <BlogPostCard 
            key={post.slug} 
            post={post} 
            isAuthenticated={isAuthenticated}
            isDraft={isDraft}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogPostsList;
