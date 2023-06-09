import { useState } from "react";
import SizeSelector from "../components/SizeSelector";
import { NavLink, useNavigate } from "react-router-dom";
import { tw } from "../utility/tailwindUtil";
import { motion } from "framer-motion";
import { useStopwatch } from "../hooks/useStopwatch";
import { useHighScore } from "../hooks/useHighScore";
import { formatMilliseconds } from "../utility/mathUtil";

const Home = () => {
	const [selectedSize, setSelectedSize] = useState<{w: number, h: number}>({w: 0, h: 0});
	const navigate = useNavigate();
	const [highScore] = useHighScore(
		`${Math.min(selectedSize.w, selectedSize.h)}x${Math.max(selectedSize.w, selectedSize.h)}`,
		true
	);

	const styles = {
		header: tw(
			`text-4xl font-bold`,
			`mt-4 mb-12`
		),
		sizeLabel: tw(
			`text-2xl font-bold`
		),
		playButton: {
			container: tw(
				`bg-stone-500 dark:bg-nebula-300`,
				`transition-colors`,
				`text-stone-50 dark:text-orange-100`,
				`w-64 p-2 my-12`,
				`rounded-full`,
				`relative`,
				`text-center font-bold text-3xl`,
			),
			chevron: tw(
				`absolute right-4`
			)
		}
	}

	return <>
		<NavLink reloadDocument to="/">
			<h1 className={styles.header}>Memory Match</h1>
		</NavLink>
		<h2 className={styles.sizeLabel}>
			{
				selectedSize.w == 0 || selectedSize.h == 0
					? "Select a board size"
					: <>{selectedSize.w} &times; {selectedSize.h}</>
			}
		</h2>
		
		<SizeSelector onSelect={setSelectedSize} />

		{
			selectedSize.w == 0 || selectedSize.h == 0
				? <></>
				: highScore == -1
					? <p>No best time yet!</p>
					: <p>Best: {formatMilliseconds(highScore)} <span className="text-sm">s</span></p>
		}


		<motion.button
			onClick={e => navigate(`/play?size=${selectedSize.w},${selectedSize.h}`)}
			className={styles.playButton.container}
			initial="disabled" whileHover="hover" whileTap="tap"
			animate={ selectedSize.w == 0 || selectedSize.h == 0 ? "disabled" : "rest" }
			variants={{
				rest: { scale: 1 },
				hover: { scale: 1.1 },
				tap: { scale: 0.9 },
				disabled: { scale: 0 }
			}}>
			Play
			<motion.span
				className={styles.playButton.chevron}
				variants={{
					rest: { opacity: 0, translateX: -20 },
					hover: { opacity: 1, translateX: 0 }
				}}>
				&#9656;
			</motion.span>
		</motion.button>
	</>
}

export default Home;