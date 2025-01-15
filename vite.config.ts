import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	optimizeDeps: {
		// Radix komponentlarini to'g'ri optimallashtirish uchun
		include: ['@radix-ui/react-scroll-area'],
	},
	server: {
		// Qo'shimcha debugging uchun server loglari
		port: 5173, // yoki kerakli portni qo'shing
		// open: true, // serverni avtomatik ochish
	},
})
