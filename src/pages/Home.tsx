import { useState } from "react";
import SizeSelector from "../components/SizeSelector";
import { NavLink, useNavigate } from "react-router-dom";
import { tw } from "../utility/tailwindUtil";
import { motion } from "framer-motion";

const Home = () => {
	const [selectedSize, setSelectedSize] = useState<{w: number, h: number}>({w: 0, h: 0});
	const navigate = useNavigate();

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
				selectedSize.w == 0 || selectedSize.h == 0 ? "hidden" : "",
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

		<motion.button
			onClick={e => navigate(`/play?size=${selectedSize.w},${selectedSize.h}`)}
			className={styles.playButton.container}
			initial="rest" whileHover="hover" animate="rest" whileTap="tap"
			variants={{
				rest: { scale: 1 },
				hover: { scale: 1.1 },
				tap: { scale: 0.9 }
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