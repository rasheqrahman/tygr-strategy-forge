
import React, { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye } from 'lucide-react';
import MarkdownToolbar from './MarkdownToolbar';
import MarkdownPreview from './MarkdownPreview';
import LinkAwareTextarea from './LinkAwareTextarea';
import { applyMarkdownFormat } from '@/utils/markdownFormatter';

interface MarkdownEditorTabsProps {
  content: string;
  rawMarkdown: string;
  activeTab: string;
  onContentChange: (content: string) => void;
  onRawMarkdownChange: (rawMarkdown: string) => void;
  onActiveTabChange: (tab: string) => void;
}

const MarkdownEditorTabs = ({
  content,
  rawMarkdown,
  activeTab,
  onContentChange,
  onRawMarkdownChange,
  onActiveTabChange
}: MarkdownEditorTabsProps) => {
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
    
    // Set selection after state update
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newSelectionStart, newSelectionEnd);
    }, 0);
  };

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
              onChange={(e) => onContentChange(e.target.value)}
              placeholder="Write your blog post content in Markdown...\n\nTip: Type @ to get suggestions for linking to other pages"
              className="min-h-[400px] font-mono border-0 resize-none focus-visible:ring-0"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="preview" className="mt-6 px-6 pb-6">
          <MarkdownPreview content={content} />
        </TabsContent>
        
        <TabsContent value="raw" className="mt-6 px-6 pb-6">
          <LinkAwareTextarea
            value={rawMarkdown}
            onChange={(e) => onRawMarkdownChange(e.target.value)}
            className="min-h-[400px] font-mono"
            placeholder="Raw markdown with front matter..."
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default MarkdownEditorTabs;
