/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#020617", // fondo principal muy oscuro
        "weather-secondary": "#020617", // base para degradados
        "weather-accent": "#7c3aed", // morado neón
        "weather-accent-soft": "#a855f7", // morado más suave
      },
      fontFamily: {
        Roboto: ["Roboto", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      container: {
        padding: "1.5rem",
        center: true,
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
    }
  },
  plugins: [],
};

