import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  define: {
    'process.env': {
      URL:'https://cualquiera.upla.edu.pe',
      NODE_ENV: 'production',
      
    }
  },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
    
  }
 /* build: {
    chunkSizeWarningLimit:1500,
    rollupOptions: {
        output:{
            manualChunks(id) {
              if (id.includes('node_modules')) {                
                  return id.toString().split('node_modules/')[1].split('/')[0].toString();
              }
          }
        }
    }
  }*/
})
