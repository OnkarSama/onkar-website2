import { heroui } from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)"],
                mono: ["var(--font-mono)"],
            },
            backgroundImage: {
                'button-bg': 'linear-gradient(135deg, #3b82f6, #06b6d4)', // your gradient
            },
        },
    },
    darkMode: "class",
    plugins: [
        heroui({
            prefix: "heroui",
            addCommonColors: true,
            defaultTheme: "dark",
            defaultExtendTheme: "dark",
            layout: {},
            themes: {
                light: {
                    layout: {},
                    colors: {
                        background: "#F3E8FF", // Soft lavender
                        subheading: "#7C3AED", // Purple accents (formerly foreground)
                        heading: "#5B21B6", // Darker purple for headings
                        primary: "#8B5CF6",
                        secondary: "#A78BFA",
                        hover: "#E9D5FF", // Light purple hover effect
                        text: "#374151", // Dark gray text color for light mode
                    },
                },
                dark: {
                    layout: {},
                    colors: {
                        background: "#000000", // Black background
                        subheading: "#C4B5FD", // Soft purple subheading (formerly foreground)
                        heading: "#6D28D9", // Darker purple for headings
                        primary: {
                            DEFAULT: "#8B5CF6", // Bright purple primary
                            foreground: "#FFFFFF",
                        },
                        accent: "#7C3AED",
                        hover: "#581C87", // Dark purple hover effect
                        text: "#D1D5DB", // Soft gray text color for dark mode
                    },
                },
            }
        })
    ],
}

module.exports = config