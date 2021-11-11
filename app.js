let musicContainer = document.querySelector(".music-container");
let playBtn = document.querySelector("#play");
let prevBtn = document.querySelector("#prev");
let nextBtn = document.querySelector("#next");
let audio = document.querySelector("#audio");
let progress = document.querySelector(".progress");
let progressContainer = document.querySelector(".progress-container");
let title = document.querySelector("#title");
let coverImage = document.querySelector("#cover");
let currentTimeOfSong = document.querySelector("#currentTime-of-song");
let durationOfSong = document.querySelector("#duration-of-song");
let video = document.querySelector("#video");

video.addEventListener('timeupdate', function (e) {
    const { duration, currentTime } = e.srcElement;
    console.log(Math.floor(duration / 60))
})

//songs titles
const songs = ["Celine-dion", "emeli-sande", "Eminem", "HouseOnFire"];
const images = ["wal12", "wal21", "wal48", "wal18"];

//lets keep track of each songs
let songIndex = 0;

//update each songs details
const loadSong = (song) => {
	title.innerText = song;
	audio.src = `/${song}.mp3`;
	cover.src = `/${images[songIndex]}.jpeg`;
};

//initially load current songs info with songsIndex into the DOM
loadSong(songs[songIndex]);

//event listeners on songs
playBtn.addEventListener("click", () => {
	const isPlaying = musicContainer.classList.contains("play");
	if (isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
});

//toggle play and pause song function
const playSong = () => {
	musicContainer.classList.add("play");
	playBtn.querySelector("i.fas").classList.remove("fa-play");
	playBtn.querySelector("i.fas").classList.add("fa-pause");
	audio.play();
};

const pauseSong = () => {
	musicContainer.classList.remove("play");
	playBtn.querySelector("i.fas").classList.add("fa-play");
	playBtn.querySelector("i.fas").classList.remove("fa-pause");
	audio.pause();
};

//change toggle songs next and prev
const prevSong = () => {
	songIndex--;
	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}

	loadSong(songs[songIndex]);

	playSong();
};

const nextSong = () => {
	songIndex++;
	if (songIndex > songs.length - 1) {
		console.log(songIndex);
		songIndex = 0;
	}

	loadSong(songs[songIndex]);

	playSong();
};
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

//get song duration song progress
audio.addEventListener("timeupdate", (e) => {
	//distructure curentime and total duration of the song
	const { currentTime, duration } = e.srcElement;
	const progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`;
});

//control songs by clicking on the progressContainer
const setProgress = (e) => {
	const width = this.clientWidth;
	console.log(width);
	const clickX = e.offsetX;
	console.log(clickX);
	const duration = audio.duration;

	audio.currentTime = (clickX / width) * duration;
};
progressContainer.addEventListener("click", setProgress);

//automatically go to next when songs finish
audio.addEventListener("ended", nextSong);

//passin the curent time to the dom
const durationTime = (e) => {
	const { duration, currentTime } = e.srcElement;
	let seconds;
	let secondd;

	//define currentTime in minutes
	let minutes = currentTime == null ? 0 : Math.floor(currentTime / 60);
	minutes = minutes < 10 ? "0" + minutes : minutes;

	//define seconds in currentTime
	const getSeconds = (x) => {
		if (Math.floor(x) >= 60) {
			for (let i = 1; i <= 60; i++) {
				if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
					seconds = Math.floor(x) - 60 * i;
					seconds = seconds < 10 ? "0" + seconds : seconds;
				}
			}
		} else {
			seconds = Math.floor(x);
			seconds = seconds < 10 ? "0" + seconds : seconds;
		}
	};

	getSeconds(currentTime, seconds);
	//change current DOM
	currentTimeOfSong.innerHTML = minutes + ":" + seconds;

	//define minutes durationTime
	let minutesD = isNaN(duration) === true ? "0" : Math.floor(duration / 60);
	minutesD = minutesD < 10 ? "0" + minutesD : minutesD;

	const getSecondsD = (x) => {
		if (Math.floor(x) >= 60) {
			for (let i = 1; i <= 60; i++) {
				if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
					secondd = Math.floor(x) - 60 * i;
					secondd = secondd < 10 ? "0" + secondd : secondd;
				}
			}
		} else {
			secondd = isNaN(duration) === true ? "0" : Math.floor(x);
			secondd = secondd < 10 ? "0" + secondd : secondd;
		}
	};

	//change seconds in the DOM
	getSecondsD(duration);
	durationOfSong.innerHTML = minutesD + ":" + secondd;
};
audio.addEventListener("timeupdate", durationTime);
