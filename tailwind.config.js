/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      colors: {
        rappi: {
          orange: "#ff441f",
          coral: "#ff6b4a",
          peach: "#ff8a65",
          cream: "#fff5ec",
          sand: "#ffd9c7",
          graphite: "#1f2128"
        }
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at 12% 18%, rgba(255, 107, 74, 0.12), transparent 45%), radial-gradient(circle at 72% 12%, rgba(255, 195, 69, 0.12), transparent 50%), radial-gradient(circle at 24% 82%, rgba(33, 212, 179, 0.1), transparent 55%)",
        sunny: "linear-gradient(135deg, #fff7f0 0%, #fff3e8 45%, #fff0e2 75%, #fff0e0 100%)"
      }
    }
  }
};
