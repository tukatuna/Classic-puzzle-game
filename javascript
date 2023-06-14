var gridSize = 4; // Adjust the grid size here (e.g., 3 for a 3x3 grid, 4 for a 4x4 grid)
var gridContainer = document.getElementById("puzzle-grid");
var tiles = [];
var emptyTile;

// Create the puzzle grid
function createGrid() {
  for (var i = 1; i <= gridSize * gridSize - 1; i++) {
    var tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = i;
    tile.addEventListener("click", tileClick);
    gridContainer.appendChild(tile);
    tiles.push(tile);
  }
  emptyTile = document.createElement("div");
  emptyTile.className = "tile empty";
  gridContainer.appendChild(emptyTile);
  tiles.push(emptyTile);
}

// Shuffle the tiles randomly
function shuffleTiles() {
  for (var i = tiles.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = tiles[i].textContent;
    tiles[i].textContent = tiles[j].textContent;
    tiles[j].textContent = temp;
  }
}

// Handle tile click event
function tileClick() {
  var clickedTile = this;
  var emptyTileIndex = tiles.indexOf(emptyTile);
  var clickedTileIndex = tiles.indexOf(clickedTile);

  // Check if the clicked tile is adjacent to the empty tile
  if (
    (clickedTileIndex === emptyTileIndex - 1 && emptyTileIndex % gridSize !== gridSize - 1) || // Left tile
    (clickedTileIndex === emptyTileIndex + 1 && emptyTileIndex % gridSize !== 0) || // Right tile
    clickedTileIndex === emptyTileIndex - gridSize || // Above tile
    clickedTileIndex === emptyTileIndex + gridSize // Below tile
  ) {
    // Swap the clicked tile with the empty tile
    tiles[emptyTileIndex].textContent = clickedTile.textContent;
    clickedTile.textContent = "";
    emptyTile = clickedTile;
  }

  // Check if the puzzle is solved
  if (isPuzzleSolved()) {
    alert("Congratulations! You solved the puzzle.");
  }
}

// Check if the puzzle is solved
function isPuzzleSolved() {
  for (var i = 0; i < tiles.length - 1; i++) {
    if (parseInt(tiles[i].textContent) !== i + 1) {
      return
