/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{js,jsx,ts,tsx}',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#5f81c2',
                secondary: '#e2ecfe',
                white: '#e7ebf9',
                black: '#080e18',
                gray: '#c1c4cb',
                'bg-body': '#f2f3f6',
                // School Category Colors
                'cat-nursery': '#4d7ae8',
                'cat-primary': '#8b5cf6',
                'cat-junior': '#ea5cbf',
                'cat-senior': '#f59e0b',
                // UI Colors
                navy: '#1a2b4a',
                'light-gray': '#f5f7fa',
                'border-gray': '#e5e7eb',
                // Semantic colors
                success: '#10b981',
                warning: '#f59e0b',
                error: '#ef4444',
                info: '#3b82f6',
            },
            fontFamily: {
                sans: ['Figtree', 'system-ui', 'sans-serif'],
            },
            fontWeight: {
                light: 300,
                normal: 400,
                medium: 500,
                semibold: 600,
                bold: 700,
            },
            borderRadius: {
                none: '0px',
                sm: '6px',
                DEFAULT: '8px',
                md: '12px',
                lg: '16px',
                xl: '20px',
                '2xl': '24px',
                full: '9999px',
            },
            spacing: {
                xs: '4px',
                sm: '8px',
                md: '12px',
                lg: '16px',
                xl: '24px',
                '2xl': '32px',
                '3xl': '48px',
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                card: '0 2px 8px rgba(0, 0, 0, 0.08)',
                'card-hover': '0 8px 16px rgba(0, 0, 0, 0.12)',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'skeleton-loading': 'skeleton-loading 2s infinite',
            },
            keyframes: {
                'skeleton-loading': {
                    '0%': { backgroundPosition: '1000px 0' },
                    '100%': { backgroundPosition: '-1000px 0' },
                },
            },
        },
    },
    plugins: [],
};
