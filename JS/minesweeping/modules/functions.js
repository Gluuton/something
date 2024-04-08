import {
  sizeX,
  numTiles,
  tileSize,
  padding,
  sizeMultiplier,
  startPosX,
  startPosY,
} from "./config.js";
import { playArea } from "./minesweeper.js";

export { getNeighborIndices, rng, tileRender, bombCounter };

let isMouseDown = false;
let isGameOver = false;

function getNeighborIndices(tileIndex) {
  let neighborArray = [
    topLeftNeighbor(tileIndex),
    topMidNeighbor(tileIndex),
    topRightNeighbor(tileIndex),
    leftNeighbor(tileIndex),
    rightNeighbor(tileIndex),
    bottomLeftNeighbor(tileIndex),
    bottomMidNeighbor(tileIndex),
    bottomRightNeighbor(tileIndex),
  ];
  var illegalAmount = 0;
  neighborArray.forEach((index) => {
    if (index < 0 || index >= numTiles) {
      const illegalIndex = neighborArray.indexOf(index);

      delete neighborArray[illegalIndex];
      illegalAmount++;
    }
  });
  if (isLeftCol(tileIndex)) {
    const illegalIndexArray = [
      neighborArray.indexOf(topLeftNeighbor(tileIndex)),
      neighborArray.indexOf(leftNeighbor(tileIndex)),
      neighborArray.indexOf(bottomLeftNeighbor(tileIndex)),
    ];

    illegalIndexArray.forEach((illegalIndex) => {
      if (illegalIndex !== -1) {
        delete neighborArray[illegalIndex];
        illegalAmount++;
      }
    });
  } else if (isRightCol(tileIndex)) {
    const illegalIndexArray = [
      neighborArray.indexOf(topRightNeighbor(tileIndex)),
      neighborArray.indexOf(rightNeighbor(tileIndex)),
      neighborArray.indexOf(bottomRightNeighbor(tileIndex)),
    ];

    illegalIndexArray.forEach((illegalIndex) => {
      if (illegalIndex !== -1) {
        delete neighborArray[illegalIndex];
        illegalAmount++;
      }
    });
  }
  neighborArray.sort((a, b) => a - b);

  for (var i = 0; i < illegalAmount; i++) {
    neighborArray.pop();
  }
  return neighborArray;
}

function topLeftNeighbor(tileIndex) {
  return tileIndex - sizeX - 1;
}
function topMidNeighbor(tileIndex) {
  return tileIndex - sizeX;
}
function topRightNeighbor(tileIndex) {
  return tileIndex - sizeX + 1;
}
function leftNeighbor(tileIndex) {
  return tileIndex - 1;
}
function rightNeighbor(tileIndex) {
  return tileIndex + 1;
}
function bottomLeftNeighbor(tileIndex) {
  return tileIndex + sizeX - 1;
}
function bottomMidNeighbor(tileIndex) {
  return tileIndex + sizeX;
}
function bottomRightNeighbor(tileIndex) {
  return tileIndex + sizeX + 1;
}

function isLeftCol(tileIndex) {
  return tileIndex % sizeX === 0;
}
function isRightCol(tileIndex) {
  return (tileIndex + 1) % sizeX === 0;
}

