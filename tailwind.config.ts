import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Includes all files inside src/
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        gray: "#475467",
        gray1: "#4B4D50",
        gray2: "#EAECF0",
        gray3: "#667085",
        gray4: "#98A2B3",
        gray5:"#F9FAFB",
        gray6:"#D0D5DD",
        gray7:"#4A4A4A",
        gray8:"#FCFCFD",
        gray9:"#F2F4F7",
        gray10:"#E3E8EF",
        gray11:"#DFE3E8",
        gray12:'#EFF1F5',
        gray13:'#404968',
        black1: "#101828",
        black2:"#344054",
        black3:"#0C111D",
        red: "#FB0101",
        red1:'#D92D20',
        red2:'#FEF3F2',
        red3:'#B42318',
        red4:'#FECDCA',
        redDisabled:'#F97066',
        green: "#17B26A",
        green1:"#F6FEF9",
        green2:"#ECFDF3",
        green3:'#DCFAE6',
        btnBlack: "#111322",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        
      },
      boxShadow: {
        xs: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)", 
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
