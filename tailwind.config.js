/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translateX(10px)" },
          "50%": { transform: "translate(10px, -10px)" },
          "75%": { transform: "translateX(-10px)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("daisyui")], // ✅ Add DaisyUI plugin
  daisyui: {
    themes: ["light", "dark"], // ✅ Configure DaisyUI themes
  },
};
