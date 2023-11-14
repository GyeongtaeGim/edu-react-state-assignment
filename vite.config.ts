import { defineConfig } from 'vite';
import path from 'path';
import { readdirSync } from 'fs';

import react from '@vitejs/plugin-react-swc';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

const absolutePathAliases: { [key: string]: string } = {};
const srcPath = path.resolve('./src/');
const srcRootContent = readdirSync(srcPath, { withFileTypes: true }).map((dirent) =>
  dirent.name.replace(/(\.ts){1}(x?)/, ''),
);

srcRootContent.forEach((directory) => {
  absolutePathAliases[directory] = path.join(srcPath, directory);
});

export default defineConfig({
  plugins: [
    react(), vanillaExtractPlugin()
  ],
  resolve: {
    alias: {
      ...absolutePathAliases,
    },
  },
  server: {
    port: 3000,
    host: true,
    hmr: {
      port: 3001,
    },
  },
  build: {
    outDir: 'build',
  },
});
