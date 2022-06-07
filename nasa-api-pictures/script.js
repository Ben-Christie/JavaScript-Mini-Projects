const resultsNav = document.getElementById('resultsNav');
const favouritesNav = document.getElementById('favouritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// NASA API
const count = 10;
const apiKey = 'DFFcBXLGf6Tf5YvaS5tv1AUfUGN0sKfaa8T6UwAz';

const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

// use object to avoid having to loop through entire array, we'll be able to delete using key value
let favourites = {};

function showContent(page) {
  // bring us back to the top of the page
  window.scrollTo({ top: 0, behavior: 'instant' });

  // update nav
  if (page === 'results') {
    resultsNav.classList.remove('hidden');
    favouritesNav.classList.add('hidden');
  } else {
    resultsNav.classList.add('hidden');
    favouritesNav.classList.remove('hidden');
  }

  loader.classList.add('hidden');
}

function createDomNodes(page) {
  // have to convert the favourites object to an array using Object.values(favourites) so that we can apply our forEach
  const currentArray =
    page === 'results' ? resultsArray : Object.values(favourites);

  currentArray.forEach((result) => {
    // card container
    const card = document.createElement('div');
    card.classList.add('card');

    // link that'll wrap image
    const link = document.createElement('a');
    link.href = result.hdurl;
    link.title = 'View Full Image';
    link.target = '_blank';

    // image
    const image = document.createElement('img');
    image.src = result.url;
    image.alt = 'NASA Picture of the Day';
    // lazy loading implementation so not all images load at once to improve performance
    image.loading = 'lazy';
    image.classList.add('card-img-top');

    // card body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // card title
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = result.title;

    // save text
    const saveText = document.createElement('p');
    saveText.classList.add('clickable');
    if (page === 'results') {
      saveText.textContent = 'Add To Favorites';
      saveText.setAttribute('onclick', `saveFavourite('${result.url}')`);
    } else {
      saveText.textContent = 'Remove Favorite';
      saveText.setAttribute('onclick', `removeFavourite('${result.url}')`);
    }

    // card text
    const cardText = document.createElement('p');
    cardText.textContent = result.explanation;

    // footer
    const footer = document.createElement('small');
    footer.classList.add('text-muted', 'indent');

    // date
    const date = document.createElement('strong');
    date.textContent = result.date;

    // copyright
    const copyrightResult =
      result.copyright === undefined ? '' : result.copyright;

    const copyright = document.createElement('span');
    copyright.textContent = ` ${copyrightResult}`;

    // append
    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody, footer);

    imagesContainer.appendChild(card);
  });
}

function updateDom(page) {
  // get favourites from local storage
  if (localStorage.getItem('nasaFavourites')) {
    favourites = JSON.parse(localStorage.getItem('nasaFavourites'));
  }
  // refresh the page by deleting everything from the image container, this will then be rebuilt again with teh createDomNodes function
  imagesContainer.textContent = '';
  createDomNodes(page);

  // hide loader again
  showContent(page);
}

// Get 10 images from NASA API
async function getNasaPictures() {
  // show loader
  loader.classList.remove('hidden');
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    console.log(resultsArray);
    // update DOM
    updateDom('results');
  } catch (error) {
    // handle error
    console.error(error);
  }
}

// add result to favourites
function saveFavourite(itemUrl) {
  // loop through results array to select favourite
  resultsArray.forEach((item) => {
    // if the item from the results array has the same url as the one we pass and does not match a key in the favourites array
    if (item.url.includes(itemUrl) && !favourites[itemUrl]) {
      favourites[itemUrl] = item;
      console.log(favourites);

      // show save confirmation for 2 seconds
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
        // 2 seconds = 2000 milliseconds
      }, 2000);

      // save in local storage
      localStorage.setItem('nasaFavourites', JSON.stringify(favourites));
    }
  });
}

// remove item from favourites
function removeFavourite(itemUrl) {
  if (favourites[itemUrl]) {
    delete favourites[itemUrl];

    // save in local storage
    localStorage.setItem('nasaFavourites', JSON.stringify(favourites));

    updateDom('favourites');
  }
}

// on load
getNasaPictures();
