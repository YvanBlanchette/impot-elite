/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				vert: {
					50: "#e6f2ec",
					100: "#c0ddd0",
					200: "#8dc2aa",
					300: "#5aa784",
					400: "#2d9163",
					500: "#006838",
					600: "#005c31",
					700: "#004d28",
					800: "#003d1f",
					900: "#002e16",
				},
				or: {
					50: "#fdf8e7",
					100: "#faedbe",
					200: "#f5db7a",
					300: "#efc73a",
					400: "#d4a820",
					500: "#c9a227",
					600: "#b08a1e",
					700: "#8f6f16",
					800: "#6e540f",
					900: "#4e3a08",
				},
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
