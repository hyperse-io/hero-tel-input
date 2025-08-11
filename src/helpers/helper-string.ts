/***
 * Remove the occurrence of a part from a string.
 * @param text - text to remove the occurrence from
 * @param part - part to remove
 * @returns text without the occurrence
 */
export function removeOccurrence(text: string, part: string | RegExp): string {
  return text.replace(part, '');
}
