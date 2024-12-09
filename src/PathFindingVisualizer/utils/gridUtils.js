// helper.jsx
const NODE_WIDTH = 28; // width of each node in pixels
const NODE_HEIGHT = 28; // height of each node in pixels
const MAX_ROWS = 25; // Maximum number of rows

const clampPosition = (pos, max) => Math.min(pos, max - 1);

const calculateDimensions = () => {
  const rows = Math.min(Math.floor(window.innerHeight / NODE_HEIGHT), MAX_ROWS);
  const cols = Math.floor(window.innerWidth / NODE_WIDTH);
  return { rows, cols };
};

const createNode = (row, col, startNode, finishNode) => ({
  row,
  col,
  isStart: row === startNode.row && col === startNode.col,
  isFinish: row === finishNode.row && col === finishNode.col,
  distance: Infinity,
  isVisited: false,
  isWall: false,
  previousNode: null,
  weight: 1,
});

const initializeGrid = (startNode, finishNode) => {
  const { rows, cols } = calculateDimensions();
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) =>
      createNode(row, col, startNode, finishNode)
    )
  );
};

const resetGrid = (
  startNode,
  finishNode,
  setStartNode,
  setFinishNode,
  setNodes
) => {
  const { rows, cols } = calculateDimensions();

  // Ensure startNode and finishNode are defined
  if (!startNode || !finishNode) {
    console.error("startNode or finishNode is undefined");
    return;
  }

  // Adjust start and finish nodes to stay within bounds
  const updatedStartNode = {
    ...startNode,
    row: clampPosition(startNode.row, rows),
    col: clampPosition(startNode.col, cols),
  };
  const updatedFinishNode = {
    ...finishNode,
    row: clampPosition(finishNode.row, rows),
    col: clampPosition(finishNode.col, cols),
  };

  setStartNode(updatedStartNode);
  setFinishNode(updatedFinishNode);

  // Initialize grid with updated dimensions
  const grid = Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) =>
      createNode(row, col, updatedStartNode, updatedFinishNode)
    )
  );
  setNodes(grid);
};

const resetWalls = (nodes, setNodes) => {
  const newGrid = nodes.slice();
  for (let row of newGrid) {
    for (let node of row) {
      node.isWall = false;
    }
  }
  setNodes(newGrid);
};

const resetPath = (nodes, setNodes) => {
  const newGrid = nodes.slice();
  for (let row of newGrid) {
    for (let node of row) {
      node.visited = false;
      node.isVisitedAgain = false;
      node.isFinal = false;
      node.distance = Infinity;
      node.previousNode = null;
      if (node.isWall || node.isWeight) continue;
    }
  }
  setNodes(newGrid);
  return newGrid;
};

const getNewGridWithWall = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
    isVisitedAgain: false, // Clear visited status
    isFinal: false, // Clear final path status
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithWeight = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = grid[row][col];
  if (node.isWall) {
    node.isWall = !node.isWall;
  }
  const newNode = { ...node, isWeight: !node.isWeight };
  newGrid[row][col] = newNode;
  return newGrid;
};

export {
  clampPosition,
  calculateDimensions,
  createNode,
  initializeGrid,
  resetGrid,
  resetWalls,
  resetPath,
  getNewGridWithWall,
  getNewGridWithWeight,
};
