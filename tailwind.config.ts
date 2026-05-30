import type { Config } from "tailwindcss";

// Brutalist Theme for Away
// Colors: Orange #FF4500 (primary), Blue #0066FF (secondary), Black/White (high contrast)

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'display': ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
				'sans': ['Inter', 'system-ui', 'sans-serif'],
				'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
			},
			colors: {
				// Brutalist Primary Colors
				'primary': {
					DEFAULT: '#FF4500', // Orange électrique
					foreground: '#000000',
					light: '#FF6B35',
					dark: '#E03D00',
				},
				'secondary': {
					DEFAULT: '#0066FF', // Bleu électrique
					foreground: '#FFFFFF',
					light: '#3385FF',
					dark: '#0044CC',
				},
				
				// Neutral Colors (High Contrast)
				'background': '#FFFFFF',
				'foreground': '#000000',
				
				// Accent Colors
				'accent': {
					DEFAULT: '#FF4500', // Same as primary for consistency
					foreground: '#FFFFFF',
				},
				
				// Semantic Colors
				'destructive': {
					DEFAULT: '#FF0000', // Red (Brutalist)
					foreground: '#FFFFFF',
				},
				'muted': {
					DEFAULT: '#F5F5F5',
					foreground: '#666666',
				},
				'success': {
					DEFAULT: '#00AA00', // Green (Brutalist)
					foreground: '#FFFFFF',
				},
				'warning': {
					DEFAULT: '#FF8800', // Orange (Brutalist)
					foreground: '#000000',
				},
				
				// Border & Input Colors
				'border': '#000000', // Black borders for brutalist look
				'input': '#000000',
				'ring': '#FF4500',
				
				// Card Colors (High Contrast)
				'card': {
					DEFAULT: '#FFFFFF',
					foreground: '#000000',
					border: '#000000',
				},
				
				// Popover Colors
				'popover': {
					DEFAULT: '#FFFFFF',
					foreground: '#000000',
					border: '#000000',
				},
				
				// Sidebar Colors (if needed)
				'sidebar': {
					DEFAULT: '#000000',
					foreground: '#FFFFFF',
					primary: '#FF4500',
					'primary-foreground': '#000000',
					accent: '#0066FF',
					'accent-foreground': '#FFFFFF',
					border: '#333333',
					ring: '#FF4500',
				},
				
				// Chart Colors
				'chart': {
					'1': '#FF4500',
					'2': '#0066FF',
					'3': '#00AA00',
					'4': '#FF0000',
				},
			},
			borderRadius: {
				// Brutalist: No rounded corners (or minimal)
				'none': '0',
				'sm': '0',
				'md': '0',
				'lg': '0',
				'xl': '0',
				'2xl': '0',
				'3xl': '0',
				// For special cases (buttons, badges)
				'brutal-sm': '4px',
				'brutal-md': '8px',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-brutal': {
					'0%, 100%': {
						opacity: '1',
						transform: 'scale(1)',
					},
					'50%': {
						opacity: '0.8',
						transform: 'scale(1.02)',
					}
				},
				'glitch': {
					'0%': {
						transform: 'translate(0)',
					},
					'20%': {
						transform: 'translate(-2px, 2px)',
					},
					'40%': {
						transform: 'translate(2px, -2px)',
					},
					'60%': {
						transform: 'translate(-2px, 0)',
					},
					'80%': {
						transform: 'translate(2px, 0)',
					},
					'100%': {
						transform: 'translate(0)',
					}
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-brutal': 'pulse-brutal 2s ease-in-out infinite',
				'glitch': 'glitch 0.5s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
