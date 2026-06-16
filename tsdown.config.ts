import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  target: 'es2020',
  tsconfig: './tsconfig.build.json',
});
