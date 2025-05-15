// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: { extend: {} },
  plugins: [
    require("tailwindcss-primeui"), // ← PrimeUI integration :contentReference[oaicite:3]{index=3}
  ],
};
