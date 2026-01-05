
import React, { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Eye } from 'lucide-react';
import MarkdownToolbar from './MarkdownToolbar';
import LinkAwareTextarea from './LinkAwareTextarea';
import { applyMarkdownFormat } from '@/utils/markdownFormatter';

interface PageEditorContentProps {
  content: string;
  rawMarkdown: string;
  activeTab: string;
  type: 'service' | 'industry' | 'media';
  onContentChange: (content: string) => void;
  onRawMarkdownChange: (rawMarkdown: string) => void;
  onActiveTabChange: (tab: string) => void;
}

const PageEditorContent = ({
  content,
  rawMarkdown,
  activeTab,
  type,
  onContentChange,
  onRawMarkdownChange,
  onActiveTabChange
}: PageEditorContentProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFormatText = (format: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;
    
    const { newText, newSelectionStart, newSelectionEnd } = applyMarkdownFormat(
      content,
      selectionStart,
      selectionEnd,
      format
    );
    
    onContentChange(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newSelectionStart, newSelectionEnd);
    }, 0);
  };

  console.log('PageEditorContent - activeTab:', activeTab);
  console.log('PageEditorContent - content length:', content.length);

  return (
    <Card className="min-h-[500px]">
      <Tabs value={activeTab} onValueChange={onActiveTabChange} className="h-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="raw">Raw Markdown</TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit" className="mt-0">
          <MarkdownToolbar onFormatText={handleFormatText} />
          <div className="px-6 pb-6">
            <div className="text-xs text-gray-500 mb-2">
              Tip: Type @ to link to other pages on your website
            </div>
            <LinkAwareTextarea
              ref={textareaRef}
              value={content}
              onChange={(e) => {
                console.log('Content change triggered:', e.target.value.slice(-5));
                onContentChange(e.target.value);
              }}
              placeholder={`Write your ${type} page content in Markdown...\n\nTip: Type @ to get suggestions for linking to other pages`}
              className="min-h-[400px] font-mono border-0 resize-none focus-visible:ring-0"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="preview" className="mt-6 px-6 pb-6">
          <div className="min-h-[400px] p-4 border rounded-md bg-white">
            <div className="markdown-preview">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({children}) => <h1 className="text-4xl font-bold mb-4 text-gray-900">{children}</h1>,
                  h2: ({children}) => <h2 className="text-3xl font-bold mb-3 text-gray-900">{children}</h2>,
                  h3: ({children}) => <h3 className="text-2xl font-bold mb-3 text-gray-900">{children}</h3>,
                  p: ({children}) => <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>,
                  ul: ({children}) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
                  ol: ({children}) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
                  li: ({children}) => <li className="text-gray-700">{children}</li>,
                  blockquote: ({children}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4 text-gray-600">{children}</blockquote>,
                  code: ({children}) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
                  pre: ({children}) => <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">{children}</pre>,
                  strong: ({children}) => <strong className="font-bold">{children}</strong>,
                  em: ({children}) => <em className="italic">{children}</em>,
                  a: ({children, href}) => <a href={href} className="text-blue-600 hover:text-blue-800 underline">{children}</a>,
                  hr: () => <hr className="my-6 border-gray-300" />,
                }}
              >
                {content || `Nothing to preview yet. Start writing in the Edit tab!`}
              </ReactMarkdown>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="raw" className="mt-6 px-6 pb-6">
          <LinkAwareTextarea
            value={rawMarkdown}
            onChange={(e) => {
              console.log('Raw markdown change triggered');
              onRawMarkdownChange(e.target.value);
            }}
            className="min-h-[400px] font-mono"
            placeholder="Raw markdown with front matter..."
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default PageEditorContent;
