const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');

const navItems = [nav1, nav2, nav3, nav4, nav5];

// control navigation animation
function navAnimation(removing, adding) {
  navItems.forEach((nav, index) => {
    index += 1;
    nav.classList.replace(
      `slide-${removing}-${index}`,
      `slide-${adding}-${index}`
    );
  });
}

function toggleNav() {
  // Toggle: menu bars open/closed
  // toggle allows us to add or remove the specified class, in this case the change class
  menuBars.classList.toggle('change');

  // Toggle: menu to be active/not
  // overlay-active doesn't do anything (no css), we're using as a boolean to determine if the overlay is active or not
  overlay.classList.toggle('overlay-active');

  if (overlay.classList.contains('overlay-active')) {
    // Animate In - Overlay
    overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');

    // Animate in
    navAnimation('out', 'in');
  } else {
    // Animate Out - Overlay
    overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');

    // Animate out
    navAnimation('in', 'out');
  }
}

// event listeners
menuBars.addEventListener('click', toggleNav);

navItems.forEach((nav) => {
  nav.addEventListener('click', toggleNav);
});
