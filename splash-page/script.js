// destructuring
const { body } = document; // equivalent to const body = document.body

function changeBackground(number) {
  // check if background already showing
  let previousBackground;

  // if there is any css on our body
  if (body.className) {
    previousBackground = body.className;
  }

  // reset css classes on body
  body.className = '';

  switch (number) {
    case '1':
      // if previous background = 1 ? if true do nothing else add button 1 to classList
      return previousBackground === 'background-1'
        ? false
        : body.classList.add('background-1');

    case '2':
      return previousBackground === 'background-2'
        ? false
        : body.classList.add('background-2');

    case '3':
      return previousBackground === 'background-3'
        ? false
        : body.classList.add('background-3');

    default:
      break;
  }
}
