
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MarkdownEditor from '@/components/MarkdownEditor';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';

const BlogNew = () => {
  const navigate = useNavigate();

  const handleSave = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <MainNavigation />
      <div className="py-12 flex-1">
        <div className="mb-6 px-6">
          <BackButton onClick={() => navigate('/blog')}>
            Back to Blog
          </BackButton>
        </div>
        <MarkdownEditor onSave={handleSave} />
      </div>
      <div className="bg-slate-900 mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default BlogNew;
