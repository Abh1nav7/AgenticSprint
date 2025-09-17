import type { Config } from 'tailwindcss'

export default {
	content: [
		'./index.html',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'hsl(240 10% 3.9%)',
				foreground: 'hsl(0 0% 98%)',
				primary: {
					DEFAULT: '#3B82F6', // blue-500
					foreground: '#FFFFFF'
				},
				accent: {
					DEFAULT: '#60A5FA', // blue-400
					foreground: '#1E3A8A' // blue-900
				},
				muted: '#111827',
			},
			animation: {
				'spin-slow': 'spin 8s linear infinite',
				'pulse-slow': 'pulse 3s ease-in-out infinite',
			},
		}
	},
	plugins: [],
} satisfies Config


