import { tw } from "../utility/tailwindUtil";
import DarkToggle from "../components/DarkToggle";
import SizeSelector from "../components/SizeSelector";
import { useEffect, useRef, useState } from "react";
import GameBoard from "../components/GameBoard";
import { NavLink } from "react-router-dom";
import { useStopwatch } from "../hooks/useStopwatch";

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
			`flex justify-center`,
			`w-full`,
			`relative`
		),
		title: tw(
			`text-2xl font-bold`,
			`my-4`,
			`transition-colors`
		),
		backButton: tw(
			`absolute left-4`,
			`font-bold`,
			`hover:scale-125 transition-transform ease-out`
		)
	}
}

const Game = () => {
	const gameContainer = useRef<HTMLDivElement>(null);
	const [gameContainerScale, setGameContainerScale] = useState<{w: number, h: number}>({w: 0, h: 0});
	const [gameSize, setGameSize] = useState<{w: number, h: number}>({w: 0, h: 0});

	const [elapsed, setStopwatchEnabled, resetStopwatch] = useStopwatch();

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
			<h1 className={styles.header.title}>Memory Match</h1>
			<NavLink className={styles.header.backButton} to="/">&lsaquo; Back</NavLink>
		</header>

		<div ref={gameContainer} className={styles.gameContainer}>
			<GameBoard gameSize={gameSize} containerScale={gameContainerScale} />
		</div>
		
	</>
}

export default Game;