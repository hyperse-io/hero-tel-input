/***
 * Check if the value is an object.
 * @param value - value to check
 * @returns true if the value is an object
 */
export function matchIsObject(value: unknown): value is object {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

/***
 * Get the keys of an object.
 * @param object - object
 * @returns keys
 */
export const getObjectKeys = Object.keys as <T>(object: T) => (keyof T)[];
