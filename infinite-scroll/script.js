//UnSplash API
// to improve performance the obvious thing to do is load less images, we can set count to a lower value than 30 (max), however, 
// we'll create a boolean value to check if the initial load is done and if it is we can up this value to the max to load more images at a time
let count = 10;

//using demo can only make 50 requests, go to https://unsplash.com/oauth/applications and create a new project to get a new activation key
const apiKey = 'zcTIpkqRiGtLD9-NY5jNmoH5JcMKnMizgzxOkwKeSjI';

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

// check if all images were loaded, called for each individual image
function imageLoaded() {
  //increment images loaded by 1 each time an image is loaded
  imagesLoaded++;
  console.log('images loaded = ', imagesLoaded);

  if(imagesLoaded === totalImages) {
    ready = true;

    //hide loader once everything is loaded
    loader.hidden = true;

    //up the count to max
    count = 30;

    console.log('ready = ', ready);
  }
}

//helper function to set attributes on DOM elements
// function has 2 params, element is the element we want to add the attributes to, attributes is an array of all the attributes we want to add
function setAttributes(element, attributes) {
  //key will be href, src, alt, etc.
  for(const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// create elements for links and photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log('total images = ', totalImages);

  //run function for each object in photosArray
  photosArray.forEach((photo) => {
    //create <a href> html element to link to unsplash
    const item = document.createElement('a');
    // add href element and populate with photo.links.html
    item.setAttribute('href', photo.links.html);
    // add target attribute and set to blank to open in new tab
    item.setAttribute('target', '_blank');

    // instead of typing out the above (individually adding attributes) we can use our helper function to simplify the process

    //create <img> for photo
    const img = document.createElement('img');

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });

    // event listener, check when each image is finished loading
    img.addEventListener('load', imageLoaded);

    // put <img> inside <a>
    item.appendChild(img);
    //put <a> inside image-container
    imageContainer.appendChild(item);
  });
}


// get photos from unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);

    photosArray = await response.json();

    console.log(photosArray);

    displayPhotos();
    
  } catch (error) {
    //handle error
    console.log('Error', error);
  }
}

// check to see if scrolling near bottom of page to load more images
// window is the parent of the document and the grandparent of the body (highest possible level)
// target scroll event and create arrow function ( () => {} )
window.addEventListener('scroll', () => {
  
  /*
    Infinite Scroll

    On the left we have:
      window.innerHeight -> the height of the browser window, constant value
      window.scrollY -> the distance from the top that the user has scrolled
    
    We then compare that to:
      document.body.offsetHeight -> the height of everything in the body including what isn't in view

      and we subtract a px value in this case 1000px since most innerHeights are less than 1000px
  */

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready == true) {
    // console.log to see whats happening
    console.log('window.innerHeight', window.innerHeight);
    console.log('window.scrollY', window.scrollY);
    console.log('window.innerHeight + window.scrollY', window.innerHeight + window.scrollY);
    console.log('document.body.offsetHeight - 1000', document.body.offsetHeight - 1000);
    console.log('load more');

    //reset to false so that it can start again
    ready = false;

    getPhotos();

  }

});

//on load
getPhotos();
