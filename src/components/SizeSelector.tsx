import { motion } from "framer-motion";
import { useState } from "react";
import { tw } from "../utility/tailwindUtil";

const SizeSelector = (props: {
	onSelect?: (selectedSize: { x: number, y: number }) => any,
	onHover?: (hoveredSize: { x: number, y: number }) => any
}) => {
	const [selectedSize, setSelectedSize] = useState<{x: number, y: number}>({x: 0, y: 0});
	const [hoveredSize, setHoveredSize] = useState<{x: number, y: number}>({x: -1, y: -1});
	const [hovering, setHovering] = useState(false);
	
	const styles = {
		gridContainer: tw(
			`grid grid-cols-10`,
			`shrink-0`
		),
		selection: {
			border: tw(
				`border-2 border-stone-800 dark:border-white`,
				`rounded-lg`,
				`pointer-events-none`,
				`transition-colors`,
				hovering ? `opacity-100` : `opacity-0`,
				`transition-opacity`
			),
			labelContainer: tw(
				`z-10 pointer-events-none`,
				`relative`,
				hovering ? `opacity-100` : `opacity-0`,
				`transition-opacity`
			),
			label: tw(
				`absolute`,
				`whitespace-nowrap`,
				`px-3 py-0.5`,
				`rounded-full`,
				`text-white text-lg font-bold`,
				`bg-[#00000060]`
			)
		}
	}

	return <div className={styles.gridContainer} onMouseOver={e => setHovering(true)} onMouseLeave={e => setHovering(false)}>

		{
			(hoveredSize.x != -1 && hoveredSize.y != -1) ? <>

				<motion.div layout
					transition={{ duration: 0.2, ease: "backOut" }}
					style={{ gridArea: `1/1/${hoveredSize.x + 1}/${hoveredSize.y + 1}` }}
					className={styles.selection.border}></motion.div>

				<div
					style={{ gridArea: `${hoveredSize.x + 1}/${hoveredSize.y + 1}` }}
					className={styles.selection.labelContainer}>

					<motion.p layout
						style={{ textShadow: "black -1px 3px" }}
						transition={{ duration: 0.5, ease: "backOut" }}
						className={styles.selection.label}>
						{hoveredSize.x} &times; {hoveredSize.y}
					</motion.p>
					
				</div>
			</>
		: ""}

		{[...Array(10)].map((_, y) => {
			return [...Array(10)].map((_, x) => {
				const size = { x: x + 1, y: y + 1};
				const validSize = ((size.x) * (size.y)) % 2 == 0 && !(size.x <= 2 && size.y <= 2);

				const selected = size.x <= selectedSize.x && size.y <= selectedSize.y;

				let color = "bg-stone-400 dark:bg-nebula-400";
				
				if(!validSize) color = "opacity-0";

				if(selected) color = `bg-stone-600 dark:bg-nebula-300 ${validSize ? "" : "opacity-60"}`

				return <motion.button
					style={{
						gridArea: `${x + 1}/${y + 1}`
					}}
					className="group"
					whileHover={{scale: 1.25, transition: { duration: 0.1 }}}

					onHoverStart={e => {
						if(validSize) {
							setHoveredSize(size);
							props.onHover?.(size);
						}
					}}

					onClick={e => {
						setSelectedSize(hoveredSize);
						props.onSelect?.(hoveredSize);
					}}>

					<div className={tw(
						`group-hover:brightness-125`,
						`transition-all`,
						selected ? "scale-125" : "",
						color,
						`w-4 h-4`,
						`m-1`,
						`rounded-[20%]`
					)}>
					</div>
				</motion.button>;
			})
		})}
	</div>
}

export default SizeSelector;