
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, FileText } from 'lucide-react';
import LinkAwareTextarea from './LinkAwareTextarea';

interface PageMetadataFormProps {
  title: string;
  excerpt: string;
  image: string;
  icon: string;
  frontPageContent: string;
  published: boolean;
  type: 'service' | 'industry' | 'media';
  slug?: string;
  onTitleChange: (title: string) => void;
  onExcerptChange: (excerpt: string) => void;
  onImageChange: (image: string) => void;
  onIconChange: (icon: string) => void;
  onFrontPageContentChange: (frontPageContent: string) => void;
  onPublishedChange: (published: boolean) => void;
  onSave: () => void;
}

const PageMetadataForm = ({
  title,
  excerpt,
  image,
  icon,
  frontPageContent,
  published,
  type,
  slug,
  onTitleChange,
  onExcerptChange,
  onImageChange,
  onIconChange,
  onFrontPageContentChange,
  onPublishedChange,
  onSave
}: PageMetadataFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {slug ? `Edit ${type.charAt(0).toUpperCase() + type.slice(1)} Page` : `Create New ${type.charAt(0).toUpperCase() + type.slice(1)} Page`}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder={`Enter ${type} title`}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Excerpt</label>
            <Input
              value={excerpt}
              onChange={(e) => onExcerptChange(e.target.value)}
              placeholder={`Brief description of the ${type}`}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Image URL</label>
            <Input
              value={image}
              onChange={(e) => onImageChange(e.target.value)}
              placeholder="Enter image URL or upload"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Icon (Lucide icon name)</label>
            <Input
              value={icon}
              onChange={(e) => onIconChange(e.target.value)}
              placeholder="e.g., lightbulb, zap, wrench"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Front Page Content (Markdown)</label>
          <div className="text-xs text-gray-500 mb-2">
            This content will appear on the home page {type} cards. Use markdown for formatting (bullets, paragraphs, etc.).
          </div>
          <LinkAwareTextarea
            value={frontPageContent}
            onChange={(e) => onFrontPageContentChange(e.target.value)}
            placeholder={`Enter front page content for this ${type}...\n\n• Feature 1\n• Feature 2\n• Feature 3\n\nOr write a paragraph describing the ${type}.`}
            className="min-h-[120px] font-mono"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => onPublishedChange(e.target.checked)}
              className="rounded"
            />
            Published
          </label>
          <Button onClick={onSave} className="ml-auto">
            <Save className="h-4 w-4 mr-2" />
            Save Page
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PageMetadataForm;
