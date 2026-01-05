
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LinkSuggestion } from '@/hooks/useLinkSuggestions';
import { Link, FileText, Users, Building, Camera } from 'lucide-react';

interface LinkSuggestionDropdownProps {
  suggestions: LinkSuggestion[];
  query: string;
  position: { top: number; left: number };
  onSelect: (suggestion: LinkSuggestion) => void;
  onClose: () => void;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'blog': return <FileText className="h-3 w-3" />;
    case 'service': return <Users className="h-3 w-3" />;
    case 'industry': return <Building className="h-3 w-3" />;
    case 'media': return <Camera className="h-3 w-3" />;
    default: return <Link className="h-3 w-3" />;
  }
};

const getTypeBadgeColor = (type: string) => {
  switch (type) {
    case 'blog': return 'bg-blue-100 text-blue-800';
    case 'service': return 'bg-green-100 text-green-800';
    case 'industry': return 'bg-purple-100 text-purple-800';
    case 'media': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const LinkSuggestionDropdown = ({ 
  suggestions, 
  query, 
  position, 
  onSelect, 
  onClose 
}: LinkSuggestionDropdownProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Filter suggestions based on query
  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.title.toLowerCase().includes(query.toLowerCase()) ||
    suggestion.description?.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 10); // Limit to 10 results
  
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredSuggestions.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredSuggestions[selectedIndex]) {
          onSelect(filteredSuggestions[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [filteredSuggestions, selectedIndex, onSelect, onClose]);
  
  if (filteredSuggestions.length === 0) {
    return null;
  }
  
  return (
    <Card 
      ref={dropdownRef}
      className="absolute z-50 w-80 max-h-60 overflow-y-auto shadow-lg border"
      style={{ 
        top: position.top + 20, 
        left: position.left 
      }}
    >
      <div className="p-2">
        <div className="text-xs text-gray-500 mb-2 px-2">
          Link suggestions ({filteredSuggestions.length})
        </div>
        {filteredSuggestions.map((suggestion, index) => (
          <div
            key={`${suggestion.type}-${suggestion.path}`}
            className={`flex items-start gap-3 p-2 rounded cursor-pointer transition-colors ${
              index === selectedIndex ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
            }`}
            onClick={() => onSelect(suggestion)}
          >
            <div className="mt-1">
              {getTypeIcon(suggestion.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm truncate">
                  {suggestion.title}
                </span>
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${getTypeBadgeColor(suggestion.type)}`}
                >
                  {suggestion.type}
                </Badge>
              </div>
              {suggestion.description && (
                <p className="text-xs text-gray-500 line-clamp-2">
                  {suggestion.description}
                </p>
              )}
              <p className="text-xs text-blue-600 mt-1 font-mono">
                {suggestion.path}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LinkSuggestionDropdown;
