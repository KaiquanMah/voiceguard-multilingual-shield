import type { Config } from "tailwindcss";

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
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				safe: {
					DEFAULT: 'hsl(var(--safe))',
					foreground: 'hsl(var(--safe-foreground))',
					glow: 'hsl(var(--safe-glow))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))',
					glow: 'hsl(var(--warning-glow))'
				},
				danger: {
					DEFAULT: 'hsl(var(--danger))',
					foreground: 'hsl(var(--danger-foreground))',
					glow: 'hsl(var(--danger-glow))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
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
				},
				'pulse-safe': {
					'0%, 100%': { boxShadow: '0 0 0 0 hsl(var(--safe) / 0.4)' },
					'50%': { boxShadow: '0 0 0 8px hsl(var(--safe) / 0)' }
				},
				'pulse-warning': {
					'0%, 100%': { boxShadow: '0 0 0 0 hsl(var(--warning) / 0.4)' },
					'50%': { boxShadow: '0 0 0 8px hsl(var(--warning) / 0)' }
				},
				'pulse-danger': {
					'0%, 100%': { boxShadow: '0 0 0 0 hsl(var(--danger) / 0.4)' },
					'50%': { boxShadow: '0 0 0 8px hsl(var(--danger) / 0)' }
				},
				'glow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'scan': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(100vh)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-safe': 'pulse-safe 2s infinite',
				'pulse-warning': 'pulse-warning 1.5s infinite',
				'pulse-danger': 'pulse-danger 1s infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'scan': 'scan 3s linear infinite'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-safe': 'var(--gradient-safe)',
				'gradient-warning': 'var(--gradient-warning)',
				'gradient-danger': 'var(--gradient-danger)',
				'gradient-cyber': 'var(--gradient-cyber)'
			},
			boxShadow: {
				'safe': 'var(--shadow-safe)',
				'warning': 'var(--shadow-warning)',
				'danger': 'var(--shadow-danger)',
				'cyber': 'var(--shadow-cyber)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
