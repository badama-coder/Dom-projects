const buttonGame = document.getElementById("button-game");
const lastAttempt = document.getElementById("last-attempt");
const bestAttempt = document.getElementById("best-attempt");
const icon = document.getElementById("icon");
const textReady = document.getElementById("text-ready");
const textClick = document.getElementById("text-click");

let state = "waiting";
let timeOutId = null;
let startTime = 0;
let best = null;

const randomTime = () => {
  return Math.floor(Math.random() * 3000) + 2000;
};

const greenBackground = () => {
  textReady.textContent = "Click now!";
  textClick.textContent = "Go, go, go!";
  buttonGame.style.backgroundColor = "#D9F99D";
  textReady.style.color = "#09090B";
  textClick.style.color = "#09090B";
  icon.className = "fa-solid fa-exclamation text-4xl text-[#09090B]";
  state = "finished";
  startTime = Date.now();
};

buttonGame.addEventListener("click", () => {
  if (state === "waiting") {
    textReady.textContent = "Wait for green";
    textClick.textContent = "Not yet. Stay ready.";
    buttonGame.style.backgroundColor = "#5F071A";
    icon.className = "fa-solid fa-ellipsis text-3xl";
    state = "";
    const delay = randomTime();
    timeOutId = setTimeout(() => {
      greenBackground();
    }, delay);
  } else if (state === "finished") {
    state = "waiting";
    const timer = Date.now() - startTime;
    textReady.textContent = `${timer} ms`;
    textClick.textContent = "Click to play again";
    textReady.style.color = "#F4F4F5";
    textClick.style.color = "#F4F4F5";
    buttonGame.style.backgroundColor = "#27272A";
    icon.className = "fa-solid fa-check text-4xl";
    lastAttempt.textContent = `${timer} ms`;

    best = !best ? timer : Math.min(best, timer);

    bestAttempt.textContent = `${best} ms`;
  } else {
    textReady.textContent = "Too soon!";
    textClick.textContent = "Click to try again";
    buttonGame.style.backgroundColor = "#27272A";
    icon.className = "fa-solid fa-repeat text-4xl";
    state = "waiting";
    clearTimeout(timeOutId);
  }
});
