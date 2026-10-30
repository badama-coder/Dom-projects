const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");
const hourDisplay = document.getElementById("hour-display");
const minuteDisplay = document.getElementById("minute-display");
const secondDisplay = document.getElementById("second-display");
const message = document.getElementById("message");


let intervalId;
let startTime = 0;
const formatTime = (startTime) => {
    const seconds = (startTime % 60).toString().padStart(2,"0");
    const minutes = Math.floor((startTime % 3600 )/ 60).toString().padStart(2,"0");
    const hours =  Math.floor(startTime/3600).toString().padStart(2,"0");
    
    hourDisplay.textContent = hours;
    minuteDisplay.textContent = minutes;
    secondDisplay.textContent = seconds;
}

const pauseTimer = () => {
    startButton.disabled = false;
    startButton.textContent = "Resume";
    pauseButton.disabled = true;
    resetButton.disabled = false;
    message.textContent = "Paused"
    clearInterval(intervalId);
};
const resetTimer = () => {
    clearInterval(intervalId);
    startTime = 0;
    formatTime(startTime);
    startButton.disabled = false;
    startButton.textContent = "Start";
    pauseButton.disabled = true;
    resetButton.disabled = true;
    message.textContent = "Ready"
};
const startTimer = () => {
    intervalId = setInterval(()=>{
        startTime++;
        formatTime(startTime)
    }, 1000)
    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;
    message.textContent = "Running"
};

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
