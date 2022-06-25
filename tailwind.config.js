/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					200: "#a2ceed",
					600: "#1775b9",
					700: "#2b74ba",
					800: "#19529a",
				},
				secondary: {
					300: "#e9eaeb",
					700: "#878888",
				},
			},
		},
	},
	plugins: [],
};
