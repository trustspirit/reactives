import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
      'next/index': 'src/next/index.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    splitting: true,
    sourcemap: true,
    clean: true,
    treeshake: true,
    external: ['react', 'react-dom', 'next'],
    outExtension({ format }) {
      return { js: format === 'esm' ? '.mjs' : '.cjs' }
    },
    esbuildOptions(options) {
      options.jsx = 'automatic'
    },
    target: 'es2020',
    banner: { js: '"use client";' },
  },
  {
    entry: { 'utils/index': 'src/utils/index.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: false,
    treeshake: true,
    external: ['clsx', 'tailwind-merge'],
    outExtension({ format }) {
      return { js: format === 'esm' ? '.mjs' : '.cjs' }
    },
    target: 'es2020',
  },
])
