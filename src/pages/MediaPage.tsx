
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { loadPage, parsePage } from '@/utils/pageUtils';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';

const MediaPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = React.useState<ReturnType<typeof parsePage> | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadMediaPage = async () => {
      if (slug) {
        try {
          const savedContent = await loadPage(slug, 'media');
          if (savedContent) {
            const parsedPage = parsePage(`${slug}.md`, savedContent, 'media');
            setPage(parsedPage);
          }
        } catch (error) {
          console.error('Error loading media page:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadMediaPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <MainNavigation />
        <div className="py-20 flex-1">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-slate-600">Loading...</p>
          </div>
        </div>
        <div className="bg-slate-900 mt-auto">
          <Footer />
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <MainNavigation />
        <div className="py-20 flex-1">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-light text-slate-900 mb-6">Media page not found</h1>
            <p className="text-xl text-slate-600 mb-8 font-light">The media page you're looking for doesn't exist or has been moved.</p>
            <Button onClick={() => navigate('/')} variant="outline" className="text-slate-700 border-slate-300 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
        <div className="bg-slate-900 mt-auto">
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <MainNavigation />

      <section
        className="py-20 relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: page.image ? `url(${page.image})` : 'none',
          backgroundColor: page.image ? 'transparent' : 'white'
        }}
      >
        {page.image && (
          <div className="absolute inset-0 bg-slate-900 bg-opacity-70"></div>
        )}
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className={`mb-8 p-0 font-light ${
              page.image 
                ? 'text-white hover:text-orange-300' 
                : 'text-slate-600 hover:text-orange-600'
            }`}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="space-y-6">
            <div className={`text-sm font-light tracking-widest uppercase ${
              page.image ? 'text-orange-300' : 'text-orange-500'
            }`}>
              Media
            </div>
            <h1 className={`text-5xl lg:text-6xl font-light leading-tight ${
              page.image ? 'text-white' : 'text-slate-900'
            }`}>{page.title}</h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                {!page.published && (
                  <span className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 font-medium">
                    Draft
                  </span>
                )}
              </div>
              <Button 
                variant="outline"
                onClick={() => navigate(`/media/edit/${page.slug}`)}
                className={`font-light ${
                  page.image 
                    ? 'text-white border-white/30 hover:bg-white/10 hover:border-orange-300 hover:text-orange-300'
                    : 'text-slate-600 border-slate-300 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700'
                }`}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
            {page.excerpt && (
              <p className={`text-xl leading-relaxed font-light max-w-3xl ${
                page.image ? 'text-white/90' : 'text-slate-600'
              }`}>
                {page.excerpt}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 flex-1">
        <div className="max-w-4xl mx-auto px-6">
          <article className="bg-white rounded-lg shadow-sm p-12">
            <div className="prose prose-slate prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({children}) => <h1 className="text-4xl font-light mb-8 text-slate-900 leading-tight">{children}</h1>,
                  h2: ({children}) => <h2 className="text-3xl font-light mb-6 text-slate-900 leading-tight mt-12">{children}</h2>,
                  h3: ({children}) => <h3 className="text-2xl font-light mb-4 text-slate-900 leading-tight mt-10">{children}</h3>,
                  p: ({children}) => <p className="mb-6 text-slate-700 leading-relaxed text-lg font-light">{children}</p>,
                  ul: ({children}) => <ul className="list-disc list-outside mb-6 space-y-2 ml-6">{children}</ul>,
                  ol: ({children}) => <ol className="list-decimal list-outside mb-6 space-y-2 ml-6">{children}</ol>,
                  li: ({children}) => <li className="text-slate-700 font-light leading-relaxed">{children}</li>,
                  blockquote: ({children}) => (
                    <blockquote className="border-l-4 border-orange-300 pl-6 py-2 italic mb-6 text-slate-600 bg-orange-50 rounded-r-lg">
                      {children}
                    </blockquote>
                  ),
                  code: ({children}) => <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono text-slate-800">{children}</code>,
                  pre: ({children}) => <pre className="bg-slate-100 p-6 rounded-lg overflow-x-auto mb-6 border">{children}</pre>,
                  strong: ({children}) => <strong className="font-semibold text-slate-900">{children}</strong>,
                  em: ({children}) => <em className="italic text-slate-700">{children}</em>,
                  a: ({children, href}) => (
                    <a href={href} className="text-orange-600 hover:text-orange-700 underline font-medium transition-colors">
                      {children}
                    </a>
                  ),
                  hr: () => <hr className="my-12 border-slate-200" />,
                }}
              >
                {page.content}
              </ReactMarkdown>
            </div>
          </article>
        </div>
      </section>

      <div className="bg-slate-900 mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default MediaPage;
