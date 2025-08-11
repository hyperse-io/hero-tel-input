/***
 * Check if the value is an array.
 * @param value - value to check
 * @param filled - if true, check if the array is filled
 * @returns true if the value is an array
 */
export function matchIsArray(
  value: unknown,
  filled?: boolean
): value is unknown[] {
  const isArray = Array.isArray(value);

  return filled ? isArray && value.length > 0 : isArray;
}

/***
 * Get the first intersection of two arrays.
 * @param arrayA - first array
 * @param arrayB - second array
 * @returns the first intersection
 */
export function getFirstIntersection<T extends unknown[]>(
  arrayA: T,
  arrayB: T
): T[number] | null {
  return (
    arrayA.find((element) => {
      return arrayB.includes(element);
    }) || null
  );
}
