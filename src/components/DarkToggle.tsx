import { motion, useAnimation, useAnimationControls } from "framer-motion";
import { useDarkMode } from "../hooks/useDarkMode";
import { tw } from "../utility/tailwindUtil";
import { LightBulbIcon, MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const DarkToggle = () => {
	const [darkMode, setDarkMode] = useDarkMode();
	const buttonAnimation = useAnimation();
	const iconAnimation = useAnimation();
	const [animating, setAnimating] = useState(false);

	const setColorScheme = async (dark: boolean) => {
		if(animating) return;
		setAnimating(true);
		await buttonAnimation.start({ scale: 0, transition: { duration: 0.1, ease: "backIn" } });
		setDarkMode(dark);
		buttonAnimation.set({ zIndex: 5 });
		buttonAnimation.set({ scale: 50 });
		iconAnimation.set({ opacity: 0, scale: 0, rotate: -90 });
		await buttonAnimation.start({ scale: 1, transition: { duration: 0.5, ease: "anticipate" } });
		buttonAnimation.set({ zIndex: 100 })
		await iconAnimation.start({ opacity: 0.99, scale: 1, rotate: 0, transition: { duration: 0.25, ease: "backOut" } });
		setAnimating(false);
	}

	return <motion.button
		animate={buttonAnimation}
		onClick={e => setColorScheme(!darkMode)}
		// whileHover={{ scale: 1.1 }}
		style={{zIndex: 100}}
		className={tw(
			`absolute`,
			`w-20 h-20`,
			`max-sm:w-16 max-sm:h-16`,
			`origin-center`,
			`rounded-full`,
			`left-4 bottom-4`,
			`bg-nebula-700 dark:bg-stone-200`,
			`shadow-sm hover:shadow-md`,
			`shadow-stone-500 hover:shadow-stone-500`,
			`dark:shadow-nebula-900 dark:hover:shadow-nebula-900`,
			`transition-shadow ease-in`,
			`flex justify-center`,
			`p-4`
		)}>
			<motion.div
				animate={iconAnimation}
				className="w-full h-full text-stone-200 dark:text-nebula-600 opacity-[0.99]">
				{darkMode ? <LightBulbIcon /> : <MoonIcon />}
			</motion.div>
	</motion.button>
}

export default DarkToggle;