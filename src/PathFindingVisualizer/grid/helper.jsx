/* eslint-disable no-unused-vars */
let FINISH_NODE_ROW = 10;
let FINISH_NODE_COL = 35;
let START_NODE_ROW = 10;
let START_NODE_COL = 15;

const initializeGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 45; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
}

const createNode = (row, col) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    euclideanDist: Infinity, //actually supposed to set this distance right away, do not keep it as inifnity. might have to include this somewhere else but it should be fine 
    visited: false,
    previousNode: null,
    isVisitedAgain: false,
    isFinal: false,
    isWall: false,
    isWeight: false,
  };
}

const getNewGridWithWall = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
      isVisitedAgain: false, // Clear visited status
      isFinal: false,        // Clear final path status
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
}

export {
  FINISH_NODE_ROW,
  FINISH_NODE_COL,
  START_NODE_ROW,
  START_NODE_COL,
  initializeGrid,
  createNode,
  getNewGridWithWall,
  getNewGridWithWeight,
};
