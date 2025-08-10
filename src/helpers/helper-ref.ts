import type React from 'react';
import { matchIsObject } from './helper-object.js';

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
