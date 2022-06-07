// queryselector used to target classes and hmtl tags
// getElementById used to target ids

// if you're targeting a class you need to put the punctuation in as well
const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const speed = document.querySelector('.player-speed');
const fullscreenBtn = document.querySelector('.fullscreen');

// Play & Pause ----------------------------------- //

function showPlayIcon() {
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
}

function togglePlay() {
  // check if paused
  if (video.paused) {
    video.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
  } else {
    video.pause();
    showPlayIcon();
  }
}

// on video end, show play button icon
video.addEventListener('ended', showPlayIcon);

// Progress Bar ---------------------------------- //

// calculate display time format
function displayTime(time) {
  // Math.floor allows rounding to nearest int (only rounds down)
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

// update progress bar as video plays
function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = `${displayTime(video.duration)}`;
}

// skip to specific time within the video
function setProgress(event) {
  // offset values are teh total values for the element including margin and padding
  const newTime = event.offsetX / progressRange.offsetWidth;
  // if the video was 20 secs and we clicked on the 2 sec mark, newTime will be 10%
  progressBar.style.width = `${newTime * 100}%`;
  // continuing with the example in the last comment above, we want to now skip to 10% of the duration through the video
  video.currentTime = newTime * video.duration;
}

// Volume Controls --------------------------- //

// by default the volume of video = 1 = 100%
let lastVolume = 1;

// volume bar
function changeVolume(event) {
  let volume = event.offsetX / volumeRange.offsetWidth;
  // round volume up or down just to make it a bit easier for the user to reach full volume or mute
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }

  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;

  // change icon depending on volume
  volumeIcon.className = '';

  if (volume > 0.7) {
    volumeIcon.classList.add('fas', 'fa-volume-up');
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add('fas', 'fa-volume-down');
  } else if (volume === 0) {
    volumeIcon.classList.add('fas', 'fa-volume-mute');
  }

  lastVolume = volume;
}

// mute or unmute
function toggleMute() {
  volumeIcon.className = '';
  // if volume is anything but 0
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0; // muted
    volumeBar.style.width = 0;
    volumeIcon.classList.add('fas', 'fa-volume-mute');
    volumeIcon.setAttribute('title', 'Unmute');
  } else {
    video.volume = lastVolume; //set to last volume
    volumeBar.style.width = `${lastVolume * 100}%`;
    volumeIcon.setAttribute('title', 'Mute');

    if (lastVolume > 0.7) {
      volumeIcon.classList.add('fas', 'fa-volume-up');
    } else {
      volumeIcon.classList.add('fas', 'fa-volume-down');
    }
  }
}

// Change Playback Speed -------------------- //

function changeSpeed() {
  video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }

  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }

  video.classList.remove('video-fullscreen');
}

let fullscreen = false;

// toggle fullscreen
function toggleFullscreen() {
  !fullscreen ? openFullscreen(player) : closeFullscreen();
  fullscreen = !fullscreen;
}

// Event Listener
playBtn.addEventListener('click', togglePlay);
// click on video to pause/play
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);
