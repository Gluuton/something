let canvas = document.getElementById("clockArea");
let context = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;

let secPositions = [];
let minPositions = [];
let hourPositions = [];

let radianDevided = 2 * Math.PI * (1 / 60); //0.0166 = 1/60
for (let stepIndex = 1; stepIndex <= 60; stepIndex++) {
  let stepRadian = radianDevided * stepIndex;
  let stepPosX = -1 * Math.sin(stepRadian);
  let stepPosY = -1 * Math.cos(stepRadian);
  for (let layer = 1; layer <= 15; layer++) {
    let layerPosX = stepPosX * layer;
    let layerPosY = stepPosY * layer;

    secPositions.push({
      step: 60 - stepIndex,
      layer,
      posX: layerPosX,
      posY: layerPosY,
    });
  }
  for (let layer = 1; layer <= 12; layer++) {
    let layerPosX = stepPosX * layer;
    let layerPosY = stepPosY * layer;

    minPositions.push({
      step: 60 - stepIndex,
      layer,
      posX: layerPosX,
      posY: layerPosY,
    });
  }
}
radianDevided = 2 * Math.PI * (1 / 12); //0.0166 = 1/60
for (let stepIndex = 1; stepIndex <= 12; stepIndex++) {
  let stepRadian = radianDevided * stepIndex;
  let stepPosX = -1 * Math.sin(stepRadian);
  let stepPosY = -1 * Math.cos(stepRadian);
  for (let layer = 1; layer <= 9; layer++) {
    let layerPosX = stepPosX * layer;
    let layerPosY = stepPosY * layer;

    hourPositions.push({
      step: 12 - stepIndex,
      layer,
      posX: layerPosX,
      posY: layerPosY,
    });
  }
}

main();

function main() {
  let seconds = 0;
  setInterval(() => {
    let systemDate = new Date();
    let currentTimeSeconds = systemDate.getSeconds();
    let currentTimeMinutes = systemDate.getMinutes();
    let currentTimeHours = systemDate.getHours() % 12;

    resetCanvas();
    changeClock(currentTimeSeconds, currentTimeMinutes, currentTimeHours);
  }, 10);
}

function timer() {
  let sec = 0;
  let time = 0;

  setInterval(function () {
    document.getElementById("timer").innerHTML = sec;
    sec++;
    if (sec >= 60) {
      sec = 0;

      time++;
      document.getElementById("seconds").innerHTML = time;
    }
  }, 16.666);
}

function changeClock(currentTimeSeconds, currentTimeMinutes, currentTimeHours) {
  secPositions.forEach((element) => {
    if (element.step === currentTimeSeconds) {
      renderHandle(element, currentTimeSeconds);
    }
    if (element.step === currentTimeMinutes) {
      renderHandle(element, currentTimeMinutes);
    }
  });
  hourPositions.forEach((element) => {
    if (element.step === currentTimeHours) {
      renderHandle(element, currentTimeHours);
    }
  });
}

function renderHandle(element, currentTime) {
  let posX;
  let posY;

  let textSize = 20;

  context.font = `${textSize}px serif`;

  posX = canvas.width * 0.5 + element.posX * 25 - textSize * 0.5;
  posY = canvas.height * 0.5 + element.posY * 25 + textSize * 0.5;
  if (currentTime < 10) {
    posX += 5;
  }

  context.fillText(currentTime, posX, posY);
}

function resetCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.arc(canvas.width * 0.5, canvas.height * 0.5, 5, 0, 2 * Math.PI);
  context.stroke();
  context.fill();
}
