// THREE SONG PLAYLIST
const songs = [
  "assets/song-1.mp3",
  "assets/song-2.mp3",
  "assets/song-3.mp3"
];

const audio = document.getElementById("bgMusic");
const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const songSelect = document.getElementById("songSelect");

let currentSong = Number(sessionStorage.getItem("currentSong") || 0);

function loadSong(index, autoplay = false) {
  currentSong = (index + songs.length) % songs.length;
  audio.src = songs[currentSong];
  songSelect.value = currentSong;
  sessionStorage.setItem("currentSong", currentSong);

  if (autoplay) {
    audio.play().then(() => {
      playBtn.textContent = "❚❚ Pause";
    }).catch(() => {
      playBtn.textContent = "▶ Play";
    });
  }
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play().then(() => {
      playBtn.textContent = "❚❚ Pause";
    }).catch(() => {
      playBtn.textContent = "▶ Play";
    });
  } else {
    audio.pause();
    playBtn.textContent = "▶ Play";
  }
});

nextBtn.addEventListener("click", () => {
  loadSong(currentSong + 1, true);
});

songSelect.addEventListener("change", () => {
  loadSong(Number(songSelect.value), true);
});

audio.addEventListener("ended", () => {
  loadSong(currentSong + 1, true);
});

loadSong(currentSong);

// Try autoplay. Browser may require the visitor to press Play.
if (sessionStorage.getItem("musicStarted") === "yes") {
  audio.play().then(() => {
    playBtn.textContent = "❚❚ Pause";
  }).catch(() => {});
}

audio.addEventListener("play", () => {
  sessionStorage.setItem("musicStarted", "yes");
});

// FLOATING HEARTS
const heartsContainer = document.querySelector(".hearts-bg");
const heartEmojis = ["💗", "💕", "💖", "💜", "♡", "🩷"];

function createHeart() {
  if (!heartsContainer) return;

  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent =
    heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (12 + Math.random() * 15) + "px";
  heart.style.animationDuration = (5 + Math.random() * 4) + "s";

  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 9500);
}

setInterval(createHeart, 850);

// SMOOTH PAGE TRANSITIONS
document.querySelectorAll('a[href$=".html"]').forEach(link => {
  link.addEventListener("click", event => {
    const destination = link.getAttribute("href");

    if (
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    ) return;

    event.preventDefault();

    document.body.classList.add("page-leaving");

    setTimeout(() => {
      window.location.href = destination;
    }, 350);
  });
});
