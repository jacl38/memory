/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"nebula": {
					900: "#0D060E",
					800: "#1A0E19",
					700: "#311E30",
					600: "#4B3349",
					500: "#6C4D6A",
					400: "#8D6A8A",
					300: "#AF87AB",
					200: "#D0A5CC",
					100: "#EABEE6",
					 50: "#FCD3F8",
				}
			}
		},
	},
	plugins: [],
}