function rng(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function tileRender(tileIndex, tileType) {
  const coordY = playArea[tileIndex].coords.y;
  const coordX = playArea[tileIndex].coords.x;

  const size = tileSize * sizeMultiplier;

  const tilePosX = coordX * (size + padding * sizeMultiplier) + startPosX;
  const tilePosY = coordY * (size + padding * sizeMultiplier) + startPosY;
  const img = document.createElement("img");

  img.id = `tile${tileIndex}`;
  img.src = `${tileType}.png`;
  img.width = size;
  img.height = size;
  img.style.position = "absolute";
  img.style.left = `${tilePosX}px`;
  img.style.top = `${tilePosY}px`;
  img.draggable = false;
  img.addEventListener("mousedown", (e) => previewTileOrNeighbors(tileIndex));
  img.addEventListener("mouseup", (e) => openTile(tileIndex));
  img.addEventListener("mouseup", (e) => stopPreviewNeighborTiles(tileIndex));
  img.addEventListener("mouseleave", (e) => onMouseLeave(tileIndex));
  img.addEventListener("mouseenter", (e) => onMouseEnter(tileIndex));
  img.addEventListener("contextmenu", (e) => flagTile(tileIndex));
  var src = document.getElementById("tileArea");

  src.appendChild(img);
}

// if (e.button === 0)

function editTile(tileIndex, tileType) {
  if (!isGameOver) {
    const tileID = `tile${tileIndex}`;
    const img = document.getElementById(tileID);

    img.src = `${tileType}.png`;
  }
}
function flagTile(tileIndex) {
  if (!isGameOver) {
    if (!playArea[tileIndex].isOpen) {
      if (!playArea[tileIndex].isFlagged) {
        playArea[tileIndex].isFlagged = true;
        editTile(tileIndex, "TileFlag");
      } else {
        playArea[tileIndex].isFlagged = false;
        editTile(tileIndex, "TileClose");
      }
    }
  }
}
function openTile(tileIndex) {
  if (!isGameOver) {
    if (event.button === 0) {
      isMouseDown = false;

      const isOpen = playArea[tileIndex].isOpen;
      const isBomb = playArea[tileIndex].isBomb;
      const isFlagged = playArea[tileIndex].isFlagged;
      const neighboringBombs = playArea[tileIndex].neighboringBombs;

      if (!isOpen) {
        if (!isFlagged) {
          playArea[tileIndex].isOpen = true;

          if (!playArea[tileIndex].isBomb) {
            switch (neighboringBombs) {
              case 0:
                editTile(tileIndex, "Tile0");
                openNeighbors(tileIndex);
                break;
              case 1:
                editTile(tileIndex, "Tile1");
                break;
              case 2:
                editTile(tileIndex, "Tile2");
                break;
              case 3:
                editTile(tileIndex, "Tile3");
                break;
              case 4:
                editTile(tileIndex, "Tile4");
                break;
              case 5:
                editTile(tileIndex, "Tile5");
                break;
              case 6:
                editTile(tileIndex, "Tile6");
                break;
              case 7:
                editTile(tileIndex, "Tile7");
                break;
              //case 8
              default:
                editTile(tileIndex, "Tile8");
                break;
            }
          } else {
            editTile(tileIndex, "TileExplode");
            die(tileIndex);
          }
        }
      } else {
        if (isTileFull(tileIndex)) {
          openNeighbors(tileIndex);
        }
      }
    }
  }
}

function isTileFull(tileIndex) {
  const neighborArray = playArea[tileIndex].neighborIndices;
  const neighboringBombsNeeded = playArea[tileIndex].neighboringBombs;
  let neighborFlags = 0;
  neighborArray.forEach((neighborIndex) => {
    if (playArea[neighborIndex].isFlagged) {
      neighborFlags++;
    }
  });
  if (neighborFlags === neighboringBombsNeeded) {
    return true;
  } else {
    return false;
  }
}
function openNeighbors(tileIndex) {
  if (!isGameOver) {
    const neighborArray = playArea[tileIndex].neighborIndices;

    neighborArray.forEach((neighborIndex) => {
      if (!playArea[neighborIndex].isOpen && !playArea[tileIndex].isBomb) {
        openTile(neighborIndex);
      }
    });
  }
}

function previewTileOrNeighbors(tileIndex) {
  if (!isGameOver) {
    if (event.button === 0) {
      isMouseDown = true;

      if (!playArea[tileIndex].isOpen) {
        previewTile(tileIndex);
      } else {
        previewNeighborTiles(tileIndex);
      }
    }
  }
}
function stopPreviewTileOrNeighbors(tileIndex) {
  if (!isGameOver) {
    if (playArea[tileIndex].isOpen) {
      stopPreviewNeighborTiles(tileIndex);
    } else {
      stopPreviewTile(tileIndex);
    }
  }
}

function previewTile(tileIndex) {
  if (!isGameOver) {
    if (!playArea[tileIndex].isOpen && !playArea[tileIndex].isFlagged) {
      playArea[tileIndex].isPreviewed = true;
      editTile(tileIndex, "Tile0");
    }
  }
}
function previewNeighborTiles(tileIndex) {
  if (!isGameOver) {
    const neighborArray = playArea[tileIndex].neighborIndices;

    neighborArray.forEach((neighborIndex) => {
      previewTile(neighborIndex);
    });
  }
}
function stopPreviewTile(tileIndex) {
  if (!isGameOver) {
    if (!playArea[tileIndex].isOpen && !playArea[tileIndex].isFlagged) {
      playArea[tileIndex].isPreviewed = false;
      editTile(tileIndex, "TileClose");
    }
  }
}
function stopPreviewNeighborTiles(tileIndex) {
  if (!isGameOver) {
    const neighborArray = playArea[tileIndex].neighborIndices;

    neighborArray.forEach((neighborIndex) => {
      stopPreviewTile(neighborIndex);
    });
  }
}

function onMouseLeave(tileIndex) {
  if (event.button === 0) {
    stopPreviewTileOrNeighbors(tileIndex);
  }
}
function onMouseEnter(tileIndex) {
  if (event.button === 0 && isMouseDown) {
    previewTileOrNeighbors(tileIndex);
  }
}

function bombCounter(tileIndex) {
  var bombCount = 0;
  playArea[tileIndex].neighborIndices.forEach((neighbor) => {
    if (playArea[neighbor].isBomb) {
      bombCount++;
    }
  });
  return bombCount;
}

function die(tileIndex) {
  console.log("you died");
  for (var i = 0; i < numTiles; i++) {
    if (playArea[i].isBomb && !playArea[i].isFlagged) {
      editTile(i, "TileBomb");
    }
  }
  editTile(tileIndex, "TileExplode");
  isGameOver = true;
}
