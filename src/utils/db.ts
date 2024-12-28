const DB_NAME = "timerDB";
const STORE_NAME = "timerStore";
const DB_VERSION = 1;

interface TimerData {
	seconds: number;
	timestamp: number;
}

interface MusicData {
	youtubeLink: string;
}

export const initDB = (): Promise<IDBDatabase> => {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve(request.result);

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME);
			}
		};
	});
};

export const saveTimer = async (seconds: number): Promise<void> => {
	const db = await initDB();
	const tx = db.transaction(STORE_NAME, "readwrite");
	const store = tx.objectStore(STORE_NAME);

	const timerData: TimerData = {
		seconds: seconds,
		timestamp: Date.now(),
	};

	store.put(timerData, "timer");
};

export const saveMusicLink = async (youtubeLink: string): Promise<void> => {
	const db = await initDB();
	const tx = db.transaction(STORE_NAME, "readwrite");
	const store = tx.objectStore(STORE_NAME);

	const musicData: MusicData = {
		youtubeLink,
	};

	store.put(musicData, "music");
};

export const getSavedMusicLink = async (): Promise<string | null> => {
	const db = await initDB();
	const tx = db.transaction(STORE_NAME, "readonly");
	const store = tx.objectStore(STORE_NAME);

	return new Promise((resolve, reject) => {
		const request = store.get("music");
		request.onsuccess = () => {
			const typedResult = request.result as MusicData;
			resolve(typedResult?.youtubeLink || null);
		};
		request.onerror = () => reject(request.error);
	});
};

export const getLast24hTimer = async (): Promise<number | null> => {
	const db = await initDB();
	const tx = db.transaction(STORE_NAME, "readonly");
	const store = tx.objectStore(STORE_NAME);

	return new Promise((resolve, reject) => {
		const request = store.get("timer");
		request.onsuccess = () => {
			const typedResult = request.result as TimerData;
			const currentTime = Date.now();
			const { timestamp: savedTimestamp, seconds } = typedResult;
			if (currentTime - savedTimestamp < 24 * 60 * 60 * 1000) {
				resolve(seconds);
			} else {
				resolve(0);
			}
		};
		request.onerror = () => reject(request.error);
	});
};
