import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Pre-bundle heavy deps once on startup instead of discovering them
  // mid-session (which triggers a full page reload + stall).
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-redux',
      '@reduxjs/toolkit',
      'axios',
      'react-hot-toast',
      'socket.io-client',
      'framer-motion',
      'lottie-react',
      'emoji-picker-react',
      'react-audio-voice-recorder',
      'lucide-react',
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'redux-vendor': ['react-redux', '@reduxjs/toolkit'],
          'ui-vendor': ['framer-motion', 'lottie-react', 'emoji-picker-react'],
        },
      },
    },
  },
});
