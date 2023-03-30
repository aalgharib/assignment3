const canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 500;
const bug = canvas.getContext("2d");
let bugX = 50;
let bugY = 50;
let bugSpeed = 2000;
let bugSize = 50;

let score = 0;

function drawBug() {
  bug.clearRect(0, 0, canvas.width, canvas.height);

  const bugRadius = 30;

  bug.beginPath();
  bug.arc(bugX, bugY, bugRadius, 0, Math.PI * 2, true);
  bug.fillStyle = "#FF4444";
  bug.fill();
  bug.lineWidth = 5;
  bug.strokeStyle = "#00FFFF";
  bug.strokeWidth = 10;
  bug.stroke();
}

function moveBug() {
  bugX = Math.floor(Math.random() * (canvas.width - bugSize));
  bugY = Math.floor(Math.random() * (canvas.height - bugSize));
  drawBug(bugX, bugY);
}

function incrementScore() {
  score++;
  if (score % 5 === 0) {
    bugSpeed -= 100;
    clearInterval(bugInterval);
    bugInterval = setInterval(moveBug, bugSpeed);
  }
  document.getElementById("score").textContent = score;
}

function resetScore() {
  score = 0;
  document.getElementById("score").textContent = score;
}

function resetSpeed() {
  bugSpeed = 2000;
  clearInterval(bugInterval);
  bugInterval = setInterval(moveBug, bugSpeed);
}

function debounce(func, delay) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}
canvas.addEventListener(
  "mousedown",
  debounce(function (event) {
    const mouseX = event.clientX - canvas.offsetLeft;
    const mouseY = event.clientY - canvas.offsetTop;

    if (
      mouseX >= bugX &&
      mouseX <= bugX + bugSize &&
      mouseY >= bugY &&
      mouseY <= bugY + bugSize
    ) {
      incrementScore();
      console.log(bugSpeed);
      moveBug();
      bug.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, 500)
);

document.getElementById("reset-score").addEventListener("click", function () {
  resetScore();
});

document.getElementById("reset-speed").addEventListener("click", function () {
  resetSpeed();
});

let bugInterval = setInterval(moveBug, bugSpeed);
