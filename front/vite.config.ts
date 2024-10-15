import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    server: {
        port: 3000,
        host: 'localhost',
    },

    preview: {
        port: 3100,
        host: 'localhost',
    },

    plugins: [react()],
    resolve: {
        alias: {
            src: '/src',
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler', // or "modern"
            },
        },
    },
})
