/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      colors: {
        bg: {
          base: "#080C10",
          surface: "#0D1117",
          elevated: "#161B22",
          overlay: "#1C2128",
        },
        border: {
          subtle: "#21262D",
          DEFAULT: "#30363D",
          strong: "#484F58",
        },
        accent: {
          cyan: "#39D0D8",
          purple: "#A371F7",
          green: "#3FB950",
          orange: "#F78166",
          blue: "#58A6FF",
        },
      },
      backgroundImage: {
        "glow-cyan": "radial-gradient(ellipse at center, rgba(57,208,216,0.15) 0%, transparent 70%)",
        "glow-purple": "radial-gradient(ellipse at center, rgba(163,113,247,0.15) 0%, transparent 70%)",
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "streak-in": {
          "0%": { width: "0%" },
          "100%": { width: "var(--streak-w)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.8s infinite linear",
      },
    },
  },
  plugins: [],
};
