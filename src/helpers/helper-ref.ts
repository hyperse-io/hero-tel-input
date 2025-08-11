import type React from 'react';
import { matchIsObject } from './helper-object.js';

/***
 * Convert refs to an array of refs.
 * @param refs - refs
 * @returns refs
 */
export function refToRefs<T>(refs: (React.Ref<T> | undefined)[]) {
  return (refInstance: T | null) => {
    refs.forEach((toRef) => {
      if (typeof toRef === 'function') {
        toRef(refInstance);
      } else if (toRef && matchIsObject(toRef) && 'current' in toRef) {
        toRef.current = refInstance;
      }
    });
  };
}
