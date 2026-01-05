
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Edit } from 'lucide-react';
import { BlogPost } from '@/utils/blogUtils';

interface BlogPostHeaderProps {
  post: BlogPost;
}

const BlogPostHeader = ({ post }: BlogPostHeaderProps) => {
  const navigate = useNavigate();

  return (
    <section 
      className="py-20 relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: post.image ? `url(${post.image})` : 'none',
        backgroundColor: post.image ? 'transparent' : 'white'
      }}
    >
      {post.image && (
        <div className="absolute inset-0 bg-slate-900 bg-opacity-70"></div>
      )}
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/blog')}
          className={`mb-8 p-0 font-light ${
            post.image 
              ? 'text-white hover:text-orange-300' 
              : 'text-slate-600 hover:text-orange-600'
          }`}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Button>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className={`text-sm font-light tracking-widest uppercase ${
              post.image ? 'text-orange-300' : 'text-orange-500'
            }`}>
              TYGR Ventures Insights
            </div>
            <Button 
              variant="outline"
              onClick={() => navigate(`/blog/edit/${post.slug}`)}
              className={`font-light ${
                post.image 
                  ? 'bg-white/10 border-orange-300 text-orange-300 hover:bg-white/20 hover:border-orange-300 hover:text-orange-300'
                  : 'bg-orange-50 border-orange-300 text-orange-700 hover:bg-orange-100 hover:border-orange-300 hover:text-orange-700'
              }`}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
          <h1 className={`text-5xl lg:text-6xl font-light leading-tight ${
            post.image ? 'text-white' : 'text-slate-900'
          }`}>{post.title}</h1>
          <div className={`flex items-center gap-6 ${
            post.image ? 'text-white/90' : 'text-slate-600'
          }`}>
            <span className="flex items-center gap-2 font-light">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
            {!post.published && (
              <span className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 font-medium">
                Draft
              </span>
            )}
          </div>
          {post.excerpt && (
            <p className={`text-xl leading-relaxed font-light max-w-3xl ${
              post.image ? 'text-white/90' : 'text-slate-600'
            }`}>
              {post.excerpt}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogPostHeader;
