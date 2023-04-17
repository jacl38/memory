import { motion } from "framer-motion";
import { tw } from "../utility/tailwindUtil";
import { useEffect, useState } from "react";
import cardBackImg from "../assets/polka-dots.svg";
import { AcademicCapIcon, ArrowDownCircleIcon, ArrowLeftCircleIcon, ArrowRightCircleIcon, ArrowUpCircleIcon, BeakerIcon, BellIcon, BoltIcon, BookOpenIcon, BugAntIcon, BuildingLibraryIcon, BuildingOffice2Icon, CakeIcon, CameraIcon, ChartPieIcon, ChatBubbleLeftEllipsisIcon, CheckBadgeIcon, ClockIcon, CloudIcon, Cog6ToothIcon, CubeIcon, CurrencyDollarIcon, EyeIcon, FaceFrownIcon, FaceSmileIcon, GiftIcon, HandThumbUpIcon, HeartIcon, LightBulbIcon, MoonIcon, RocketLaunchIcon, TvIcon } from "@heroicons/react/24/solid";
import { shuffleArray } from "../utility/mathUtil";

const frontIcons = [
	<AcademicCapIcon />,
	<ArrowDownCircleIcon />,
	<ArrowLeftCircleIcon />,
	<ArrowUpCircleIcon />,
	<ArrowRightCircleIcon />,
	<BeakerIcon />,
	<Cog6ToothIcon />,
	<EyeIcon />,
	<BellIcon />,
	<BoltIcon />,
	<BookOpenIcon />,
	<BugAntIcon />,
	<BuildingLibraryIcon />,
	<BuildingOffice2Icon />,
	<CakeIcon />,
	<CameraIcon />,
	<ChatBubbleLeftEllipsisIcon />,
	<ChartPieIcon />,
	<CheckBadgeIcon />,
	<ClockIcon />,
	<CloudIcon />,
	<CubeIcon />,
	<CurrencyDollarIcon />,
	<FaceSmileIcon />,
	<FaceFrownIcon />,
	<GiftIcon />,
	<HandThumbUpIcon />,
	<HeartIcon />,
	<LightBulbIcon />,
	<MoonIcon />,
	<RocketLaunchIcon />,
	<TvIcon />,
]

const GameBoard = (props: { containerScale: { w: number, h: number }, gameSize: { w: number, h: number } }) => {
	const aspectRatio = props.gameSize.w / props.gameSize.h;
	const fitAspectRatio = props.containerScale.w / props.containerScale.h;
	const fitToWidth = aspectRatio > fitAspectRatio;

	const [cards, setCards] = useState<number[]>([]);
	const [iconIndices, setIconIndices] = useState<number[]>([]);
	const [flipped, setFlipped] = useState<number[]>([]);

	useEffect(() => {
		setIconIndices(
			shuffleArray( [...Array(32)].map((_, i) => i), Date.now() )
				.slice(0, props.gameSize.w * props.gameSize.h / 2));
		
		const newCards: number[] = [];
		for(let i = 0; i < props.gameSize.w * props.gameSize.h; i++) {
			let cardValue = Math.floor(Math.random() * props.gameSize.w * props.gameSize.h / 2);
			while(newCards.filter(v => v == cardValue).length >= 2) {
				cardValue = Math.floor(Math.random() * props.gameSize.w * props.gameSize.h / 2);
			}
			newCards.push(cardValue);
		}
		setCards(newCards);
	}, [props.gameSize]);

	const flipCard = (index: number) => {
		setFlipped(currentFlipped => [...new Set([...currentFlipped, index])]);
	}

	const resetCard = (index: number) => {
		setFlipped(currentFlipped => currentFlipped.filter(i => i != index));
	}

	const styles = {
		gridContainer: tw(`grid grid-cols-4 gap-[0.5vw]`),
		cell: {
			shadow: tw(
				`bg-gradient-to-br from-stone-800 dark:from-nebula-800 to-transparent`,
				`opacity-0 group-hover:opacity-50`,
				`transition-all duration-[400ms] ease-out`,
				`absolute inset-0 z-50`,
			),
			base: tw(
				`border-4 border-stone-400 dark:border-nebula-800`,
				`bg-stone-300 dark:bg-nebula-600`,
				`rounded-[20%]`,
				`p-[5%]`,
				`w-full h-full`,
				`transition-colors`,
				`overflow-hidden`,
				`absolute`
			),
			back: tw(
				`bg-stone-300`,
				`box-border`,
			)
		}
	}

	return <div
		style={{
			width: fitToWidth ? props.containerScale.w : props.containerScale.h * aspectRatio,
			height: fitToWidth ? props.containerScale.w / aspectRatio : props.containerScale.h,
			gridTemplateColumns: `repeat(${props.gameSize.w}, minmax(0, 1fr))`,
			gridTemplateRows: `repeat(${props.gameSize.h}, minmax(0, 1fr))`,
			// perspective: 1000
		}}
		className={styles.gridContainer}>
		{[...Array(props.gameSize.w * props.gameSize.h)].map((_, i) => {
			const cardIsFlipped = flipped.includes(i);

			return <motion.button
				onClick={e => { flipCard(i); }}
				initial={ cardIsFlipped ? "flipped" : "rest" } whileHover={cardIsFlipped ? "flipped" : "hover"} animate={cardIsFlipped ? "flipped" : "rest"}
				className="group relative"
				style={{transformStyle: "preserve-3d"}}>
				<motion.div
					variants={{
						"rest": {
							rotateX: 0,
							rotateY: 180,
							rotateZ: 0,
							scale: 1
						},
						"hover": {
							rotateX: 10,
							rotateY: 135,
							rotateZ: 0,
							scale: 0.95,
							transition: { type: "spring" }
						},
						"flipped": {
							rotateX: 0,
							rotateY: 0,
							rotateZ: 0,
							scale: 1,
							transition: { type: "spring" }
						}
					}}
					className="w-full h-full">
					<div
						className={tw(styles.cell.base, styles.cell.back)}
						style={{
							backfaceVisibility: "visible",
							transform: "rotateY(180deg)",
							backgroundImage: `url(${cardBackImg})`,
							backgroundSize: 20 - (props.gameSize.w * props.gameSize.h) / 6
						}}
					>
						<div className={tw(styles.cell.shadow, cardIsFlipped ? "hidden" : "")}></div>
					</div>
					<div className={styles.cell.base} style={{ backfaceVisibility: "hidden" }}>
						{cardIsFlipped ? <p className="animate-fadeIn text-stone-600 dark:text-orange-100 transition-colors duration-500">
							{frontIcons[iconIndices[cards[i]]]}
						</p> : ""}
					</div>

				</motion.div>
			</motion.button>
		})}
	</div>
}

export default GameBoard;