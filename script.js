const titles = [
  "Sr. Software Engineer @ Digital On Us MTY",
  "FullStack Mentor @ Thinkful",
  "Web Design Enthusiast",
  "JS Fanatic",
  "Performance Advocate"
];
const devEl = document.querySelector("#dev");
let currentTitle = 0;

setTimeout(() => {
  animate(titles[currentTitle]);
  currentTitle++;

  window.setInterval(() => {
    animate(titles[currentTitle]);
    currentTitle = currentTitle < titles.length - 1 ? currentTitle + 1 : 0;
  }, 6000);
}, 1000);

function animate(newTitle) {
  let letter = 1;
  const id = setInterval(() => {
    requestAnimationFrame(() => {
      devEl.innerHTML = newTitle.substr(0, letter);
      letter++;
      if (letter > newTitle.length) {
        clearInterval(id);
      }
    });
  }, 30);
}
