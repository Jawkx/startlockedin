import React from "react";
import PlayButton from "./PlayButton";
import Timer from "./Timer";
import ReactPlayer from "react-player/youtube";
import { saveMusicLink, getSavedMusicLink } from "../utils/db";

const DEFAULT_YOUTUBE_LINK = "https://www.youtube.com/watch?v=6rvv8bU3pKA";
interface MusicPlayerProps {
	isPlaying: boolean;
	onToggle: () => void;
	seconds: number;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
	isPlaying,
	onToggle,
	seconds,
}) => {
	const [musicYoutubeLink, setMusicYoutubeLink] =
		React.useState(DEFAULT_YOUTUBE_LINK);

	React.useEffect(() => {
		const loadSavedMusic = async () => {
			const savedLink = await getSavedMusicLink();
			if (savedLink) {
				setMusicYoutubeLink(savedLink);
			}
		};
		loadSavedMusic();
	}, []);

	const [input, setInput] = React.useState("");

	const handleChangeMusic = async () => {
		setMusicYoutubeLink(input);
		await saveMusicLink(input);
		setInput("");
	};

	const handleOnMusicPause = () => {
		if (isPlaying) onToggle();
	};

	const handleOnMusicPlay = () => {
		if (!isPlaying) onToggle();
	};

	return (
		<div className="bg-black/40 backdrop-blur-sm p-8 flex-1 flex flex-col justify-center items-center">
			<ReactPlayer
				url={musicYoutubeLink}
				playing={isPlaying}
				style={{ visibility: "hidden", position: "absolute" }}
				loop={true}
				onPlay={handleOnMusicPlay}
				onPause={handleOnMusicPause}
			/>
			<h2 className="text-green-400 text-xl font-mono mb-2">
				{seconds === 0 ? "Ready to lock in?" : "Locked in for"}
			</h2>
			{isPlaying || seconds > 0 ? <Timer time={seconds} /> : null}

			{seconds > 0 ? (
				<h2 className="text-green-400 text-xl font-mono mb-2 my-2">
					Last 24 hour
				</h2>
			) : null}

			<PlayButton isPlaying={isPlaying} onToggle={onToggle} />
			<input
				type="text"
				placeholder={musicYoutubeLink}
				className={
					"bg-transparent border-b border-emerald-500 placeholder-emerald-500/40 text-emerald-500 w-96 focus:outline-none"
				}
				value={input}
				onChange={(e) => setInput(e.currentTarget.value)}
			/>

			<button
				type="button"
				className="text-emerald-500 border border-emerald-500 p-2 mt-4 hover:animate-pulse hover:animate-infinite duration-100"
				onClick={handleChangeMusic}
			>
				Change Music
			</button>
		</div>
	);
};

export default MusicPlayer;
