/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#080B12",
        surface: "#0E1420",
        "surface-2": "#141B2A",
        signal: {
          invest: "#00F5A0",
          pass: "#FF3B5C",
          watch: "#FFC400",
        },
        neon: {
          cyan: "#00E5FF",
          violet: "#7C5CFF",
          gold: "#FFC400",
        },
        ink: {
          DEFAULT: "#E7ECF5",
          muted: "#8B96AC",
          faint: "#5A6478",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "neon-cyan": "0 0 20px rgba(0,229,255,0.35), 0 0 60px rgba(0,229,255,0.12)",
        "neon-invest": "0 0 20px rgba(0,245,160,0.4), 0 0 70px rgba(0,245,160,0.15)",
        "neon-pass": "0 0 20px rgba(255,59,92,0.4), 0 0 70px rgba(255,59,92,0.15)",
        "neon-violet": "0 0 20px rgba(124,92,255,0.35), 0 0 60px rgba(124,92,255,0.12)",
        glass: "0 8px 32px rgba(0,0,0,0.35)",
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 20% 0%, rgba(124,92,255,0.18), transparent 45%), radial-gradient(circle at 85% 15%, rgba(0,229,255,0.14), transparent 40%), radial-gradient(circle at 50% 100%, rgba(0,245,160,0.10), transparent 45%)",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.55 },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        floatUp: {
          "0%": { transform: "translateY(8px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      animation: {
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
        scanline: "scanline 2.4s linear infinite",
        floatUp: "floatUp 0.5s ease forwards",
      },
    },
  },
  plugins: [],
};
