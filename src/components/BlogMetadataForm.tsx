
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, FileText } from 'lucide-react';

interface BlogMetadataFormProps {
  title: string;
  excerpt: string;
  published: boolean;
  icon: string;
  image: string;
  frontPageContent: string;
  tags: string[];
  slug?: string;
  onTitleChange: (title: string) => void;
  onExcerptChange: (excerpt: string) => void;
  onPublishedChange: (published: boolean) => void;
  onIconChange: (icon: string) => void;
  onImageChange: (image: string) => void;
  onFrontPageContentChange: (frontPageContent: string) => void;
  onTagsChange: (tags: string[]) => void;
  onSave: () => void;
}

const BlogMetadataForm = ({
  title,
  excerpt,
  published,
  icon,
  image,
  frontPageContent,
  tags,
  slug,
  onTitleChange,
  onExcerptChange,
  onPublishedChange,
  onIconChange,
  onImageChange,
  onFrontPageContentChange,
  onTagsChange,
  onSave
}: BlogMetadataFormProps) => {
  const handleTagsChange = (tagsString: string) => {
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
    onTagsChange(tagsArray);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {slug ? 'Edit Blog Post' : 'Create New Blog Post'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Enter blog post title"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Excerpt</label>
            <Input
              value={excerpt}
              onChange={(e) => onExcerptChange(e.target.value)}
              placeholder="Brief description of the post"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Icon (Lucide icon name)</label>
            <Input
              value={icon}
              onChange={(e) => onIconChange(e.target.value)}
              placeholder="e.g. FileText, Code, Lightbulb"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Image URL</label>
            <Input
              value={image}
              onChange={(e) => onImageChange(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Tags (comma separated)</label>
          <Input
            value={tags.join(', ')}
            onChange={(e) => handleTagsChange(e.target.value)}
            placeholder="javascript, react, tutorial"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Front Page Content</label>
          <Textarea
            value={frontPageContent}
            onChange={(e) => onFrontPageContentChange(e.target.value)}
            placeholder="Short content to display on the front page (optional)"
            rows={3}
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
            Save Post
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogMetadataForm;
