const loadingNumber = document.getElementById("loadingNumber");
const loadingText = document.getElementById("loadingText");
const loadingBar = document.getElementById("loadingBar");

let startTime = null;
const LOADING_DURATION_MS = 5000;
const loadingTexts = [
  "Preparing your space",
  "Bringing everything together",
  "Adding the finishing touches",
  "All set. Welcome in!",
];

const renderProcess = (percentage) => {
  const roundedPercentage = Math.floor(percentage);
  const currentMessage =
    roundedPercentage >= 100
      ? 3
      : roundedPercentage >= 80
        ? 2
        : roundedPercentage >= 35
          ? 1
          : 0;

  loadingNumber.textContent = roundedPercentage;
  loadingText.textContent = loadingTexts[currentMessage];
  loadingBar.style.width = `${roundedPercentage}%`;
};
const updateProcess = (timestamp) => {
  if (!startTime) startTime = timestamp;

  const percentage = Math.min(
    ((timestamp - startTime) / LOADING_DURATION_MS) * 100,
    100,
  );

  if (percentage < 100) {
    requestAnimationFrame(updateProcess);
  }
  renderProcess(percentage);
};
requestAnimationFrame(updateProcess);
