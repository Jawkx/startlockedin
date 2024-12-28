import { useState, useEffect, useCallback } from "react";
import { getLast24hTimer, saveTimer } from "../utils/db";

const SAVE_INTERVAL = 5;

export const useTimer = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		getLast24hTimer().then((savedSeconds) => {
			if (savedSeconds !== null) {
				setSeconds(savedSeconds);
			}
		});
	}, []);

	useEffect(() => {
		let interval: number | undefined;

		if (isPlaying) {
			interval = window.setInterval(() => {
				setSeconds((s) => s + 1);
			}, 1000);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isPlaying]);

	useEffect(() => {
		if (isPlaying && seconds !== 0 && seconds % SAVE_INTERVAL === 0) {
			saveTimer(seconds);
		}
	}, [seconds, isPlaying]);

	const toggle = useCallback(() => {
		setIsPlaying((prev) => !prev);
	}, []);

	return { isPlaying, toggle, seconds };
};
