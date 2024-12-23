import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
    	extend: {
    		backgroundImage: {
    			'pro-badge-gradient': 'linear-gradient(to right, #58759D 0%, #556096 30%, #514B8F 60%, #492181 100%)'
    		},
    		borderWidth: {
    			'1': '1px'
    		},
    		boxShadow: {
    			hrd: '0px 8px 20px rgba(0, 0, 0, 0.4)'
    		},
    		colors: {
    			'primary-50': 'var(--primary-50)',
    			'primary-100': 'var(--primary-100)',
    			'primary-200': 'var(--primary-200)',
    			'primary-300': 'var(--primary-300)',
    			'primary-400': 'var(--primary-400)',
    			'primary-500': 'var(--primary-500)',
    			'primary-600': 'var(--primary-600)',
    			'primary-700': 'var(--primary-700)',
    			'primary-800': 'var(--primary-800)',
    			'primary-900': 'var(--primary-900)',
    			'secondary-200': 'var(--secondary-200)',
    			'secondary-400': 'var(--secondary-400)',
    			'secondary-800': 'var(--secondary-800)',
    			'kPurple': 'var(--kPurple)',
    			'gray-50': 'var(--gray-50)',
    			'gray-100': 'var(--gray-100)',
    			'gray-200': 'var(--gray-200)',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'var(--card)',
    				foreground: 'var(--card-foreground)'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: {
    				background: 'hsl(var(--input))',
    				foreground: 'var(--card)'
    			},
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
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
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
