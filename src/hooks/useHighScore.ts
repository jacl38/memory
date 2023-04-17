import { useEffect, useState } from "react";

export const useHighScore = (key: string, lowScore: boolean = false) => {
	const [storedScore, _setStoredScore] = useState<number>(-1);

	useEffect(() => {
		try {
			const item = window.localStorage.getItem(key);
			console.log(`found ${key}/${item}`);
			_setStoredScore(item ? JSON.parse(item) : -1);
		} catch(e) { console.log(e); }
	}, [key]);

	const setStoredScore = (score: number) => {
		try {
			window.localStorage.setItem(key, JSON.stringify(score));
		} catch(e) { console.error(e); }
	}
	
	const [newBest, setNewBest] = useState(false);

	const addScore = (score: number) => {
		const isNewScore = storedScore == -1 || storedScore == null;
		const isBestScore = (lowScore && score < storedScore) || (!lowScore && score > storedScore);
		
		if(isBestScore || isNewScore) {
			setStoredScore(score);
		}
		if(isBestScore && !isNewScore) setNewBest(true);
		return isBestScore && !isNewScore;
	}

	return [storedScore, addScore, newBest] as const;
}