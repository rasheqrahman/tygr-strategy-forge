
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageEditor from '@/components/PageEditor';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';

const IndustryEdit = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const handleSave = (savedSlug: string) => {
    navigate(`/industries/${savedSlug}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <MainNavigation />
      <div className="py-12 flex-1">
        <div className="mb-6 px-6">
          <BackButton onClick={() => navigate('/')}>
            Back to Home
          </BackButton>
        </div>
        <PageEditor type="industry" slug={slug} onSave={handleSave} />
      </div>
      <div className="bg-slate-900 mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default IndustryEdit;
