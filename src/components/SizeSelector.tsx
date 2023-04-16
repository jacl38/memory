import { motion } from "framer-motion";
import { useState } from "react";
import { tw } from "../utility/tailwindUtil";

const SizeSelector = (props: {
	onSelect?: (selectedSize: { w: number, h: number }) => any,
	onHover?: (hoveredSize: { w: number, h: number }) => any
}) => {
	const [selectedSize, setSelectedSize] = useState<{w: number, h: number}>({w: 0, h: 0});
	const [hoveredSize, setHoveredSize] = useState<{w: number, h: number}>({w: 3, h: 2});
	const [hovering, setHovering] = useState(false);
	
	const styles = {
		gridContainer: tw(
			`grid grid-cols-8`,
			`shrink-0`
		),
		selection: {
			border: tw(
				`border-2 border-stone-800 dark:border-white`,
				`rounded-lg`,
				`z-20`,
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
			(hoveredSize.w != -1 && hoveredSize.h != -1) ? <>

				<motion.div layout
					transition={{ duration: 0.2, ease: "backOut" }}
					style={{ gridArea: `1/1/${hoveredSize.h + 1}/${hoveredSize.w + 1}` }}
					className={styles.selection.border}></motion.div>

				<div
					style={{ gridArea: `${hoveredSize.h + 1}/${hoveredSize.w + 1}` }}
					className={styles.selection.labelContainer}>

					<motion.p layout
						style={{ textShadow: "black -1px 3px" }}
						transition={{ duration: 0.35, ease: "backOut" }}
						className={styles.selection.label}>
						{hoveredSize.w} &times; {hoveredSize.h}
					</motion.p>
					
				</div>
			</>
		: ""}

		{[...Array(8)].map((_, y) => {
			return [...Array(8)].map((_, x) => {
				const size = { w: y + 1, h: x + 1};
				const validSize = ((size.w) * (size.h)) % 2 == 0 && !(size.w * size.h <= 4);

				const selected = size.w <= selectedSize.w && size.h <= selectedSize.h;

				let color = `bg-stone-400 dark:bg-nebula-400 ${selectedSize.w == 0 || selectedSize.h == 0 ? "" : "opacity-50"}`;
				
				if(!validSize) color = "opacity-0";

				if(selected) color = `bg-stone-500 dark:bg-nebula-300 ${validSize ? "" : "opacity-60"}`

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