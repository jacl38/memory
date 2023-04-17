import { useRef, useState } from "react";

export const useStopwatch = () => {
	const [elapsed, setElapsed] = useState(0);

	const timer = useRef<NodeJS.Timer>();
	const previousTime = useRef(0);

	const setEnabled = (active: boolean) => {
		if(active) {
			previousTime.current = Date.now();
			timer.current = setInterval(() => {
				const dt = Date.now() - previousTime.current;
				setElapsed(t => t + dt);
				previousTime.current = Date.now();
			}, 100);
		} else {
			clearInterval(timer.current);
		}
	}

	const reset = () => {
		clearInterval(timer.current);
		setElapsed(0);
	}

	return [elapsed, setEnabled, reset] as const;
}