
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogPost } from '@/utils/blogUtils';

interface BlogPostContentProps {
  post: BlogPost;
}

const BlogPostContent = ({ post }: BlogPostContentProps) => {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-6">
        <article className="bg-white rounded-lg shadow-sm p-12">
          <div className="prose prose-slate prose-lg max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({children}) => <h1 className="text-4xl font-light mb-8 text-slate-900 leading-tight">{children}</h1>,
                h2: ({children}) => <h2 className="text-3xl font-light mb-6 text-slate-900 leading-tight mt-12">{children}</h2>,
                h3: ({children}) => <h3 className="text-2xl font-light mb-4 text-slate-900 leading-tight mt-10">{children}</h3>,
                h4: ({children}) => <h4 className="text-xl font-medium mb-4 text-slate-900 leading-tight mt-8">{children}</h4>,
                h5: ({children}) => <h5 className="text-lg font-medium mb-3 text-slate-900 leading-tight mt-6">{children}</h5>,
                h6: ({children}) => <h6 className="text-base font-medium mb-3 text-slate-900 leading-tight mt-6">{children}</h6>,
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
                del: ({children}) => <del className="line-through text-slate-500">{children}</del>,
                a: ({children, href}) => (
                  <a href={href} className="text-orange-600 hover:text-orange-700 underline font-medium transition-colors">
                    {children}
                  </a>
                ),
                hr: () => <hr className="my-12 border-slate-200" />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </section>
  );
};

export default BlogPostContent;
