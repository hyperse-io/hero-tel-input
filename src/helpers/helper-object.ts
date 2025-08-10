export function matchIsObject(value: unknown): value is object {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

export const getObjectKeys = Object.keys as <T>(object: T) => (keyof T)[];
