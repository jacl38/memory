/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			keyframes: {
				fadeIn: {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0px)', opacity: '1' }
				}
			},

			animation: {
				'fadeIn': 'fadeIn 0.5s'
			},

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

