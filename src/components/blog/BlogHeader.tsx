import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface BlogHeaderProps {
  isAuthenticated: boolean;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ isAuthenticated }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-5xl font-semibold text-slate-900 mb-4">Blog</h1>
        <p className="text-slate-600">
          Insights, tutorials, and thoughts on web development and design.
        </p>
      </div>
      {isAuthenticated && (
        <Link to="/blog/new">
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            <Plus size={16} className="mr-2" />
            New Post
          </Button>
        </Link>
      )}
    </div>
  );
};

export default BlogHeader;
