import React from "react";
import CodeBackground from "./components/CodeBackground";
import MusicPlayer from "./components/MusicPlayer";
import { useTimer } from "./hooks/useTimer";
import { initDB } from "./utils/db";

function App() {
	const { isPlaying, toggle, seconds } = useTimer();

	React.useEffect(() => {
		initDB();
	}, []);

	return (
		<div className="min-h-screen bg-black flex relative overflow-hidden">
			<CodeBackground isPlaying={isPlaying} />
			<MusicPlayer isPlaying={isPlaying} onToggle={toggle} seconds={seconds} />
		</div>
	);
}

export default App;
