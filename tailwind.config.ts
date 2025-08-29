import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['var(--font-host-grotesk)', 'system-ui', 'sans-serif'],
        'bandeins': ['var(--font-bandeins-strange)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slide-down': 'slideDown 0.8s ease-out',
        'fade-in': 'fadeIn 1s ease-out',
        'sparkle-in': 'sparkleIn 0.6s ease-out',
        'title-dramatic': 'titleDramatic 1.2s ease-out',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        sparkleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        titleDramatic: {
          '0%': { 
            transform: 'scale(0.9) translateY(30px)', 
            opacity: '0',
            filter: 'blur(10px)'
          },
          '100%': { 
            transform: 'scale(1) translateY(0)', 
            opacity: '1',
            filter: 'blur(0px)'
          },
        },
      },
      animationDelay: {
        '200': '200ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
        '1200': '1200ms',
        '1400': '1400ms',
        '1600': '1600ms',
      },
    },
  },
  plugins: [],
};

export default config;
