const tracks = [
    {
        title: "Gruppa krovi",
        artist: "Viktor Tsoy",
        src: "./src/audio/ViktorTsoy-Gruppa.mp3",
        cover: "./src/img/GruppaKrovi.jpg"
    },
    {
        title: "Pachka sigaret",
        artist: "Viktor Tsoy",
        src: "./src/audio/ViktorTsoy-Pachka.mp3",
        cover: "./src/img/PachkaSigaret.jpg"
    },
    {
        title: "Zvezda po imeni Solntce",
        artist: "Viktor Tsoy",
        src: "./src/audio/ViktorTsoy-Zvezda.mp3",
        cover: "./src/img/Zvezda.png"
    },
];

let currentTrackIndex = 0;
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const albumCover = document.getElementById('album-cover');

function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.src;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    albumCover.src = track.cover;
    audio.load();
    updateDuration();
}

function playTrack() {
    audio.play();
    playPauseBtn.textContent = 'Pause';
}

function pauseTrack() {
    audio.pause();
    playPauseBtn.textContent = 'Play';
}

function updateDuration() {
    durationDisplay.textContent = formatTime(audio.duration);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Функция для обновления прогресса
function updateProgress() {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progressPercent;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
}

// Обработка событий
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        playTrack();
    } else {
        pauseTrack();
    }
});

nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length; // Переход к следующему треку
    loadTrack(currentTrackIndex);
    playTrack();
});

prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length; // Переход к предыдущему треку
    loadTrack(currentTrackIndex);
    playTrack();
});

// Обновление прогресса при проигрывании
audio.addEventListener('timeupdate', updateProgress);

// Обновление продолжительности по загрузке
audio.addEventListener('loadedmetadata', updateDuration);

// Обновление времени прогресса при перемещении ползунка
progressBar.addEventListener('input', function() {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Инициализация первого трека
loadTrack(currentTrackIndex);

