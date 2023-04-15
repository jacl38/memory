import { tw } from "./utility/tailwindUtil";
import DarkToggle from "./components/DarkToggle";
import SizeSelector from "./components/SizeSelector";
import { useState } from "react";

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
		`flex max-md:flex-col items-center`
	),
	instructionContainer: tw(
		`flex flex-col items-center`,
		`p-8`
	),
	gameContainer: tw(
		`grow`,
		`p-8`,
		`flex items-center justify-center`
	)
}

const App = () => {
	const [selectedSize, setSelectedSize] = useState<{x: number, y: number}>({x: 0, y: 0});
	const [hoveredSize, setHoveredSize] = useState<{x: number, y: number}>({x: 0, y: 0});

	return <div className={styles.outerContainer}>
		<DarkToggle />
		<main className={styles.mainContainer}>
			<div className={styles.instructionContainer}>
				<p className="text-2xl my-4 font-bold">{selectedSize.x} &times; {selectedSize.y}</p>
				<SizeSelector onHover={setHoveredSize} onSelect={setSelectedSize} />
			</div>
			<div className={styles.gameContainer}>
				<div className="grid grid-cols-4 gap-4">
					<p>1</p>
					<p>2</p>
					<p>3</p>
					<p>4</p>
					<p>5</p>
					<p>6</p>
					<p>7</p>
					<p>8</p>
					<p>9</p>
					<p>10</p>
					<p>11</p>
					<p>12</p>
					<p>13</p>
					<p>14</p>
					<p>15</p>
					<p>16</p>
				</div>
			</div>
		</main>
		
	</div>
}

export default App;