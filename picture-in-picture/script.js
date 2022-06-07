const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// async allows us to run a function without freezing/stopping the website 

// prompt the user to select a media stream, pass to video element, play video
async function selectMediaStream() {
  try {
    
    // screen capture API

    // get media stream
    // await waits until user has selected the screen they want to display
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();

    // pass media stream to video html element
    videoElement.srcObject = mediaStream;

    // when video has loaded its metadata it'll call a function to play
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    }

  } catch (error) {
    // handle error
    console.log('selectMediaStream() Error: ', error);
  }
}

button.addEventListener('click', async () => {
  // disable button when clicked
  button.disabled = true;

  // start picture in picture (await for video element to make request for pictur sin picture)
  await videoElement.requestPictureInPicture();

  // reset button (only going to happen when picture in picture is successful)
  button.disabled = false;
});

// on load
selectMediaStream();
