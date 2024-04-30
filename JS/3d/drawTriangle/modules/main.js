import { trianglesPerSecond, canvasHeight, canvasWidth } from "./configs.js";
import {
  rgba,
  drawTriangle,
  drawRandomTriangle,
  rng,
  randomRGBA,
} from "./functions.js";

const canvas = document.getElementById("drawArea");
const context = canvas.getContext("2d");

context.canvas.width = canvasWidth;
context.canvas.height = canvasHeight;

main();

function main() {
  /*setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    //2000 per frame is manageable
    for (let index = 0; index < trianglesPerSecond; index++) {
      drawRandomTriangle();
    }
  }, 10);*/
}
