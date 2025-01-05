import { FlatCompat } from '@eslint/eslintrc';
import pluginNext from '@next/eslint-plugin-next';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});
const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
    rules: {
      ...pluginNext.configs.recommended.rules,
    },
    ignorePatterns: ['!.eslintrc.mjs', 'node_modules/', '.next/', '*.js'],
  }),
  {
    files: ['*.ts', '*.tsx'],
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
];
export default eslintConfig;
