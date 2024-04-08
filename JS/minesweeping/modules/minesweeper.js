import { numTiles, sizeX, sizeY, numBombs } from "./config.js";
import {
  getNeighborIndices,
  rng,
  tileRender,
  bombCounter,
} from "./functions.js";

export { playArea };

let playArea = [];

main();

function main() {
  //fill playArea with obj
  for (var y = 0; y < sizeY; y++) {
    for (var x = 0; x < sizeX; x++) {
      let id = x + y * sizeX;
      playArea.push({
        index: id,
        isFlagged: false,
        isOpen: false,
        isBomb: false,
        isPreviewed: false,
        neighborIndices: [...getNeighborIndices(id)],
        neighboringBombs: 0,
        tileType: "tileClose.png",
        coords: { x, y },
      });
    }
  }
  //fill playArea with bombs
  for (var i = 0; i < numBombs; i++) {
    const randomTileIndex = rng(0, numTiles);
    if (!playArea[randomTileIndex].isBomb) {
      playArea[randomTileIndex].isBomb = true;
    } else {
      i--;
    }
  }

  //mine counting
  for (var i = 0; i < numTiles; i++) {
    if (!playArea[i].isBomb) {
      playArea[i].neighboringBombs = bombCounter(i);
    }
  }
  //render all closed tiles
  for (var i = 0; i < numTiles; i++) {
    tileRender(i, "TileClose");
  }
}
