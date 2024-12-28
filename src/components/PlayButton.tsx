import React from "react";
import { Play, Pause } from "lucide-react";

interface PlayButtonProps {
	isPlaying: boolean;
	onToggle: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({ isPlaying, onToggle }) => {
	return (
		<button
			type="button"
			onClick={onToggle}
			className="w-16 h-16 flex items-center justify-center transition-colors"
		>
			{isPlaying ? (
				<Pause size={32} className="text-emerald-500" />
			) : (
				<Play size={32} className="text-emerald-500 ml-1" />
			)}
		</button>
	);
};

export default PlayButton;
