
export const applyMarkdownFormat = (
  text: string,
  selectionStart: number,
  selectionEnd: number,
  format: string
): { newText: string; newSelectionStart: number; newSelectionEnd: number } => {
  const selectedText = text.substring(selectionStart, selectionEnd);
  const beforeSelection = text.substring(0, selectionStart);
  const afterSelection = text.substring(selectionEnd);
  
  let formattedText = '';
  let newSelectionStart = selectionStart;
  let newSelectionEnd = selectionEnd;
  
  switch (format) {
    case 'h1':
      formattedText = `# ${selectedText}`;
      newSelectionStart = selectionStart + 2;
      newSelectionEnd = newSelectionStart + selectedText.length;
      break;
    case 'h2':
      formattedText = `## ${selectedText}`;
      newSelectionStart = selectionStart + 3;
      newSelectionEnd = newSelectionStart + selectedText.length;
      break;
    case 'h3':
      formattedText = `### ${selectedText}`;
      newSelectionStart = selectionStart + 4;
      newSelectionEnd = newSelectionStart + selectedText.length;
      break;
    case 'h4':
      formattedText = `#### ${selectedText}`;
      newSelectionStart = selectionStart + 5;
      newSelectionEnd = newSelectionStart + selectedText.length;
      break;
    case 'h5':
      formattedText = `##### ${selectedText}`;
      newSelectionStart = selectionStart + 6;
      newSelectionEnd = newSelectionStart + selectedText.length;
      break;
    case 'h6':
      formattedText = `###### ${selectedText}`;
      newSelectionStart = selectionStart + 7;
      newSelectionEnd = newSelectionStart + selectedText.length;
      break;
    case 'bold':
      formattedText = `**${selectedText}**`;
      newSelectionStart = selectionStart + 2;
      newSelectionEnd = newSelectionStart + selectedText.length;
      break;
    case 'italic':
      formattedText = `*${selectedText}*`;
      newSelectionStart = selectionStart + 1;
      newSelectionEnd = newSelectionStart + selectedText.length;
      break;
    case 'underline':
      formattedText = `<u>${selectedText}</u>`;
      newSelectionStart = selectionStart + 3;
      newSelectionEnd = newSelectionStart + selectedText.length;
      break;
    case 'strikethrough':
      formattedText = `~~${selectedText}~~`;
      newSelectionStart = selectionStart + 2;
      newSelectionEnd = newSelectionStart + selectedText.length;
      break;
    default:
      formattedText = selectedText;
  }
  
  const newText = beforeSelection + formattedText + afterSelection;
  
  return {
    newText,
    newSelectionStart,
    newSelectionEnd
  };
};
