/** @type {import('tailwindcss').Config} */

import {fontFamily  } from "tailwindcss/defaultTheme"

export const darkMode = ["class"]
export const content = [
  './pages/**/*.{js,jsx}',
  './components/**/*.{js,jsx}',
   './AppComponents/**/*.{js,jsx}',
  './app/**/*.{js,jsx}',
  './src/**/*.{js,jsx}',
]
export const safelist = [
   'bg-pink-500', 'text-pink-700', 'border-pink-600' , 'bg-pink-100', 
   'text-pink-700', 'text-pink-900', 'bg-success-100', 'bg-success-700', 'text-success-700', 'text-success-900', 'bg-pink-700', 'text-pink-700', 
    'bg-green-600', 'text-success-700', 'border-success-600',
    'bg-pink-25', 'bg-success-25', 'bg-blue-25', 'bg-blue-100', 'text-blue-900', 'text-blue-700',
    'bg-red-700', 'text-red-700', 'border-red-700',
    'bg-emerald-600', 'text-emerald-700', 'border-emerald-600',
    'bg-blue-500', 'text-blue-700', 'border-[#0047AB]', "bg-[#0047AB]", "text-[#0047AB]",
    'bg-gray-500', 'text-[#344054]', 'bg-[#F2F4F7]', 'border-[#F2F4F7]', '"bg-yellow-800"', 'text-yellow-700', 'border-yellow-800'
]
export const prefix = ""
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
   

     fontFamily: {
      inter: "var(--font-inter)",
      "ibm-plex-serif": "var(--font-ibm-plex-serif)",
      exile: "var(--font-exile)",
    },

    border: {
      bankGradient: "1px solid var(--bank-gradient)",
    },

    backgroundImage: {
      "gradient-mesh": "url('/icons/gradient-mesh.svg')",
      "bank-gradient": "#700e01",
      "authbg": "url('/icons/bank.jpg')",
    },
    colors: {
      dom: "#f7f4f4",
      sec: "#552834",
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },

       success: {
          25: "#F6FEF9",
          50: "#ECFDF3",
          100: "#D1FADF",
          600: "#039855",
          700: "#027A48",
          900: "#054F31",
        },
        pink: {
          25: "#FEF6FB",
          100: "#FCE7F6",
          500: "#EE46BC",
          600: "#DD2590",
          700: "#C11574",
          900: "#851651",
        },
        blue: {
          25: "#F5FAFF",
          100: "#D1E9FF",
          500: "#2E90FA",
          600: "#1570EF",
          700: "#175CD3",
          900: "#194185",
        },
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },

    boxShadow: {
      form: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
      chart: "0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)",
      profile: "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
      creditCard: "8px 10px 16px 0px rgba(0, 0, 0, 0.05)",
    },


    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
  },
}
export const plugins = [require("tailwindcss-animate")]