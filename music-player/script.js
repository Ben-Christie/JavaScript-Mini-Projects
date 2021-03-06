// if we don't have an id we can use query selector to select by class or element tag
const image = document.querySelector('img');
const music = document.querySelector('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
// this is the container, light bit behind progress bar that fills up
const progressContainer = document.getElementById('progress-container');
// this is the progress bar itself that moves from 0% to 100%
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// Music
const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design',
  },
];

// check if playing or not
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// play/pause event listener
playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

// update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// current song
let songIndex = 0;

// previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// next song
function nextSong() {
  songIndex++;
  if (songIndex >= songs.length) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// on load - select first song
loadSong(songs[songIndex]);

// calulate and update duration
function formatDuration(duration) {
  // calculate display for duration
  // Math.floor returns the closest int that is less than or equal to the value
  const durationMinutes = Math.floor(duration / 60);

  // get the remainder for the seconds
  let durationSeconds = Math.floor(duration % 60);
  // add a 0 to front of single digits e.g. 2 will be displayed as 02
  if (durationSeconds < 10) {
    durationSeconds = `0${durationSeconds}`;
  }

  // delay switching duration element to avoid NaN
  if (durationSeconds) {
    // update duration element
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
  }
}

// calculate and update currentTime
function formatCurrentTime(currentTime) {
  // calculate display for currentTime
  // Math.floor returns the closest int that is less than or equal to the value
  const currentMinutes = Math.floor(currentTime / 60);

  // get the remainder for the seconds
  let currentSeconds = Math.floor(currentTime % 60);
  // add a 0 to front of single digits e.g. 2 will be displayed as 02
  if (currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`;
  }

  // update currentTime element
  currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
}

// update progress bar and time
function updateProgressBar(event) {
  if (isPlaying) {
    console.log(event);
    // destructuring an object
    // we create a const for what we want from the event and = to the src (where we're getting the data from)
    const { duration, currentTime } = event.srcElement;

    // update progress bar
    const progressPrecent = (currentTime / duration) * 100;

    progress.style.width = `${progressPrecent}%`;

    // calulate and update duration
    formatDuration(duration);

    // calculate and update currentTime
    formatCurrentTime(currentTime);
  }
}

// Set Progress Bar
function setProgressBar(event) {
  console.log(event);
  // we can use the this keyword to access the values within the element that receives the event, in this case the progress bar container
  const width = this.clientWidth;

  // offsetX will tell us where on the bar we clicked in the X direction
  const clickPosition = event.offsetX;

  // get duration from audio element
  const { duration } = music;

  // set currentTime attribute to be the number of seconds into the song that we click
  // clickPosition / width = percent through the song, then we multiply the total length by this value to get how many seconds in we've clicked
  music.currentTime = (clickPosition / width) * duration;
}

// event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
// fires when the time elapsed changes, i.e. every second the song progresses
music.addEventListener('timeupdate', updateProgressBar);
// on click set progress bar to point to change the point in the track
progressContainer.addEventListener('click', setProgressBar);
// auto play next song when song ends
music.addEventListener('ended', nextSong);
