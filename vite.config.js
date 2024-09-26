import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()], // Add your required plugins here
  build: {
    outDir: 'build', // The output directory for the build files
    assetsDir: 'static', // Directory for static assets within the output directory
    rollupOptions: {
      output: {
        // Customizes the output filenames
        assetFileNames: 'static/[name].[hash][extname]', // For assets like images, fonts, etc.
        chunkFileNames: 'static/[name].[hash].js', // For code split JS chunks
        entryFileNames: 'static/[name].[hash].js' // For entry JS files
      }
    }
  }
});
