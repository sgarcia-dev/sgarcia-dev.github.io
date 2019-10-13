import './particles.js';

const TITLES = [
  "Sr. Software Engineer @ Digital On Us",
  "FullStack Mentor @ Thinkful",
  "Web Design Enthusiast",
  "JS Fanatic",
  "Performance Advocate"
];
const INIT_DELAY_SECONDS = 1;
const CHANGE_DELAY_SECONDS = 6;
const $TITLE = document.querySelector("#dev");

let currentTitle = 0;

setTimeout(updateDynamicTitle, INIT_DELAY_SECONDS * 1000);

function updateDynamicTitle(currentTitle = 0) {
  animateNewTitle(TITLES[currentTitle]);
  const nextTitle = currentTitle < TITLES.length - 1 ? currentTitle + 1 : 0;
  setTimeout(() => {
    updateDynamicTitle(nextTitle);
  }, CHANGE_DELAY_SECONDS * 1000);
}

function animateNewTitle(newTitle, letter = 1) {
  requestAnimationFrame(() => {
    $TITLE.innerHTML = newTitle.substr(0, letter);
    letter++;
    if (letter <= newTitle.length) {
      animateNewTitle(newTitle, letter);
    }
  });
}