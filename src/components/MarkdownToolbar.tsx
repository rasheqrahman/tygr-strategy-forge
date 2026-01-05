
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Toggle } from '@/components/ui/toggle';
import { 
  Heading, 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough 
} from 'lucide-react';

interface MarkdownToolbarProps {
  onFormatText: (format: string) => void;
}

const MarkdownToolbar = ({ onFormatText }: MarkdownToolbarProps) => {
  return (
    <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-white">
      {/* Heading Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Heading className="h-4 w-4" />
            Heading
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onFormatText('h1')}>
            <span className="text-2xl font-bold">H1</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFormatText('h2')}>
            <span className="text-xl font-bold">H2</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFormatText('h3')}>
            <span className="text-lg font-bold">H3</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFormatText('h4')}>
            <span className="text-base font-bold">H4</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFormatText('h5')}>
            <span className="text-sm font-bold">H5</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFormatText('h6')}>
            <span className="text-xs font-bold">H6</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Formatting Toggles */}
      <Toggle 
        size="sm" 
        onClick={() => onFormatText('bold')}
        aria-label="Bold"
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      
      <Toggle 
        size="sm" 
        onClick={() => onFormatText('italic')}
        aria-label="Italic"
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      
      <Toggle 
        size="sm" 
        onClick={() => onFormatText('underline')}
        aria-label="Underline"
      >
        <Underline className="h-4 w-4" />
      </Toggle>
      
      <Toggle 
        size="sm" 
        onClick={() => onFormatText('strikethrough')}
        aria-label="Strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

export default MarkdownToolbar;
