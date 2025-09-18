import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Poppins", "system-ui", "sans-serif"],
        heading: ["Poppins", "Inter", "system-ui", "sans-serif"]
      },
      colors: {
        // Updated color palette with calm dark theme
        primary: "#6D28D9", // purple for light theme
        "primary-dark": "#7C3AED", // calm purple for dark theme
        "primary-dark-hover": "#9F67FF", // hover state for dark theme
        secondary: "#B5EAEA", // mint green
        accent: "#A78BFA", // calm accent color
        
        // Background colors
        "background-light": "#F9FAFB",
        "background-dark": "#121826",
        
        // Card colors
        "card-light": "#FFFFFF",
        "card-dark": "#1E293B",
        
        // Text colors
        "text-light": "#1F2937",
        "text-dark": "#E2E8F0",
        "text-muted-light": "#4B5563",
        "text-muted-dark": "#94A3B8",
        
        // Border colors
        "border-light": "#E5E7EB",
        "border-dark": "#334155",
        
        // Input colors
        "input-light": "#FFFFFF",
        "input-dark": "#1E293B",
        
        // Semantic color mappings (will be overridden by CSS variables)
        background: "var(--background)",
        foreground: "var(--foreground)",
        "foreground-muted": "var(--foreground-muted)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        border: "var(--border)",
        input: "var(--input)"
      },
      borderRadius: {
        lg: "0.75rem", // 12px
        md: "0.625rem", // 10px
        sm: "0.5rem" // 8px
      },
      boxShadow: {
        "soft": "0 2px 8px rgba(0, 0, 0, 0.04)",
        "soft-lg": "0 4px 16px rgba(0, 0, 0, 0.08)",
        "calm": "0 1px 3px rgba(124, 58, 237, 0.12)"
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config;