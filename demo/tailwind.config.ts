import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'neon-pink': '#ff006e',
        'neon-blue': '#00f5ff',
        'neon-cyan': '#00ffff',
        'neon-purple': '#b537f2',
        'neon-green': '#39ff14',
        'neon-orange': '#ff9e00',
        'neo-bg': '#0a0a0f',
        'neo-surface': '#1a1a2e',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        'neon-pink': '0 0 10px #ff006e, 0 0 20px #ff006e, 0 0 30px #ff006e',
        'neon-blue': '0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 30px #00f5ff',
        'neon-cyan': '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff',
        'neon-purple': '0 0 10px #b537f2, 0 0 20px #b537f2, 0 0 30px #b537f2',
      },
    },
  },
  plugins: [],
};

export default config;
