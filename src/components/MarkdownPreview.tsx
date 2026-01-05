
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownPreviewProps {
  content: string;
}

const MarkdownPreview = ({ content }: MarkdownPreviewProps) => {
  return (
    <div className="min-h-[400px] p-4 border rounded-md bg-white">
      <div className="markdown-preview">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({children}) => <h1 className="text-4xl font-bold mb-4 text-gray-900">{children}</h1>,
            h2: ({children}) => <h2 className="text-3xl font-bold mb-3 text-gray-900">{children}</h2>,
            h3: ({children}) => <h3 className="text-2xl font-bold mb-3 text-gray-900">{children}</h3>,
            h4: ({children}) => <h4 className="text-xl font-bold mb-2 text-gray-900">{children}</h4>,
            h5: ({children}) => <h5 className="text-lg font-bold mb-2 text-gray-900">{children}</h5>,
            h6: ({children}) => <h6 className="text-base font-bold mb-2 text-gray-900">{children}</h6>,
            p: ({children}) => <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>,
            ul: ({children}) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
            ol: ({children}) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
            li: ({children}) => <li className="text-gray-700">{children}</li>,
            blockquote: ({children}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4 text-gray-600">{children}</blockquote>,
            code: ({children}) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
            pre: ({children}) => <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">{children}</pre>,
            strong: ({children}) => <strong className="font-bold">{children}</strong>,
            em: ({children}) => <em className="italic">{children}</em>,
            del: ({children}) => <del className="line-through">{children}</del>,
            a: ({children, href}) => <a href={href} className="text-blue-600 hover:text-blue-800 underline">{children}</a>,
            hr: () => <hr className="my-6 border-gray-300" />,
          }}
        >
          {content || 'Nothing to preview yet. Start writing in the Edit tab!'}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownPreview;
