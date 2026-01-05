
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface EmptyBlogStateProps {
  isAuthenticated: boolean;
}

const EmptyBlogState: React.FC<EmptyBlogStateProps> = ({ isAuthenticated }) => {
  return (
    <div className="text-center py-12">
      <p className="text-slate-600 mb-4">No blog posts yet.</p>
      {isAuthenticated && (
        <Link to="/blog/new">
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            Create Your First Post
          </Button>
        </Link>
      )}
    </div>
  );
};

export default EmptyBlogState;
