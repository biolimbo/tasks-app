/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					200: "#a2ceed",
					600: "#1775b9",
				},
			},
		},
	},
	plugins: [],
};
