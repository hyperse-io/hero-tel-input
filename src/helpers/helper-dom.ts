/***
 * Put the cursor at the end of the input.
 * @param inputElement - input element
 */
export function putCursorAtEndOfInput(inputElement: HTMLInputElement) {
  const { length } = inputElement.value;
  inputElement.setSelectionRange(length, length);
}
