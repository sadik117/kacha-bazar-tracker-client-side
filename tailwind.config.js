module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}" 
  ],
  darkMode: 'class',
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#388E3C",
          "secondary": "#FF9800",
          "accent": "#009688",
          "neutral": "#3D4451",
          "base-100": "#FAFAFA",
          "info": "#2196F3",
          "success": "#4CAF50",
          "warning": "#FFC107",
          "error": "#F44336",
        },
      },
      "dark", // enable default dark theme
    ],
    darkTheme: "dark", // activates dark mode when .dark class is applied
  },
};
