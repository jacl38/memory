import { tw } from "../utility/tailwindUtil";
import DarkToggle from "../components/DarkToggle";
import SizeSelector from "../components/SizeSelector";
import { useEffect, useRef, useState } from "react";
import GameBoard from "../components/GameBoard";
import { NavLink } from "react-router-dom";
import { useStopwatch } from "../hooks/useStopwatch";
import { formatMilliseconds } from "../utility/mathUtil";
import { motion, useAnimation } from "framer-motion";
import { ClockIcon } from "@heroicons/react/24/solid";
import { useHighScore } from "../hooks/useHighScore";

const styles = {
	outerContainer: tw(
		`h-full p-8`,
		`bg-stone-200 dark:bg-nebula-700`,
		`text-nebula-700 dark:text-orange-50`,
		`transition-colors`,
		`relative`,
		`overflow-clip`,
		`flex`
	),
	mainContainer: tw(
		`grow`,
		`overflow-auto`,
		`z-10`,
		`flex flex-col items-center`
	),
	instructionContainer: tw(
		`shrink-0`,
		`flex flex-col items-center`,
		`p-8`
	),
	gameContainer: tw(
		`overflow-hidden`,
		`w-full h-full`,
		`flex items-center justify-center`,
		// `bg-blue-500`
	),
	header: {
		container: tw(
			`flex flex-col items-center`,
			`w-full`,
			`relative`
		),
		title: tw(
			`text-2xl font-bold`,
			`my-4`,
		),
		stopwatch: tw(
			`text-3xl font-bold`,
			`mb-3`,
		),
		backButton: tw(
			`absolute left-4`,
			`font-bold`,
			`hover:scale-125 transition-transform ease-out`
		)
	},
	completeModal: {
		container: tw(
			`backdrop-blur-md`,
			`absolute`,
			`top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`,
			`w-11/12 max-w-[36rem]`,
			`p-4`,
			`border-4`,
			`border-stone-400 bg-stone-200 bg-opacity-50 hover:bg-opacity-75`,
			`dark:border-nebula-700 dark:bg-nebula-500 dark:bg-opacity-50 hover:dark:bg-opacity-75`,
			`transition-colors`,
			`rounded-3xl`
		),
		title: tw(
			`text-center`,
			`text-2xl font-extrabold`,
			`pt-2`
		),
		subtitle: tw(
			`text-center`,
			`font-bold`
		),
		label: tw(
			`text-center`,
			`text-xl font-extrabold`,
			`px-6 py-1`
		)
	}
}

const Game = () => {
	const gameContainer = useRef<HTMLDivElement>(null);
	const [gameContainerScale, setGameContainerScale] = useState<{w: number, h: number}>({w: 0, h: 0});
	const [gameSize, setGameSize] = useState<{w: number, h: number}>({w: 0, h: 0});

	const [elapsed, setStopwatchEnabled, resetStopwatch] = useStopwatch();
	const stopwatchRef = useRef<HTMLParagraphElement>(null);

	const stopwatchAnimation = useAnimation();
	const completeModalAnimation = useAnimation();
	const [highScore, addHighScore, newBestScore] = useHighScore(
		`${Math.min(gameSize.w, gameSize.h)}x${Math.max(gameSize.w, gameSize.h)}`,
		true
	);

	useEffect(() => {
		const handleResize = () => {
			setGameContainerScale({ w: gameContainer.current?.clientWidth ?? 0, h: gameContainer.current?.clientHeight ?? 0 })
		}
		handleResize();

		window.addEventListener("resize", handleResize);

		return () => { window.removeEventListener("resize", handleResize); }
	}, []);

	const validDimensions = (w: number, h: number) => {
		const evenCardCount = (w * h) % 2 == 0;
		const bigEnoughGrid = !(w * h <= 4);
		const withinMaxDimensions = w <= 8 && h <= 8;
		return evenCardCount && bigEnoughGrid && withinMaxDimensions;
	}

	useEffect(() => {
		const dimensionsFromUrl = new URLSearchParams(window.location.search).get("size") ?? "4,4";
		const foundDimensions = dimensionsFromUrl.split(",").map(c => parseInt(c));
		const dimensions = validDimensions(foundDimensions[0], foundDimensions[1]) ? foundDimensions : [4, 4];
		if(dimensions[0] != gameSize.w || dimensions[1] != gameSize.h
		&& !(isNaN(dimensions[0]) || isNaN(dimensions[1]))) setGameSize({ w: dimensions[0], h: dimensions[1] });
	}, []);
	
	return <>
		<header className={styles.header.container}>
			<NavLink className={styles.header.backButton} to="/">&lsaquo; Back</NavLink>
			<h1 className={styles.header.title}>Memory Match</h1>
			
			<div className="h-12">
				<motion.p
					ref={stopwatchRef}
					initial={{
						position: "fixed",
						translateX: "-50%", translateY: "calc(-50% + 20px)",
						fontSize: "1.875rem"
					}}
					animate={stopwatchAnimation}
					className={styles.header.stopwatch}>
						{formatMilliseconds(elapsed)} <span className="text-2xl">s</span>
				</motion.p>
			</div>
		</header>

		<div ref={gameContainer} className={styles.gameContainer}>
			<GameBoard
				gameSize={gameSize}
				containerScale={gameContainerScale}
				onSelect={i => setStopwatchEnabled(true)}
				onComplete={async () => {
					setStopwatchEnabled(false);
					const newBest = addHighScore(elapsed);
					completeModalAnimation.start({
						scale: 1
					});
					stopwatchAnimation.start({
						zIndex: "100",
						top: "50%",
						left: "50%",
						translateY: "-50%",
						transition: { type: "spring" },
						fontSize: "2.5rem"
					})
					for(let i = 0; i < 3; i++) {
						await stopwatchAnimation.start({ rotate: -3 });
						await stopwatchAnimation.start({ rotate: 3 });
					}
					await stopwatchAnimation.start({ rotate: 0 })
				}}/>
		</div>

		<motion.div
			initial={{ scale: 0, position: "absolute", top: "50%", left: "50%", translateX: "-50%", translateY: "-50%" }}
			animate={completeModalAnimation}
			className={styles.completeModal.container}>
			<p className={styles.completeModal.title}>{newBestScore ? "New best!" : "Done!"}</p>
			<div className="h-48 py-8 relative flex flex-col-reverse">
				<ClockIcon className="absolute top-1/2 -translate-y-1/2 w-24 h-24 -rotate-12 text-stone-600 dark:text-orange-100 max-sm:opacity-50 transition-all" />
				{
					newBestScore || highScore == -1
					? <></>
					: <p className={styles.completeModal.subtitle}>Best: {formatMilliseconds(highScore)} <span className="text-xs">s</span></p>
				}
			</div>
			<div className="w-full flex justify-around border-t-2 border-stone-400 dark:border-nebula-600 transition-colors pt-3">
				<NavLink className={styles.completeModal.label} to="/">Back</NavLink>
				<NavLink className={styles.completeModal.label} reloadDocument to={`/play?size=${gameSize.w},${gameSize.h}`}>Reset</NavLink>
			</div>
		</motion.div>
	</>
}

export default Game;