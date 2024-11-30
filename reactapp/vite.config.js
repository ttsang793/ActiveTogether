import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '^/blog/*': {
                target: 'https://localhost:7126/',
                secure: false
            },
            '^/product/*': {
                target: 'https://localhost:7126/',
                secure: false
            },
            '^/cart/*': {
                target: 'https://localhost:7126/',
                secure: false
            },
            '^/order/*': {
                target: 'https://localhost:7126/',
                secure: false
            },
            '^/user/*': {
                target: 'https://localhost:7126/',
                secure: false
            },
            '^/refund/*': {
                target: 'https://localhost:7126/',
                secure: false
            },
            '^/sport/*': {
                target: 'https://localhost:7126/',
                secure: false
            },
            '^/api/*': {
                target: 'https://localhost:7267/',
                secure: false
            }
        }
    }
})
