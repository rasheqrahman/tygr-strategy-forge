
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Edit, FileText } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  image?: string;
  published: boolean;
}

interface BlogPostCardProps {
  post: BlogPost;
  isAuthenticated: boolean;
  isDraft?: boolean;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ 
  post, 
  isAuthenticated, 
  isDraft = false 
}) => {
  const cardClasses = isDraft 
    ? "border-orange-200 bg-orange-50/30 hover:shadow-lg transition-shadow opacity-70 border-dashed"
    : "hover:shadow-lg transition-shadow";

  return (
    <Card className={cardClasses}>
      <CardHeader className="pb-4">
        <div className="flex gap-4">
          {/* Image Box */}
          <div className="flex-shrink-0 w-24 h-24">
            <AspectRatio ratio={1}>
              <div className="w-full h-full rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
                {post.image ? (
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className={`w-full h-full object-cover ${isDraft ? 'grayscale' : ''}`}
                  />
                ) : (
                  <FileText className={`w-8 h-8 ${isDraft ? 'text-slate-300' : 'text-slate-400'}`} />
                )}
              </div>
            </AspectRatio>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className={`text-xs mb-2 ${isDraft ? 'text-slate-400' : 'text-slate-500'}`}>{post.date}</div>
                <CardTitle className={`text-xl font-semibold mb-2 ${isDraft ? 'text-slate-500' : 'text-slate-900'}`}>
                  <Link to={`/blog/${post.slug}`} className={`transition-colors ${isDraft ? 'hover:text-slate-600' : 'hover:text-orange-600'}`}>
                    {post.title}
                  </Link>
                </CardTitle>
                {post.excerpt && <p className={`text-sm ${isDraft ? 'text-slate-400' : 'text-slate-600'}`}>{post.excerpt}</p>}
              </div>
              <div className="flex items-center gap-2">
                {isDraft && (
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full font-medium">
                    Draft
                  </span>
                )}
                {isAuthenticated && (
                  <Link to={`/blog/edit/${post.slug}`}>
                    <Button variant="outline" size="sm">
                      <Edit size={14} className="mr-1" />
                      Edit
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default BlogPostCard;
