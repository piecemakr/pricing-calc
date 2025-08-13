import type { Config } from 'tailwindcss';

const config: Config = {
  // For Tailwind v4, most configuration is done in CSS
  // This file is mainly for IDE support and additional plugin configuration
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  // Tailwind v4 handles dark mode through CSS custom properties
  darkMode: 'class',

  theme: {
    // In Tailwind v4, most theme customization is done in CSS via @theme
    // This section is for extending beyond what's defined in CSS
    extend: {
      // Add any additional customizations here if needed
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'Monaco', 'monospace'],
      },
    },
  },

  plugins: [
    // Add any additional plugins here
    // Note: Tailwind v4 has many built-in features that previously required plugins
  ],
} satisfies Config;

export default config;
