
import React, { useState, useRef, useCallback, forwardRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import LinkSuggestionDropdown from './LinkSuggestionDropdown';
import { useLinkSuggestions, LinkSuggestion } from '@/hooks/useLinkSuggestions';

interface LinkAwareTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const LinkAwareTextarea = forwardRef<HTMLTextAreaElement, LinkAwareTextareaProps>(
  ({ value, onChange, ...props }, ref) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestionQuery, setSuggestionQuery] = useState('');
    const [suggestionPosition, setSuggestionPosition] = useState({ top: 0, left: 0 });
    const [mentionStart, setMentionStart] = useState(0);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const suggestions = useLinkSuggestions();
    
    // Use the forwarded ref or our internal ref
    const actualRef = (ref as React.RefObject<HTMLTextAreaElement>) || textareaRef;
    
    console.log('LinkAwareTextarea - suggestions loaded:', suggestions.length);
    console.log('LinkAwareTextarea - showSuggestions:', showSuggestions);
    console.log('LinkAwareTextarea - suggestionQuery:', suggestionQuery);
    
    const getCaretPosition = useCallback(() => {
      const textarea = actualRef.current;
      if (!textarea) return { top: 0, left: 0 };
      
      const rect = textarea.getBoundingClientRect();
      const style = window.getComputedStyle(textarea);
      
      // Simple positioning - place dropdown below the textarea
      return {
        top: 30, // Position relative to textarea
        left: 10
      };
    }, [actualRef]);
    
    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      const cursorPosition = e.target.selectionStart;
      
      console.log('LinkAwareTextarea - text changed:', newValue.slice(-10));
      console.log('LinkAwareTextarea - cursor position:', cursorPosition);
      
      onChange(e);
      
      // Check for @ mention
      const textBeforeCursor = newValue.substring(0, cursorPosition);
      const atIndex = textBeforeCursor.lastIndexOf('@');
      
      console.log('LinkAwareTextarea - @ index:', atIndex);
      console.log('LinkAwareTextarea - text before cursor:', textBeforeCursor.slice(-10));
      
      if (atIndex !== -1) {
        const textAfterAt = textBeforeCursor.substring(atIndex + 1);
        
        console.log('LinkAwareTextarea - text after @:', textAfterAt);
        
        // Check if we're still in a mention (no spaces after @)
        if (!textAfterAt.includes(' ') && !textAfterAt.includes('\n')) {
          console.log('LinkAwareTextarea - showing suggestions');
          setMentionStart(atIndex);
          setSuggestionQuery(textAfterAt);
          setSuggestionPosition(getCaretPosition());
          setShowSuggestions(true);
        } else {
          console.log('LinkAwareTextarea - hiding suggestions (space/newline found)');
          setShowSuggestions(false);
        }
      } else {
        console.log('LinkAwareTextarea - hiding suggestions (no @ found)');
        setShowSuggestions(false);
      }
    };
    
    const handleSuggestionSelect = (suggestion: LinkSuggestion) => {
      const textarea = actualRef.current;
      if (!textarea) return;
      
      const beforeMention = value.substring(0, mentionStart);
      const afterMention = value.substring(textarea.selectionStart);
      
      // Create markdown link
      const markdownLink = `[${suggestion.title}](${suggestion.path})`;
      const newValue = beforeMention + markdownLink + afterMention;
      
      // Create synthetic event
      const syntheticEvent = {
        target: { ...textarea, value: newValue },
        currentTarget: textarea
      } as React.ChangeEvent<HTMLTextAreaElement>;
      
      onChange(syntheticEvent);
      
      // Set cursor position after the inserted link
      setTimeout(() => {
        const newCursorPosition = beforeMention.length + markdownLink.length;
        textarea.setSelectionRange(newCursorPosition, newCursorPosition);
        textarea.focus();
      }, 0);
      
      setShowSuggestions(false);
    };
    
    const handleCloseSuggestions = () => {
      setShowSuggestions(false);
    };
    
    return (
      <div className="relative">
        <Textarea
          ref={actualRef}
          value={value}
          onChange={handleTextareaChange}
          {...props}
        />
        {showSuggestions && (
          <LinkSuggestionDropdown
            suggestions={suggestions}
            query={suggestionQuery}
            position={suggestionPosition}
            onSelect={handleSuggestionSelect}
            onClose={handleCloseSuggestions}
          />
        )}
      </div>
    );
  }
);

LinkAwareTextarea.displayName = 'LinkAwareTextarea';

export default LinkAwareTextarea;
