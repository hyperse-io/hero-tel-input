import type React from 'react';
import type { InputProps } from '@heroui/react';
import { putCursorAtEndOfInput } from '../helpers/helper-dom.js';

type Options = Pick<InputProps, 'onDoubleClick' | 'onCopy' | 'onFocus'> & {
  inputRef: React.RefObject<HTMLInputElement | null>;
};

/***
 * Hook for handling events on HeroTelInput component.
 * @param options - event handlers and input reference
 * @returns event handlers
 */
export function useEvents({
  onDoubleClick,
  onCopy,
  onFocus,
  inputRef,
}: Options) {
  const handleDoubleClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const inputElement = inputRef.current as HTMLInputElement;
    inputElement.setSelectionRange(0, inputElement.value.length);
    onDoubleClick?.(event);
  };

  const handleCopy = (event: React.ClipboardEvent<HTMLInputElement>) => {
    if (onCopy) {
      onCopy(event);
      return;
    }

    const currentSelection = window.getSelection();

    if (currentSelection) {
      const valueWithoutSpaces = currentSelection
        .toString()
        .replaceAll(' ', '');
      event.clipboardData.setData('text/plain', valueWithoutSpaces);
      event.preventDefault();
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    if (inputRef.current) {
      putCursorAtEndOfInput(inputRef.current);
    }
    onFocus?.(event);
  };

  return {
    handleDoubleClick,
    handleCopy,
    handleFocus,
  };
}
