import { canvasWidth, canvasHeight } from "./configs.js";

const canvas = document.getElementById("drawArea");
const context = canvas.getContext("2d");

function drawPoint(posX, posY) {
  context.fillrect(posX, posY, 1, 1);
}

function drawTriangle(firstPoint, secondPoint, thirdPoint, rgba) {
  context.beginPath();
  context.moveTo(firstPoint[0], firstPoint[1]);
  context.lineTo(secondPoint[0], secondPoint[1]);
  context.lineTo(thirdPoint[0], thirdPoint[1]);
  context.fillStyle = `rgba(${rgba.red},${rgba.green},${rgba.blue}, 100)`; //rgba.alpha
  context.fill();
}

function drawRandomTriangle() {
  let firstPoint = [randomPosX(), randomPosY()];
  let secondPoint = [randomPosX(), randomPosY()];
  let thirdPoint = [randomPosX(), randomPosY()];

  let rgba = randomRGBA();

  drawTriangle(firstPoint, secondPoint, thirdPoint, rgba);
}

function rng(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function randomPosX() {
  return rng(0, canvasWidth);
}
function randomPosY() {
  return rng(0, canvasHeight);
}
function randomRGBA() {
  return new rgba(rng(0, 255), rng(0, 255), rng(0, 255), rng(0, 100));
}

class rgba {
  constructor(red = 0, green = 0, blue = 0, alpha = 0) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }
}

export { rgba, drawTriangle, drawRandomTriangle, rng, randomRGBA };
