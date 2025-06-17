import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: 'pages', replacement: '/src/pages' },
      { find: 'components', replacement: '/src/components' },
      { find: 'services', replacement: '/src/services' },
      { find: 'contexts', replacement: '/src/contexts' },
      { find: 'assets', replacement: '/src/assets' },
      { find: 'utils', replacement: '/src/utils' },
      { find: 'permissionEnum', replacement: '/src/constants' },
      { find: 'useCan', replacement: '/src/hooks' },
    ],
    swiper: 'swiper/swiper-bundle.min.css',
    // swiper: 'swiper',
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or "modern"
      },
    },
  },
})
