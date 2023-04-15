import { motion } from "framer-motion";
import { tw } from "../utility/tailwindUtil";
import { remap } from "../utility/mathUtil";

const styles = {
	gridContainer: tw(
		`space-y-[2%]`,
		`bg-blue-500`,
		`flex flex-col`,
	),
	rowContainer: tw(
		`flex`,
		`grow`,
		`space-x-[2%]`,
		// `bg-green-400`
	),
	cell: tw(
		`grow`,
		`rounded-[10%]`,
		`relative`,
		`overflow-hidden`,
		`shadow-md shadow-nebula-800`,
		`hover:shadow-lg hover:shadow-nebula-800`,
		`hover:brightness-110`,
		`transition-[box-shadow,filter] duration-200`,
	)
}

const PuzzleGrid = (props: { children?: JSX.Element | JSX.Element[], scale: { w: number, h: number }, containerScale: { w: number, h: number } }) => {

	return <>
		{props.children}

		<div className={styles.gridContainer} style={{
			width: Math.min(props.containerScale.w, props.containerScale.h),
			height: Math.min(props.containerScale.w, props.containerScale.h)
		}}>
			{[...Array(props.scale.h)].map((_, y) => {
				const yFactor = y/(props.scale.h);
				const saturation = remap(yFactor, 0, 1, 0.3, 0.7) * 100;
				const lightness = remap(1-yFactor, 0, 1, 1, 0.23) * 100;

				return <div className={styles.rowContainer}>
					{[...Array(props.scale.w)].map((_, x) => {
						const xFactor = x/(props.scale.w);
						const hue = xFactor * 180 + 120;

						return <motion.button
							style={{
								backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
							}}
							className={styles.cell}
							whileHover={{ scale: 1.125, zIndex: 50 }}
							whileTap={{ scale: 0.9 }}
							transition={{ ease: "backOut" }}>
							<div
								className="w-11/12 h-3 absolute rounded-full -bottom-1 left-1/2 -translate-x-1/2 blur-sm"
								style={{
									backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness * 0.8}%)`
								}}></div>
							<div
								className="w-4/5 h-4/5 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 blur-md opacity-20"
								style={{
									backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness * 1.25}%)`
								}}></div>
						</motion.button>
					})}
				</div>
			})}
		</div>
	</>
}

// const PuzzleGrid = (props: { scale: { w: number, h: number } }) => {
// 	const [containerScale, setContainerScale] = useState<{w: number, h: number}>({w: 0, h: 0});
// 	const outerContainer = useRef<HTMLTableElement>(null);

// 	useEffect(() => {
// 		const handleResize = () => {
// 			setContainerScale({ w: outerContainer.current?.clientWidth ?? 0, h: outerContainer.current?.clientHeight ?? 0 })
// 		}

// 		window.addEventListener("resize", handleResize);

// 		return () => { window.removeEventListener("resize", handleResize); }
// 	});

// 	return <div ref={outerContainer} className={styles.outerContainer}>
// 		<table>
// 			<tbody
// 				style={{
// 					width: Math.min(containerScale.w, containerScale.h),
// 					height: Math.min(containerScale.w, containerScale.h)
// 				}}
// 				className={styles.gridContainer}>
// 				{[...Array(props.scale.h)].map((_, y) => {
// 					const yFactor = y/(props.scale.h);
// 					const saturation = remap(yFactor, 0, 1, 0.3, 0.7) * 100;
// 					const lightness = remap(1-yFactor, 0, 1, 1, 0.23) * 100;

// 					return <tr className={styles.rowContainer}>
// 						{[...Array(props.scale.w)].map((_, x) => {
// 							const xFactor = x/(props.scale.w);
// 							const hue = xFactor * 180 + 120;

// 							return <motion.td
// 								style={{
// 									backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
// 								}}
// 								className={styles.cell}
// 								whileHover={{ scale: 1.125, zIndex: 50 }}
// 								whileTap={{ scale: 0.9 }}
// 								transition={{ ease: "backOut" }}>
// 								<div
// 									className="w-11/12 h-3 absolute rounded-full -bottom-1 left-1/2 -translate-x-1/2 blur-sm"
// 									style={{
// 										backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness * 0.8}%)`
// 									}}></div>
// 								<div
// 									className="w-4/5 h-4/5 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 blur-md opacity-20"
// 									style={{
// 										backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness * 1.25}%)`
// 									}}></div>
// 								</motion.td>
// 						})}
// 					</tr>
// 				})}
// 			</tbody>
// 		</table>
// 	</div>
// }

// const PuzzleGrid = (props: { scale: { w: number, h: number } }) => {

// 	const aspectRatio = props.scale.w/props.scale.h;

// 	return <div className={styles.outerContainer}>
// 		<div className={styles.gridContainer}>
// 			{[...Array(props.scale.h)].map((_, y) => {
// 				const yFactor = y/(props.scale.h);

// 				const saturation = remap(yFactor, 0, 1, 0.3, 0.7) * 100;
// 				const lightness = remap(1-yFactor, 0, 1, 1, 0.23) * 100;

// 				return <div className={styles.rowContainer}>
// 					{[...Array(props.scale.w)].map((_, x) => {
// 						const xFactor = x/(props.scale.w);

// 						const hue = xFactor * 180 + 120;
						
// 						return <motion.button
// 							style={{
// 								backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
// 							}}
// 							className={styles.cell}
// 							whileHover={{ scale: 1.125, zIndex: 50 }}
// 							whileTap={{ scale: 0.9 }}
// 							transition={{ ease: "backOut" }}>
// 							<div
// 								className="w-11/12 h-3 absolute rounded-full -bottom-1 left-1/2 -translate-x-1/2 blur-sm"
// 								style={{
// 									backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness * 0.8}%)`
// 								}}></div>
// 							<div
// 								className="w-4/5 h-4/5 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 blur-md opacity-20"
// 								style={{
// 									backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness * 1.25}%)`
// 								}}></div>

// 						</motion.button>
// 				})}</div>;
// 			})}
// 		</div>
// 	</div>
// }

export default PuzzleGrid;