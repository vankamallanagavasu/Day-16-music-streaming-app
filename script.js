document.addEventListener("DOMContentLoaded", function() {
  const playBtn = document.getElementById("playBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const songTitle = document.getElementById("songTitle");
  const artist = document.getElementById("artist");
  const albumImage = document.getElementById("albumImage");
  const currentTimeContainer = document.getElementById("currentTime");
  const durationContainer = document.getElementById("duration");
  const progressBar = document.querySelector(".progress");
  const progressContainer = document.querySelector(".progress-container");

  const songs = [
    { title: "Song 1", artist: "Artist 1", file: "song1.mp3", image: "mp1.jpeg" },
    { title: "Song 2", artist: "Artist 2", file: "song2.mp3", image: "mp2.jpeg" },
    { title: "Song 3", artist: "Artist 3", file: "song3.mp3", image: "mp3.jpeg" }
  ];

  let currentSongIndex = 0;
  let isPlaying = false;
  let audio = new Audio();

  function loadSong() {
    const currentSong = songs[currentSongIndex];
    songTitle.textContent = currentSong.title;
    artist.textContent = currentSong.artist;
    albumImage.src = `images/${currentSong.image}`;
    audio.src = `music/${currentSong.file}`;
    audio.load();
  }

  function playSong() {
    isPlaying = true;
    playBtn.textContent = "Pause";
    audio.play();
  }

  function pauseSong() {
    isPlaying = false;
    playBtn.textContent = "Play";
    audio.pause();
  }

  function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong();
    if (isPlaying) playSong();
  }

  function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong();
    if (isPlaying) playSong();
  }

  function updateProgress() {
    const { currentTime, duration } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeContainer.textContent = `${currentMinutes}:${currentSeconds}`;

    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    durationContainer.textContent = `${durationMinutes}:${durationSeconds}`;
  }

  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
  }

  playBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
  });

  prevBtn.addEventListener("click", prevSong);

  nextBtn.addEventListener("click", nextSong);

  audio.addEventListener("timeupdate", updateProgress);

  progressContainer.addEventListener("click", setProgress);

  loadSong();
});
