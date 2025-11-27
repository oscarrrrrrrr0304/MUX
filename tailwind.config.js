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
        mesh: "radial-gradient(circle at 10% 20%, rgba(255, 107, 74, 0.28), transparent 42%), radial-gradient(circle at 70% 10%, rgba(255, 195, 69, 0.25), transparent 52%), radial-gradient(circle at 20% 80%, rgba(33, 212, 179, 0.25), transparent 55%)",
        sunny: "linear-gradient(135deg, #fff0e5 0%, #ffe3d1 45%, #ffd7c0 100%)"
      }
    }
  }
};
